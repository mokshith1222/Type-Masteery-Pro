"use client"

import { AchievementBadge } from "@/components/achievement-badge"
import type { Achievement } from "@/types/achievements"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface AchievementsGridProps {
  unlocked: Achievement[]
  locked: Achievement[]
  progress: { [key: string]: number }
}

export function AchievementsGrid({ unlocked, locked, progress }: AchievementsGridProps) {
  const [filter, setFilter] = useState<"all" | "unlocked" | "locked">("all")

  const displayAchievements = filter === "all" ? [...unlocked, ...locked] : filter === "unlocked" ? unlocked : locked

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {["all", "unlocked", "locked"].map((f) => (
          <Button
            key={f}
            onClick={() => setFilter(f as typeof filter)}
            variant={filter === f ? "default" : "outline"}
            className={filter === f ? "bg-blue-600 text-white" : "text-gray-600 border-gray-300 hover:bg-gray-50"}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)} (
            {f === "all" ? unlocked.length + locked.length : f === "unlocked" ? unlocked.length : locked.length})
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayAchievements.map((achievement) => (
          <AchievementBadge
            key={achievement.id}
            achievement={achievement}
            unlocked={unlocked.some((a) => a.id === achievement.id)}
            progress={progress[achievement.id]}
          />
        ))}
      </div>
    </div>
  )
}
