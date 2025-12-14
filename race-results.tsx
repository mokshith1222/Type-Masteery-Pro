"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Share2, RotateCcw } from "lucide-react"
import Link from "next/link"
import type { Racer } from "@/types/racing"

interface RaceResultsProps {
  racers: Racer[]
  onPlayAgain: () => void
}

const getMedalEmoji = (position: number) => {
  switch (position) {
    case 1:
      return "🥇"
    case 2:
      return "🥈"
    case 3:
      return "🥉"
    default:
      return "🏁"
  }
}

export default function RaceResults({ racers, onPlayAgain }: RaceResultsProps) {
  const userRacer = racers[0]
  const userPosition = racers.findIndex((r) => r.name === "You") + 1

  return (
    <div className="max-w-4xl mx-auto">
      {/* Winner Banner */}
      <Card
        className={cn(
          "bg-gradient-to-r p-8 mb-8 text-center",
          userPosition === 1
            ? "from-primary/10 to-accent/10 border border-primary/30"
            : "from-muted to-muted border border-border",
        )}
      >
        <p className="text-5xl mb-3">{getMedalEmoji(userPosition)}</p>
        <h2 className={cn("text-3xl font-bold mb-2", userPosition === 1 ? "text-primary" : "text-foreground")}>
          {userPosition === 1 ? "You Won! 🎉" : `Finished ${userPosition}${getOrdinalSuffix(userPosition)}`}
        </h2>
        <p className="text-foreground/60">{racers.length} racers participated</p>
      </Card>

      {/* User Stats */}
      <Card className="bg-card border border-border p-8 mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-6">Your Performance</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-foreground/60 mb-2">Final Speed</p>
            <p className="text-4xl font-bold text-primary">{userRacer.wpm}</p>
            <p className="text-xs text-foreground/50 mt-1">WPM</p>
          </div>
          <div>
            <p className="text-sm text-foreground/60 mb-2">Accuracy</p>
            <p className="text-4xl font-bold text-accent">{userRacer.accuracy}%</p>
            <p className="text-xs text-foreground/50 mt-1">Correct</p>
          </div>
          <div>
            <p className="text-sm text-foreground/60 mb-2">Position</p>
            <p className="text-4xl font-bold text-secondary">{userPosition}</p>
            <p className="text-xs text-foreground/50 mt-1">of {racers.length}</p>
          </div>
        </div>
      </Card>

      {/* Final Rankings */}
      <Card className="bg-card border border-border p-6 mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-6">Final Rankings</h3>
        <div className="space-y-3">
          {racers.map((racer, idx) => (
            <div
              key={racer.id}
              className={cn(
                "flex items-center justify-between p-4 rounded-lg transition-colors",
                idx === 0 && "bg-primary/10",
                idx > 0 && "bg-muted/30",
              )}
            >
              <div className="flex items-center gap-3 flex-1">
                <Trophy className={cn("w-5 h-5", idx === 0 ? "text-primary" : "text-foreground/50")} />
                <div>
                  <p className="font-semibold text-foreground">{racer.name}</p>
                  <p className="text-xs text-foreground/60">
                    {racer.wpm} WPM • {racer.accuracy}% Accuracy
                  </p>
                </div>
              </div>
              <Badge variant={idx === 0 ? "default" : "secondary"}>#{idx + 1}</Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={onPlayAgain} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <RotateCcw className="w-4 h-4" />
          Play Again
        </Button>
        <Button variant="outline" className="flex-1 gap-2 bg-transparent border-border">
          <Share2 className="w-4 h-4" />
          Share Results
        </Button>
        <Button variant="outline" asChild className="flex-1 bg-transparent border-border">
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}

function getOrdinalSuffix(num: number) {
  const j = num % 10
  const k = num % 100
  if (j === 1 && k !== 11) return "st"
  if (j === 2 && k !== 12) return "nd"
  if (j === 3 && k !== 13) return "rd"
  return "th"
}

import { cn } from "@/lib/utils"
