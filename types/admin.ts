export interface AdminStats {
  totalUsers: number
  activeUsers: number
  totalTests: number
  averageWPM: number
  totalPracticeHours: number
  newUsersThisWeek: number
  peakHourActivity: number
  platformAccuracy: number
}

export interface UserManagement {
  id: string
  email: string
  name: string
  joinDate: Date
  lastActive: Date
  testsCompleted: number
  bestWPM: number
  status: "active" | "inactive" | "banned"
}

export interface SystemHealth {
  apiResponseTime: number
  errorRate: number
  databaseQueriesPerSecond: number
  activeConnections: number
  cacheHitRate: number
  uptime: number
}
