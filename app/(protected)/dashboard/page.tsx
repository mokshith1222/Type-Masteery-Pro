"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import StatsCard from "@/components/stats-card"
import { Zap, Target, TrendingUp, Award, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { DashboardStats, WeeklyProgress, TypingTestResult } from "@/types/dashboard"

export default function DashboardPage() {
  const router = useRouter()
  const [userName, setUserName] = useState("User")
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [weeklyProgress, setWeeklyProgress] = useState<WeeklyProgress[]>([])
  const [recentTests, setRecentTests] = useState<TypingTestResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const { data: authData, error: authError } = await supabase.auth.getUser()
        if (authError || !authData.user) {
          router.push("/auth/login")
          return
        }

        const { data: profile } = await supabase.from("profiles").select("*").eq("id", authData.user.id).single()

        if (profile) {
          setUserName(profile.username || "User")
        }

        const { data: tests } = await supabase
          .from("typing_tests")
          .select("*")
          .eq("user_id", authData.user.id)
          .order("created_at", { ascending: false })
          .limit(100)

        if (tests && tests.length > 0) {
          // Calculate stats from tests
          const bestWPM = Math.max(...tests.map((t) => t.wpm))
          const avgWPM = Math.round(tests.reduce((sum, t) => sum + t.wpm, 0) / tests.length)
          const avgAccuracy = Math.round((tests.reduce((sum, t) => sum + t.accuracy, 0) / tests.length) * 100) / 100
          const totalTime = tests.reduce((sum, t) => sum + t.test_duration, 0)

          setStats({
            totalWPM: Math.round(tests.reduce((sum, t) => sum + t.wpm, 0)),
            bestWPM,
            averageWPM: avgWPM,
            totalAccuracy: avgAccuracy,
            lessonsCompleted: 0,
            practiceStreak: 0,
            totalPracticeTime: totalTime,
            totalTests: tests.length,
          })

          const formatted: TypingTestResult[] = tests.slice(0, 5).map((t) => ({
            id: t.id,
            wpm: t.wpm,
            accuracy: t.accuracy * 100,
            duration: t.test_duration,
            date: new Date(t.created_at),
            difficulty: "intermediate",
          }))
          setRecentTests(formatted)

          const now = new Date()
          const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
          const weekly: WeeklyProgress[] = []

          for (let i = 6; i >= 0; i--) {
            const date = new Date(now)
            date.setDate(date.getDate() - i)
            const dayTests = tests.filter((t) => {
              const testDate = new Date(t.created_at)
              return (
                testDate.getFullYear() === date.getFullYear() &&
                testDate.getMonth() === date.getMonth() &&
                testDate.getDate() === date.getDate()
              )
            })

            weekly.push({
              day: weekDays[date.getDay()],
              wpm: dayTests.length > 0 ? Math.round(dayTests.reduce((sum, t) => sum + t.wpm, 0) / dayTests.length) : 0,
              accuracy:
                dayTests.length > 0
                  ? Math.round((dayTests.reduce((sum, t) => sum + t.accuracy, 0) / dayTests.length) * 100) / 100
                  : 0,
              tests: dayTests.length,
            })
          }
          setWeeklyProgress(weekly)
        } else {
          // No tests yet, show empty state
          setStats({
            totalWPM: 0,
            bestWPM: 0,
            averageWPM: 0,
            totalAccuracy: 0,
            lessonsCompleted: 0,
            practiceStreak: 0,
            totalPracticeTime: 0,
            totalTests: 0,
          })
        }
      } catch (error) {
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [supabase, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground/60">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mb-12">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1" asChild>
            <Link href="/typing">Start Typing Test</Link>
          </Button>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground flex-1" asChild>
            <Link href="/progress">Your Progress</Link>
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent border-border" asChild>
            <Link href="/lessons">Continue Lessons</Link>
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent border-border" asChild>
            <Link href="/races">Race Now</Link>
          </Button>
        </div>

        {/* Key Statistics */}
        {stats && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <StatsCard
              label="Best WPM"
              value={stats.bestWPM}
              trend={12}
              icon={<TrendingUp className="text-primary" />}
              color="primary"
            />
            <StatsCard
              label="Average WPM"
              value={stats.averageWPM}
              trend={8}
              icon={<Target className="text-accent" />}
              color="accent"
            />
            <StatsCard
              label="Average Accuracy"
              value={stats.totalAccuracy}
              unit="%"
              trend={2}
              icon={<Award className="text-secondary" />}
              color="secondary"
            />
            <StatsCard label="Total Tests" value={stats.totalTests} icon={<Zap className="text-primary" />} />
            <StatsCard
              label="Total Practice Time"
              value={Math.floor(stats.totalPracticeTime / 60)}
              unit="hours"
              icon={<Clock className="text-accent" />}
            />
          </div>
        )}

        {stats && stats.totalTests === 0 && (
          <div className="text-center py-12">
            <p className="text-foreground/60 mb-4">No typing tests yet. Start your first test!</p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
              <Link href="/typing">Take a Typing Test</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
