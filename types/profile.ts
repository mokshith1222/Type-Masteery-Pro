export interface UserProfile {
  id: string
  username: string
  email: string
  avatar?: string
  joinedDate: string
  bio?: string
  stats: {
    totalTests: number
    bestWPM: number
    averageWPM: number
    accuracy: number
    totalHours: number
    currentStreak: number
    longestStreak: number
  }
  badges: string[]
  recentTests: Array<{
    id: string
    date: string
    wpm: number
    accuracy: number
    testType: string
  }>
}

export interface PublicProfile {
  username: string
  avatar?: string
  joinedDate: string
  bio?: string
  stats: {
    bestWPM: number
    averageWPM: number
    accuracy: number
    totalTests: number
  }
  badges: string[]
}
