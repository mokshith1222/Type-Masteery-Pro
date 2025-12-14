"use client"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import TypingModeSelector from "@/components/typing-mode-selector"
import ClassicTypingTest from "@/components/modes/classic-typing-test"
import WordsTypingTest from "@/components/modes/words-typing-test"
import TimedTypingTest from "@/components/modes/timed-typing-test"
import QuotesTypingTest from "@/components/modes/quotes-typing-test"
import NumbersTypingTest from "@/components/modes/numbers-typing-test"
import ProgrammingTypingTest from "@/components/modes/programming-typing-test"
import AccuracyTypingTest from "@/components/modes/accuracy-typing-test"
import SprintTypingTest from "@/components/modes/sprint-typing-test"
import TasksTypingTest from "@/components/modes/tasks-typing-test"
import ParagraphsTypingTest from "@/components/modes/paragraphs-typing-test"

type TypingMode =
  | "classic"
  | "words"
  | "timed"
  | "quotes"
  | "numbers"
  | "programming"
  | "accuracy"
  | "sprint"
  | "tasks"
  | "paragraphs"

interface ModeSettings {
  wordCount?: number
  language?: string
  timerDuration?: number
}

export default function TypingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const queryMode = searchParams.get("mode") as TypingMode | null
  const [mode, setMode] = useState<TypingMode>("classic")

  const [settings, setSettings] = useState<ModeSettings>({
    wordCount: 25,
    language: "javascript",
    timerDuration: 15,
  })

  useEffect(() => {
    if (queryMode && queryMode !== mode) {
      setMode(queryMode)
    }
  }, [queryMode, mode])

  const handleModeChange = (newMode: TypingMode) => {
    setMode(newMode)
    router.push(`/typing?mode=${newMode}`)
  }

  const handleSettingsChange = (newSettings: ModeSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }

  const renderMode = () => {
    switch (mode) {
      case "classic":
        return <ClassicTypingTest wordCount={settings.wordCount || 25} />
      case "words":
        return <WordsTypingTest wordCount={settings.wordCount || 25} />
      case "timed":
        return <TimedTypingTest duration={settings.timerDuration || 15} wordCount={settings.wordCount || 25} />
      case "quotes":
        return <QuotesTypingTest wordCount={settings.wordCount || 25} />
      case "numbers":
        return <NumbersTypingTest wordCount={settings.wordCount || 25} />
      case "programming":
        return (
          <ProgrammingTypingTest language={settings.language || "javascript"} wordCount={settings.wordCount || 25} />
        )
      case "accuracy":
        return <AccuracyTypingTest wordCount={settings.wordCount || 25} />
      case "sprint":
        return <SprintTypingTest wordCount={settings.wordCount || 25} />
      case "tasks":
        return <TasksTypingTest />
      case "paragraphs":
        return <ParagraphsTypingTest />
      default:
        return <ClassicTypingTest wordCount={settings.wordCount || 25} />
    }
  }

  return (
    <div className="min-h-screen bg-background pt-8 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Typing Practice</h1>
          <p className="text-foreground/60 mb-6">Choose a mode and start typing. No login required.</p>
          <TypingModeSelector
            currentMode={mode}
            onModeChange={handleModeChange}
            onSettingsChange={handleSettingsChange}
          />
        </div>

        {/* Typing Mode Component */}
        <div className="mt-8">{renderMode()}</div>
      </div>
    </div>
  )
}
