"use client"

import { LeaderboardTable } from "@/components/leaderboard-table"
import { LeaderboardFilters } from "@/components/leaderboard-filters"
import { useState } from "react"

// Mock leaderboard data
const mockLeaderboardData = [
  { rank: 1, username: "SpeedDemon", bestWPM: 178, averageWPM: 145, accuracy: 98.5, totalTests: 892 },
  { rank: 2, username: "AccuracyKing", bestWPM: 156, averageWPM: 128, accuracy: 99.2, totalTests: 654 },
  { rank: 3, username: "ConsistentTyler", bestWPM: 142, averageWPM: 135, accuracy: 97.8, totalTests: 1203 },
  { rank: 4, username: "ThunderFingers", bestWPM: 168, averageWPM: 122, accuracy: 96.1, totalTests: 445 },
  { rank: 5, username: "PrecisionMaster", bestWPM: 135, averageWPM: 118, accuracy: 98.9, totalTests: 523 },
  { rank: 6, username: "FlashTyper", bestWPM: 152, averageWPM: 115, accuracy: 95.3, totalTests: 378 },
  { rank: 7, username: "ZenFlow", bestWPM: 141, averageWPM: 110, accuracy: 97.2, totalTests: 612 },
  { rank: 8, username: "LightningKeys", bestWPM: 162, averageWPM: 108, accuracy: 94.8, totalTests: 289 },
]

export default function LeaderboardsPage() {
  const [activeCategory, setActiveCategory] = useState("speed")

  const handleFiltersChange = (timeframe: string, category: string) => {
    setActiveCategory(category)
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Global Leaderboards</h1>
          <p className="text-foreground/70">
            Compete with typists worldwide and see where you rank. No login required to view.
          </p>
        </div>

        <LeaderboardFilters onFiltersChange={handleFiltersChange} />
        <LeaderboardTable entries={mockLeaderboardData} category={activeCategory} />

        {/* Stats cards */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg border border-border p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">1,247</div>
            <p className="text-foreground/70">Active Typists</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">892</div>
            <p className="text-foreground/70">Tests Completed Today</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6 text-center">
            <div className="text-3xl font-bold text-secondary mb-2">98.4%</div>
            <p className="text-foreground/70">Average Accuracy</p>
          </div>
        </div>
      </div>
    </main>
  )
}
