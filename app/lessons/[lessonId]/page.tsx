"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import TypingTest from "@/components/typing-test"
import { ChevronLeft, BookOpen } from "lucide-react"
import Link from "next/link"

interface LessonPageProps {
  params: Promise<{
    lessonId: string
  }>
}

// Mock lesson data
const LESSON_DETAILS: Record<string, any> = {
  b1: {
    title: "Home Row Keys",
    description: "Learn the foundation: A, S, D, F, J, K, L, ; keys",
    difficulty: "beginner",
    overview:
      "The home row is the most important position on the keyboard. Your fingers should naturally rest on these keys when typing.",
    objectives: [
      "Understand proper finger placement on home row",
      "Develop muscle memory for home row keys",
      "Type home row keys without looking at the keyboard",
      "Achieve consistent accuracy above 95%",
    ],
    tips: [
      "Left hand: A, S, D, F (index finger on F)",
      "Right hand: J, K, L, ; (index finger on J)",
      "Keep your wrists straight and relaxed",
      "Practice slowly - speed comes naturally with repetition",
    ],
  },
}

export default function LessonPage({ params }: LessonPageProps) {
  const [showTest, setShowTest] = useState(false)
  const [lessonId, setLessonId] = useState<string | null>(null)

  // Handle async params properly
  if (lessonId === null) {
    ;(async () => {
      const resolvedParams = await params
      setLessonId(resolvedParams.lessonId || "b1")
    })()
  }

  const currentLessonId = lessonId || "b1"
  const lesson = LESSON_DETAILS[currentLessonId] || LESSON_DETAILS.b1

  if (showTest) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-5xl mx-auto px-4 py-8">
          <Button variant="ghost" className="mb-8 gap-2" asChild>
            <Link href="/lessons">
              <ChevronLeft className="w-4 h-4" />
              Back to Lessons
            </Link>
          </Button>
          <TypingTest />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Button variant="ghost" className="mb-8 gap-2" asChild>
          <Link href="/lessons">
            <ChevronLeft className="w-4 h-4" />
            Back to Lessons
          </Link>
        </Button>

        {/* Lesson Header */}
        <div className="mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4 capitalize">
            {lesson.difficulty}
          </span>
          <h1 className="text-5xl font-bold text-foreground mb-4">{lesson.title}</h1>
          <p className="text-xl text-foreground/60">{lesson.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary" />
                Lesson Overview
              </h2>
              <p className="text-foreground/70 leading-relaxed text-lg">{lesson.overview}</p>
            </div>

            {/* Objectives */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Learning Objectives</h3>
              <ul className="space-y-4">
                {lesson.objectives.map((obj: string, idx: number) => (
                  <li key={idx} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold text-sm">
                      {idx + 1}
                    </span>
                    <span className="text-foreground/70 pt-1">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tips */}
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Pro Tips</h3>
              <ul className="space-y-3">
                {lesson.tips.map((tip: string, idx: number) => (
                  <li key={idx} className="flex gap-3 text-foreground/70">
                    <span className="text-accent font-bold">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-sm text-foreground/60 mb-2">Difficulty</p>
                <p className="text-lg font-semibold text-foreground capitalize mb-6">{lesson.difficulty}</p>

                <p className="text-sm text-foreground/60 mb-2">Estimated Time</p>
                <p className="text-lg font-semibold text-foreground mb-6">20 minutes</p>

                <Button
                  onClick={() => setShowTest(true)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11"
                >
                  Start Lesson
                </Button>
              </div>

              <div className="bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary/30 rounded-lg p-6">
                <p className="text-sm font-semibold text-foreground mb-3">Completion Progress</p>
                <div className="space-y-2 text-sm text-foreground/60">
                  <p>✓ Read lesson content</p>
                  <p>○ Complete typing test</p>
                  <p>○ Achieve 95%+ accuracy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
