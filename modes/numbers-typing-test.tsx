"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { TypingResultsGraph } from "@/components/typing-results-graph"

function generateNumberSequence(length: number): string {
  return Array.from({ length }, () => {
    const type = Math.random()
    if (type < 0.6) return Math.floor(Math.random() * 10)
    if (type < 0.8) return ["+", "-", "*", "/"][Math.floor(Math.random() * 4)]
    return ["(", ")", "[", "]"][Math.floor(Math.random() * 4)]
  }).join(" ")
}

interface NumbersTypingTestProps {
  wordCount?: number
}

export default function NumbersTypingTest({ wordCount = 25 }: NumbersTypingTestProps) {
  const [text, setText] = useState("")
  const [input, setInput] = useState("")
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [mistakes, setMistakes] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setText(generateNumberSequence(wordCount))
  }, [wordCount])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && !isComplete) {
      interval = setInterval(() => setTime((t) => t + 1), 100)
    }
    return () => clearInterval(interval)
  }, [isRunning, isComplete])

  const calculateStats = () => {
    const correct = input.split("").filter((char, i) => char === text[i]).length
    const accuracy = input.length > 0 ? Math.round((correct / input.length) * 100) : 0
    const cpm = time > 0 ? Math.round(input.length / (time / 600) || 0) : 0

    // Count only FINAL mistakes
    let finalMistakes = 0
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== text[i]) {
        finalMistakes++
      }
    }

    return { cpm, accuracy, mistakes: finalMistakes }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length > text.length) return

    setInput(value)
    if (!isRunning && value.length > 0) setIsRunning(true)
    if (value === text) {
      setIsRunning(false)
      setIsComplete(true)
    }
  }

  const handleReset = () => {
    setText(generateNumberSequence(wordCount))
    setInput("")
    setTime(0)
    setIsRunning(false)
    setIsComplete(false)
    setMistakes(0)
    inputRef.current?.focus()
  }

  const stats = calculateStats()
  const progress = (input.length / text.length) * 100

  return (
    <div>
      <div className="mb-8 p-4 bg-accent/10 border border-accent/30 rounded-lg">
        <p className="text-sm text-foreground/80">
          <span className="font-semibold">Instructions:</span> Type all the numbers and symbols correctly to complete
          the test and see your results.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-foreground/60">CPM</p>
          <p className="text-3xl font-bold text-primary">{stats.cpm}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-foreground/60">Accuracy</p>
          <p className="text-3xl font-bold text-accent">{stats.accuracy}%</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-foreground/60">Time</p>
          <p className="text-3xl font-bold text-secondary">{(time / 10).toFixed(1)}s</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-foreground/60">Mistakes</p>
          <p className="text-3xl font-bold text-destructive">{stats.mistakes}</p>
        </div>
      </div>

      <div className="mb-4 flex justify-between text-sm text-foreground/60">
        <span>
          Characters: {input.length} / {text.length}
        </span>
        <span>Progress: {Math.round(progress)}%</span>
      </div>

      <div className="w-full h-2 bg-muted rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="bg-card border border-border rounded-lg p-8 mb-8 font-mono text-lg text-foreground/60 break-all min-h-32">
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
      </div>

      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInput}
        placeholder="Type the numbers and symbols..."
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
          wpm={stats.cpm}
          accuracy={stats.accuracy}
          mistakes={stats.mistakes}
          time={time / 10}
          testType="numbers"
          totalCharacters={input.length}
        />
      )}
    </div>
  )
}
