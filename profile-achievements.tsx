"use client"

import { Award } from "lucide-react"

const ACHIEVEMENTS = {
  "first-test": { name: "First Steps", icon: "🎯" },
  "speed-demon": { name: "Speed Demon", icon: "⚡" },
  "accuracy-master": { name: "Accuracy Master", icon: "🎯" },
  consistent: { name: "Consistent Typer", icon: "📈" },
  "night-owl": { name: "Night Owl", icon: "🌙" },
  "grammar-pro": { name: "Grammar Pro", icon: "✏️" },
  "hundred-club": { name: "100 WPM Club", icon: "🏃" },
  legend: { name: "Legend", icon: "👑" },
}

interface ProfileAchievementsProps {
  badges: string[]
}

export function ProfileAchievements({ badges }: ProfileAchievementsProps) {
  return (
    <div className="bg-white rounded-lg border border-blue-100 p-8">
      <div className="flex items-center gap-3 mb-6">
        <Award className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Achievements</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.entries(ACHIEVEMENTS).map(([key, achievement]) => (
          <div
            key={key}
            className={`p-4 rounded-lg text-center transition-all ${
              badges.includes(key)
                ? "bg-blue-50 border-2 border-blue-300"
                : "bg-gray-50 border-2 border-gray-200 opacity-50"
            }`}
          >
            <div className="text-3xl mb-2">{achievement.icon}</div>
            <div className="text-sm font-semibold text-gray-900">{achievement.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
