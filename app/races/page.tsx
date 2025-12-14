"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import ProtectedRoute from "@/components/protected-route"
import RaceLobby from "@/components/race-lobby"
import RaceLive from "@/components/race-live"
import RaceResults from "@/components/race-results"
import type { Race, Racer } from "@/types/racing"

type RaceState = "lobby" | "racing" | "results"

export default function RacesPage() {
  const [raceState, setRaceState] = useState<RaceState>("lobby")
  const [currentRace, setCurrentRace] = useState<Race | null>(null)
  const [raceResults, setRaceResults] = useState<Racer[]>([])

  const handleStartRace = (race: Race) => {
    setCurrentRace(race)
    setRaceState("racing")
  }

  const handleRaceComplete = (results: Racer[]) => {
    setRaceResults(results)
    setRaceState("results")
  }

  const handlePlayAgain = () => {
    setRaceState("lobby")
    setCurrentRace(null)
    setRaceResults([])
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {raceState === "lobby" && <RaceLobby onStartRace={handleStartRace} />}
          {raceState === "racing" && currentRace && <RaceLive race={currentRace} onRaceComplete={handleRaceComplete} />}
          {raceState === "results" && <RaceResults racers={raceResults} onPlayAgain={handlePlayAgain} />}
        </div>
      </div>
    </ProtectedRoute>
  )
}
