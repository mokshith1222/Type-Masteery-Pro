export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: "speed" | "accuracy" | "consistency" | "milestone" | "special"
  rarity: "common" | "rare" | "epic" | "legendary"
  requirement: {
    type: "wpm" | "accuracy" | "tests" | "streak" | "total_hours" | "custom"
    value: number
  }
}

export interface UserAchievements {
  unlocked: Achievement[]
  locked: Achievement[]
  progress: {
    [key: string]: number
  }
}
