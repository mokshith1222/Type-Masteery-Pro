export interface LeaderboardEntry {
  rank: number
  username: string
  avatar?: string
  bestWPM: number
  averageWPM: number
  accuracy: number
  totalTests: number
  badge?: string
}

export interface LeaderboardFilters {
  timeframe: "weekly" | "monthly" | "allTime"
  category: "speed" | "accuracy" | "consistency"
}
