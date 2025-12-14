export interface TypingStats {
  wordsPerMinute: number
  accuracy: number
  charactersTyped: number
  correctCharacters: number
  totalDuration: number
  mistakes: number
}

export interface Lesson {
  id: string
  title: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  content: string
  estimatedDuration: number
}

export interface UserProgress {
  userId: string
  lessonId: string
  personalBestWPM: number
  averageWPM: number
  averageAccuracy: number
  completedDate?: Date
  attempts: number
}
