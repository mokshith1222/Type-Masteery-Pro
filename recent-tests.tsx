"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TypingTestResult } from "@/types/dashboard"

interface RecentTestsProps {
  tests: TypingTestResult[]
}

export default function RecentTests({ tests }: RecentTestsProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-primary/10 text-primary"
      case "intermediate":
        return "bg-accent/10 text-accent"
      case "advanced":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted text-foreground/70"
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="bg-card border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Tests</h3>
      <div className="space-y-3">
        {tests.map((test) => (
          <div
            key={test.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-foreground">{test.wpm} WPM</span>
                <Badge className={getDifficultyColor(test.difficulty)} variant="secondary">
                  {test.difficulty}
                </Badge>
              </div>
              <p className="text-xs text-foreground/60">{formatDate(test.date)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-accent">{test.accuracy}%</p>
              <p className="text-xs text-foreground/60">{test.duration}s</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
