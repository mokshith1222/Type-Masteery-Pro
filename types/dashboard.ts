export interface DashboardStats {
  totalWPM: number
  bestWPM: number
  averageWPM: number
  totalAccuracy: number
  lessonsCompleted: number
  practiceStreak: number
  totalPracticeTime: number
  totalTests: number
}

export interface TypingTestResult {
  id: string
  wpm: number
  accuracy: number
  duration: number
  date: Date
  difficulty: "beginner" | "intermediate" | "advanced"
}

export interface WeeklyProgress {
  day: string
  wpm: number
  accuracy: number
  tests: number
}
