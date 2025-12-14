"use client"

import type React from "react"
import { TypingResultsGraph } from "@/components/typing-results-graph"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

const SPRINT_TEXTS = [
  "The quick brown fox jumps over the lazy dog and continues running through the forest at incredible speed.",
  "Typing is a skill that improves with practice and dedication every single day and never stops growing.",
  "Master the keyboard with our advanced typing techniques and become a professional typist in no time.",
  "Challenge yourself with our sprint mode and compete with other typists around the entire world.",
]

interface SprintTypingTestProps {
  wordCount?: number
}

export default function SprintTypingTest({ wordCount = 25 }: SprintTypingTestProps) {
  const [text, setText] = useState("")
  const [input, setInput] = useState("")
  const [time, setTime] = useState(60)
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const selectedText = SPRINT_TEXTS[Math.floor(Math.random() * SPRINT_TEXTS.length)]
    const words = selectedText.split(/\s+/)
    const truncatedText = words.slice(0, wordCount).join(" ")
    setText(truncatedText)
  }, [wordCount])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((t) => {
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
  }, [isRunning, time])

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
    if (value.length > text.length) return
    setInput(value)
    if (!isRunning && value.length > 0) setIsRunning(true)
    if (value === text && value.length > 0) {
      setIsRunning(false)
      setIsComplete(true)
    }
  }

  const handleReset = () => {
    const selectedText = SPRINT_TEXTS[Math.floor(Math.random() * SPRINT_TEXTS.length)]
    const words = selectedText.split(/\s+/)
    const truncatedText = words.slice(0, wordCount).join(" ")
    setText(truncatedText)
    setInput("")
    setTime(60)
    setIsRunning(false)
    setIsComplete(false)
    inputRef.current?.focus()
  }

  const stats = calculateStats()

  return (
    <div>
      <div className="mb-8 p-4 bg-accent/10 border border-accent/30 rounded-lg">
        <p className="text-sm text-foreground/80">
          <span className="font-semibold">Instructions:</span> Type as many words as you can before 60 seconds end. Type
          them correctly to get better accuracy!
        </p>
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
          <p className={`text-3xl font-bold ${time <= 10 ? "text-destructive animate-pulse" : "text-secondary"}`}>
            {time}s
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-foreground/60">Mistakes</p>
          <p className="text-3xl font-bold text-destructive">{stats.mistakes}</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-8 mb-8 min-h-32">
        <p className="text-lg leading-relaxed text-foreground/60">
          {text.split("").map((char, i) => {
            let color = "text-foreground/40"
            if (i < input.length) {
              color = input[i] === char ? "text-green-500" : "text-red-500"
            }
            return (
              <span key={i} className={color}>
                {char}
              </span>
            )
          })}
        </p>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInput}
        placeholder="Type as fast as you can for 60 seconds!"
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
          time={60 - time}
          testType="sprint"
          totalCharacters={input.length}
        />
      )}
    </div>
  )
}
