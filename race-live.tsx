"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Race, Racer } from "@/types/racing"
import { cn } from "@/lib/utils"

interface RaceLiveProps {
  race: Race
  onRaceComplete: (results: Racer[]) => void
}

export default function RaceLive({ race, onRaceComplete }: RaceLiveProps) {
  const [timeRemaining, setTimeRemaining] = useState(race.duration)
  const [currentRacers, setCurrentRacers] = useState(race.racers)
  const [raceActive, setRaceActive] = useState(true)
  const [prevTimeRemaining, setPrevTimeRemaining] = useState(race.duration)

  // Simulate race progress
  useEffect(() => {
    if (!raceActive) return

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setRaceActive(false)
          return 0
        }
        setPrevTimeRemaining(prev)
        return prev - 1
      })

      // Simulate racer progress
      setCurrentRacers((prev) =>
        prev.map((racer) => {
          if (racer.finished) return racer

          const progress = Math.min(100, racer.progress + Math.random() * 15)
          const newWpm = Math.round(racer.wpm + Math.random() * 5 + 50)
          const newAccuracy = Math.min(100, racer.accuracy + Math.random() * 0.5 + 92)

          return {
            ...racer,
            progress,
            wpm: newWpm,
            accuracy: Math.round(newAccuracy),
            finished: progress >= 100,
            finishTime: progress >= 100 ? race.duration - prevTimeRemaining : undefined,
          }
        }),
      )
    }, 500)

    // Ensure interval cleanup to prevent memory leaks
    return () => clearInterval(interval)
  }, [raceActive, race.duration, prevTimeRemaining])

  // When race ends
  useEffect(() => {
    if (timeRemaining === 0 && raceActive) {
      setRaceActive(false)
      const sorted = [...currentRacers].sort((a, b) => {
        if (a.finished && !b.finished) return -1
        if (!a.finished && b.finished) return 1
        return b.progress - a.progress
      })
      onRaceComplete(sorted)
    }
  }, [timeRemaining, raceActive, currentRacers, onRaceComplete])

  const sortedRacers = [...currentRacers].sort((a, b) => b.progress - a.progress)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Timer */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 p-8 text-center mb-8">
        <p className="text-sm text-foreground/60 mb-2">Time Remaining</p>
        <p className="text-6xl font-bold text-primary font-mono">{timeRemaining}s</p>
      </Card>

      {/* Race Text */}
      <Card className="bg-card border border-border p-8 mb-8">
        <p className="text-lg leading-relaxed text-foreground/70">{race.text}</p>
      </Card>

      {/* Live Standings */}
      <Card className="bg-card border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Live Standings</h3>
        <div className="space-y-4">
          {sortedRacers.map((racer, idx) => (
            <div key={racer.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold",
                      idx === 0 && "bg-primary text-primary-foreground",
                      idx === 1 && "bg-accent/20 text-accent",
                      idx === 2 && "bg-secondary/20 text-secondary",
                      idx > 2 && "bg-muted text-foreground/70",
                    )}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{racer.name}</p>
                    <p className="text-xs text-foreground/60">
                      {racer.wpm} WPM • {racer.accuracy}% Accuracy
                    </p>
                  </div>
                </div>
                {racer.finished && <span className="text-sm font-bold text-primary">FINISHED</span>}
              </div>
              <Progress value={racer.progress} className="h-2" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
