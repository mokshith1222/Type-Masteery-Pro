"use client"

import { AchievementsGrid } from "@/components/achievements-grid"

// Mock achievement data
const allAchievements = [
  {
    id: "first-test",
    name: "First Steps",
    description: "Complete your first typing test",
    icon: "🎯",
    category: "milestone",
    rarity: "common",
    requirement: { type: "tests", value: 1 },
  },
  {
    id: "hundred-club",
    name: "100 WPM Club",
    description: "Achieve 100 WPM in a single test",
    icon: "🏃",
    category: "speed",
    rarity: "rare",
    requirement: { type: "wpm", value: 100 },
  },
  {
    id: "perfect-accuracy",
    name: "Perfect Accuracy",
    description: "Complete a test with 100% accuracy",
    icon: "🎯",
    category: "accuracy",
    rarity: "epic",
    requirement: { type: "accuracy", value: 100 },
  },
  {
    id: "speed-demon",
    name: "Speed Demon",
    description: "Achieve 150+ WPM in a single test",
    icon: "⚡",
    category: "speed",
    rarity: "epic",
    requirement: { type: "wpm", value: 150 },
  },
  {
    id: "consistent-typer",
    name: "Consistent Typer",
    description: "Maintain a 30-day practice streak",
    icon: "📈",
    category: "consistency",
    rarity: "rare",
    requirement: { type: "streak", value: 30 },
  },
  {
    id: "legend",
    name: "Legend",
    description: "Achieve 200+ WPM",
    icon: "👑",
    category: "speed",
    rarity: "legendary",
    requirement: { type: "wpm", value: 200 },
  },
  {
    id: "hundred-tests",
    name: "100 Tests Complete",
    description: "Complete 100 typing tests",
    icon: "💯",
    category: "milestone",
    rarity: "rare",
    requirement: { type: "tests", value: 100 },
  },
  {
    id: "accuracy-master",
    name: "Accuracy Master",
    description: "Maintain 99% accuracy across 10 tests",
    icon: "🎯",
    category: "accuracy",
    rarity: "rare",
    requirement: { type: "accuracy", value: 99 },
  },
]

export default function AchievementsPage() {
  // Mock unlocked achievements
  const unlockedIds = ["first-test", "hundred-club", "consistent-typer", "hundred-tests"]

  const unlocked = allAchievements.filter((a) => unlockedIds.includes(a.id))
  const locked = allAchievements.filter((a) => !unlockedIds.includes(a.id))

  const mockProgress = {
    "speed-demon": 75,
    "perfect-accuracy": 85,
    legend: 45,
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Achievements</h1>
          <p className="text-gray-600">Unlock badges and achievements as you improve your typing skills</p>
        </div>

        <div className="bg-white rounded-lg border border-blue-100 p-8">
          <div className="mb-8">
            <div className="flex items-center gap-4">
              <div className="text-5xl">🏆</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{unlockedIds.length} Achievements Unlocked</h2>
                <p className="text-gray-600">{allAchievements.length - unlockedIds.length} more to discover</p>
              </div>
            </div>
          </div>

          <AchievementsGrid unlocked={unlocked} locked={locked} progress={mockProgress} />
        </div>
      </div>
    </main>
  )
}
