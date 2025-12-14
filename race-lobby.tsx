"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Users, Play, Plus } from "lucide-react"
import type { Race, Racer } from "@/types/racing"

const MOCK_RACERS: Racer[] = [
  { id: "1", name: "You", wpm: 0, accuracy: 0, progress: 0, position: 1, finished: false },
  { id: "2", name: "Alex Runner", wpm: 0, accuracy: 0, progress: 0, position: 2, finished: false },
  { id: "3", name: "Speed Demon", wpm: 0, accuracy: 0, progress: 0, position: 3, finished: false },
]

const SAMPLE_RACE_TEXT =
  "The quick brown fox jumps over the lazy dog. Type as fast as you can to beat your opponents in this real-time racing challenge!"

interface RaceLobbyProps {
  onStartRace: (race: Race) => void
}

export default function RaceLobby({ onStartRace }: RaceLobbyProps) {
  const [raceCode] = useState("RACE123")
  const [racers, setRacers] = useState<Racer[]>(MOCK_RACERS)
  const [copied, setCopied] = useState(false)

  const handleCopyCode = () => {
    navigator.clipboard.writeText(raceCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleStartRace = () => {
    const race: Race = {
      id: "race-1",
      code: raceCode,
      status: "starting",
      racers,
      duration: 60,
      text: SAMPLE_RACE_TEXT,
      createdAt: new Date(),
      startTime: new Date(),
    }
    onStartRace(race)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Race Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Race Lobby</h1>
        <p className="text-lg text-foreground/60">Join the race or invite friends to compete</p>
      </div>

      {/* Race Code */}
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 p-6 mb-8">
        <p className="text-sm text-foreground/60 mb-2">Race Code</p>
        <div className="flex items-center gap-3">
          <code className="text-3xl font-bold text-primary font-mono">{raceCode}</code>
          <Button
            onClick={handleCopyCode}
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent border-primary/50"
          >
            <Copy className="w-4 h-4" />
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
        <p className="text-xs text-foreground/50 mt-2">Share this code with friends to join the race</p>
      </Card>

      {/* Racers */}
      <Card className="bg-card border border-border p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Participants ({racers.length})
          </h3>
          <Button variant="ghost" size="sm" className="gap-2 text-primary hover:text-primary/80">
            <Plus className="w-4 h-4" />
            Invite
          </Button>
        </div>

        <div className="space-y-2">
          {racers.map((racer, idx) => (
            <div key={racer.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{racer.name}</p>
                  <p className="text-xs text-foreground/50">Ready</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Connected
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Start Button */}
      <Button
        onClick={handleStartRace}
        className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold gap-2"
      >
        <Play className="w-5 h-5" />
        Start Race
      </Button>
    </div>
  )
}
