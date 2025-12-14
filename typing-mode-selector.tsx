"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Zap, BookOpen, Clock, Quote, Hash, Code2, Target, Flame, CheckSquare } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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

interface ModeInfo {
  id: TypingMode
  label: string
  description: string
  icon: React.ReactNode
  settings?: React.ReactNode
}

const MODES: ModeInfo[] = [
  {
    id: "classic",
    label: "Classic",
    description: "Type paragraphs of text",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    id: "words",
    label: "Words",
    description: "Type random words",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: "timed",
    label: "Timed",
    description: "Time challenges",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    id: "quotes",
    label: "Quotes",
    description: "Famous quotes",
    icon: <Quote className="w-5 h-5" />,
  },
  {
    id: "numbers",
    label: "Numbers",
    description: "Numbers and symbols",
    icon: <Hash className="w-5 h-5" />,
  },
  {
    id: "programming",
    label: "Code",
    description: "Programming syntax",
    icon: <Code2 className="w-5 h-5" />,
  },
  {
    id: "accuracy",
    label: "Accuracy",
    description: "Focus on perfection",
    icon: <Target className="w-5 h-5" />,
  },
  {
    id: "sprint",
    label: "Sprint",
    description: "1 minute test",
    icon: <Flame className="w-5 h-5" />,
  },
  {
    id: "tasks",
    label: "Tasks",
    description: "30 timed challenges",
    icon: <CheckSquare className="w-5 h-5" />,
  },
  {
    id: "paragraphs",
    label: "Paragraphs",
    description: "Type full paragraphs",
    icon: <BookOpen className="w-5 h-5" />,
  },
]

interface TypingModeSelectorProps {
  currentMode: TypingMode
  onModeChange: (mode: TypingMode) => void
  onSettingsChange: (settings: any) => void
}

export default function TypingModeSelector({ currentMode, onModeChange, onSettingsChange }: TypingModeSelectorProps) {
  const [expandedMode, setExpandedMode] = useState<TypingMode | null>(null)
  const [wordCount, setWordCount] = useState("25")
  const [language, setLanguage] = useState("javascript")
  const [timerDuration, setTimerDuration] = useState("15")

  const currentModeInfo = MODES.find((m) => m.id === currentMode)

  const handleWordCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setWordCount(value)
    onSettingsChange({ wordCount: Number.parseInt(value) })
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setLanguage(value)
    onSettingsChange({ language: value })
  }

  const handleTimerDurationChange = (duration: string) => {
    setTimerDuration(duration)
    onSettingsChange({ timerDuration: Number.parseInt(duration) })
  }

  return (
    <div className="space-y-4">
      {/* Mode Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {MODES.map((mode) => (
          <motion.div key={mode.id}>
            <Button
              onClick={() => {
                onModeChange(mode.id)
                setExpandedMode(mode.settings ? mode.id : null)
              }}
              variant={currentMode === mode.id ? "default" : "outline"}
              className={`w-full flex flex-col items-start gap-2 h-auto p-4 transition-all ${
                currentMode === mode.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent hover:bg-card"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-2 w-full">
                {mode.icon}
                <span className="font-semibold">{mode.label}</span>
              </div>
              <p className={`text-xs ${currentMode === mode.id ? "text-primary-foreground/80" : "text-foreground/60"}`}>
                {mode.description}
              </p>
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Mode Settings */}
      <AnimatePresence>
        {currentMode === "words" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 p-3 bg-card rounded-lg"
          >
            <label className="text-sm font-medium">Word Count</label>
            <select
              value={wordCount}
              onChange={handleWordCountChange}
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
            >
              <option value="15">15 words</option>
              <option value="25">25 words</option>
              <option value="50">50 words</option>
              <option value="75">75 words</option>
              <option value="100">100 words</option>
            </select>
          </motion.div>
        )}

        {currentMode === "timed" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 p-3 bg-card rounded-lg"
          >
            <label className="text-sm font-medium">Duration</label>
            <div className="flex gap-2">
              {["15", "30", "60"].map((duration) => (
                <button
                  key={duration}
                  onClick={() => handleTimerDurationChange(duration)}
                  className={`flex-1 px-2 py-1 rounded-md text-xs font-medium transition-all ${
                    timerDuration === duration
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border border-border hover:bg-card"
                  }`}
                >
                  {duration}s
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {currentMode === "programming" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 p-3 bg-card rounded-lg"
          >
            <div>
              <label className="text-sm font-medium">Programming Language</label>
              <select
                value={language}
                onChange={handleLanguageChange}
                className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="csharp">C#</option>
                <option value="golang">Go</option>
                <option value="rust">Rust</option>
              </select>
            </div>
          </motion.div>
        )}

        {currentMode === "classic" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 p-3 bg-card rounded-lg"
          >
            <label className="text-sm font-medium">Word Count</label>
            <select
              value={wordCount}
              onChange={handleWordCountChange}
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
            >
              <option value="15">15 words</option>
              <option value="25">25 words</option>
              <option value="50">50 words</option>
              <option value="75">75 words</option>
              <option value="100">100 words</option>
            </select>
          </motion.div>
        )}

        {currentMode === "numbers" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 p-3 bg-card rounded-lg"
          >
            <label className="text-sm font-medium">Word Count</label>
            <select
              value={wordCount}
              onChange={handleWordCountChange}
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
            >
              <option value="15">15 words</option>
              <option value="25">25 words</option>
              <option value="50">50 words</option>
              <option value="75">75 words</option>
              <option value="100">100 words</option>
            </select>
          </motion.div>
        )}

        {currentMode === "tasks" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 p-3 bg-card rounded-lg"
          >
            <label className="text-sm font-medium">Duration</label>
            <div className="flex gap-2">
              {["15", "30", "60"].map((duration) => (
                <button
                  key={duration}
                  onClick={() => handleTimerDurationChange(duration)}
                  className={`flex-1 px-2 py-1 rounded-md text-xs font-medium transition-all ${
                    timerDuration === duration
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border border-border hover:bg-card"
                  }`}
                >
                  {duration}s
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
