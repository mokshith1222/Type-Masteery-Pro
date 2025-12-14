"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { TypingResultsGraph } from "@/components/typing-results-graph"

interface TimedTypingTestProps {
  duration?: number
}

const TIMED_TEXTS = [
  "The quick brown fox jumps over the lazy dog and runs away.",
  "Programming requires patience, practice, and a love for problem solving.",
  "Every keystroke brings you closer to mastery and typing excellence.",
  "Fast typing is a skill that improves with consistent practice every day.",
]

type Duration = 15 | 30 | 60

export default function TimedTypingTest({ duration: propDuration = 15 }: TimedTypingTestProps) {
  const [duration, setDuration] = useState<Duration>(propDuration as Duration)
  const [text, setText] = useState("")
  const [input, setInput] = useState("")
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setText(TIMED_TEXTS[Math.floor(Math.random() * TIMED_TEXTS.length)])
    setTimeLeft(duration)
  }, [duration])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((t) => {
          if (t - 1 === 0) {
            setIsRunning(false)
            setIsComplete(true)
            return 0
          }
          return t - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const calculateStats = () => {
    const words = input.trim().split(/\s+/).length
    const wpm = words
    const correct = input.split("").filter((char, i) => char === text[i]).length
    const accuracy = input.length > 0 ? Math.round((correct / input.length) * 100) : 0
    const finalMistakes = input.length - correct
    return { wpm, accuracy, mistakes: finalMistakes }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)
    if (!isRunning && value.length > 0) setIsRunning(true)
    if (value === text && value.length > 0) {
      setIsRunning(false)
      setIsComplete(true)
    }
  }

  const handleReset = () => {
    setInput("")
    setTimeLeft(duration)
    setIsRunning(false)
    setIsComplete(false)
    setText(TIMED_TEXTS[Math.floor(Math.random() * TIMED_TEXTS.length)])
    inputRef.current?.focus()
  }

  const stats = calculateStats()

  return (
    <div>
      <div className="mb-8 p-4 bg-accent/10 border border-accent/30 rounded-lg">
        <p className="text-sm text-foreground/80">
          <span className="font-semibold">Instructions:</span> Type correctly within the time limit to see your WPM,
          accuracy, and mistakes.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex gap-2 mb-6">
          {([15, 30, 60] as Duration[]).map((d) => (
            <Button
              key={d}
              onClick={() => setDuration(d)}
              variant={duration === d ? "default" : "outline"}
              disabled={isRunning}
            >
              {d}s
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-foreground/60">WPM</p>
          <p className="text-3xl font-bold text-primary">{stats.wpm}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-foreground/60">Accuracy</p>
          <p className="text-3xl font-bold text-accent">{stats.accuracy}%</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-foreground/60">Time Left</p>
          <p className={`text-3xl font-bold ${timeLeft <= 5 ? "text-destructive" : "text-secondary"}`}>{timeLeft}s</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-foreground/60">Mistakes</p>
          <p className="text-3xl font-bold text-destructive">{stats.mistakes}</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-8 mb-8 min-h-32">
        <p className="text-lg leading-relaxed text-foreground/60">{text}</p>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInput}
        placeholder="Type as much as you can in the time limit..."
        disabled={isComplete}
        className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary mb-8"
        autoFocus
      />

      <div className="flex gap-4">
        <Button size="lg" variant="outline" onClick={handleReset} className="gap-2 bg-transparent flex-1">
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>

      {isComplete && (
        <TypingResultsGraph
          wpm={stats.wpm}
          accuracy={stats.accuracy}
          mistakes={stats.mistakes}
          time={duration - timeLeft}
          testType="timed"
          totalCharacters={input.length}
        />
      )}
    </div>
  )
}
