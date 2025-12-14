"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Lock, Play } from "lucide-react"
import type { Lesson } from "@/types/typing"
import { cn } from "@/lib/utils"

interface LessonCardProps {
  lesson: Lesson
  isCompleted?: boolean
  isLocked?: boolean
  onClick?: () => void
}

export default function LessonCard({ lesson, isCompleted = false, isLocked = false, onClick }: LessonCardProps) {
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

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50",
        isLocked && "opacity-50 cursor-not-allowed",
      )}
    >
      <div className="p-6">
        {/* Lock Overlay */}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <Lock className="w-8 h-8 text-foreground/40" />
          </div>
        )}

        {/* Completed Badge */}
        {isCompleted && (
          <div className="absolute top-4 right-4">
            <CheckCircle2 className="w-6 h-6 text-primary" />
          </div>
        )}

        {/* Content */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{lesson.title}</h3>
            <Badge className={getDifficultyColor(lesson.difficulty)} variant="secondary">
              {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
            </Badge>
          </div>
        </div>

        <p className="text-foreground/70 text-sm mb-4 line-clamp-2">{lesson.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-foreground/50">{lesson.estimatedDuration} min</span>
          <Button onClick={onClick} disabled={isLocked} size="sm" className={cn("gap-2", isCompleted && "opacity-70")}>
            <Play className="w-4 h-4" />
            {isCompleted ? "Review" : "Start"}
          </Button>
        </div>
      </div>
    </Card>
  )
}
