"use client"

import type { Achievement } from "@/types/achievements"

interface AchievementBadgeProps {
  achievement: Achievement
  unlocked: boolean
  progress?: number
}

const rarityColors = {
  common: "bg-gray-100 border-gray-300 text-gray-700",
  rare: "bg-blue-100 border-blue-300 text-blue-700",
  epic: "bg-purple-100 border-purple-300 text-purple-700",
  legendary: "bg-yellow-100 border-yellow-300 text-yellow-700",
}

export function AchievementBadge({ achievement, unlocked, progress = 0 }: AchievementBadgeProps) {
  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all ${
        unlocked ? rarityColors[achievement.rarity] : "bg-gray-50 border-gray-200 opacity-60"
      }`}
    >
      <div className={`text-3xl mb-2 ${unlocked ? "" : "grayscale"}`}>{achievement.icon}</div>
      <h3 className="font-semibold text-sm mb-1">{achievement.name}</h3>
      <p className="text-xs opacity-75 mb-3">{achievement.description}</p>

      {!unlocked && progress > 0 && (
        <div className="bg-gray-200 rounded-full h-1.5 mt-2">
          <div
            className="bg-blue-500 h-1.5 rounded-full transition-all"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      )}

      {unlocked && (
        <div className="text-xs font-bold text-center pt-2 border-t border-current border-opacity-20">Unlocked</div>
      )}
    </div>
  )
}
