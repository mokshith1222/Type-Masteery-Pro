"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import LessonCard from "@/components/lesson-card"
import Navigation from "@/components/navigation"
import type { Lesson } from "@/types/typing"
import Link from "next/link"

const LESSONS_DATA: Record<string, Lesson[]> = {
  beginner: [
    {
      id: "b1",
      title: "Home Row Keys",
      description: "Learn the foundation: A, S, D, F, J, K, L, ; keys",
      difficulty: "beginner",
      content:
        "Focus on the home row of the keyboard. Place your fingers on ASDF for the left hand and JKL; for the right.",
      estimatedDuration: 15,
    },
    {
      id: "b2",
      title: "Top Row Mastery",
      description: "Master the top row: Q, W, E, R, T, Y, U, I, O, P",
      difficulty: "beginner",
      content: "Progress to the top row while maintaining proper finger placement and posture.",
      estimatedDuration: 20,
    },
    {
      id: "b3",
      title: "Bottom Row Basics",
      description: "Complete the keyboard: Z, X, C, V, B, N, M",
      difficulty: "beginner",
      content: "Learn the bottom row keys while keeping speed and accuracy in balance.",
      estimatedDuration: 20,
    },
    {
      id: "b4",
      title: "Number Keys",
      description: "Introduction to the number row: 0-9",
      difficulty: "beginner",
      content: "Add number keys to your repertoire without looking at the keyboard.",
      estimatedDuration: 15,
    },
  ],
  intermediate: [
    {
      id: "i1",
      title: "Common Words",
      description: "Type the 100 most common English words",
      difficulty: "intermediate",
      content: "Build speed with frequently used words and improve overall typing rhythm.",
      estimatedDuration: 25,
    },
    {
      id: "i2",
      title: "Punctuation & Symbols",
      description: "Master symbols: !, @, #, $, %, ^, &, *, (), etc.",
      difficulty: "intermediate",
      content: "Improve accuracy with punctuation and special characters.",
      estimatedDuration: 20,
    },
    {
      id: "i3",
      title: "Speed Building 50 WPM",
      description: "Achieve 50 words per minute consistently",
      difficulty: "intermediate",
      content: "Practice with varied texts to build speed while maintaining accuracy.",
      estimatedDuration: 30,
    },
    {
      id: "i4",
      title: "Accuracy Focus",
      description: "Achieve 99% accuracy rate",
      difficulty: "intermediate",
      content: "Slow down and focus on precision. Speed will follow with practice.",
      estimatedDuration: 25,
    },
  ],
  advanced: [
    {
      id: "a1",
      title: "Speed Challenge 100 WPM",
      description: "Break through the 100 WPM barrier",
      difficulty: "advanced",
      content: "Advanced typing drills designed for competitive speeds.",
      estimatedDuration: 40,
    },
    {
      id: "a2",
      title: "Complex Texts",
      description: "Type technical and literary passages",
      difficulty: "advanced",
      content: "Handle varied, complex texts with uncommon words and formats.",
      estimatedDuration: 45,
    },
    {
      id: "a3",
      title: "Professional Typing",
      description: "Code snippets and technical writing",
      difficulty: "advanced",
      content: "Specialize in typing code, technical documentation, and professional content.",
      estimatedDuration: 50,
    },
    {
      id: "a4",
      title: "Master Typist Elite",
      description: "Become an elite typist with 150+ WPM",
      difficulty: "advanced",
      content: "Final challenge for those pursuing professional typing excellence.",
      estimatedDuration: 60,
    },
  ],
}

// Mock completed lessons - in a real app, this would come from a database
const COMPLETED_LESSONS = new Set(["b1", "b2", "i1"])

export default function LessonsPage() {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)

  const calculateProgress = (category: string) => {
    const lessons = LESSONS_DATA[category] || []
    const completed = lessons.filter((l) => COMPLETED_LESSONS.has(l.id)).length
    return Math.round((completed / lessons.length) * 100)
  }

  const handleLessonClick = (lessonId: string) => {
    setSelectedLesson(lessonId)
    // In a real app, navigate to the lesson
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Typing Lessons</h1>
          <p className="text-lg text-foreground/60">
            Progress through structured lessons designed to improve your typing skills systematically.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {(["beginner", "intermediate", "advanced"] as const).map((category) => {
            const progress = calculateProgress(category)
            return (
              <div key={category} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4 capitalize">{category} Lessons</h3>
                <Progress value={progress} className="mb-3" />
                <p className="text-sm text-foreground/60">{progress}% Complete</p>
              </div>
            )
          })}
        </div>

        {/* Lessons by Difficulty */}
        <Tabs defaultValue="beginner" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {(["beginner", "intermediate", "advanced"] as const).map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {LESSONS_DATA[category].map((lesson, index) => {
                  const isCompleted = COMPLETED_LESSONS.has(lesson.id)
                  // Lock lessons until previous one is completed
                  const isLocked =
                    category === "intermediate" && !COMPLETED_LESSONS.has("b4") && index === 0
                      ? true
                      : category === "advanced" && !COMPLETED_LESSONS.has("i4") && index === 0
                        ? true
                        : false

                  return (
                    <Link href={`/lessons/${lesson.id}`} key={lesson.id}>
                      <LessonCard
                        lesson={lesson}
                        isCompleted={isCompleted}
                        isLocked={isLocked}
                        onClick={() => handleLessonClick(lesson.id)}
                      />
                    </Link>
                  )
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Learning Path Info */}
        <div className="mt-16 bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Your Learning Path</h2>
          <div className="space-y-3 text-foreground/70">
            <p>
              1. Start with <span className="font-semibold text-foreground">Beginner</span> lessons to build
              foundational skills
            </p>
            <p>
              2. Progress to <span className="font-semibold text-foreground">Intermediate</span> once you master the
              basics
            </p>
            <p>
              3. Challenge yourself with <span className="font-semibold text-foreground">Advanced</span> lessons for
              professional-level typing
            </p>
            <p className="pt-2 text-sm">Complete all lessons in a category to unlock the next level.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
