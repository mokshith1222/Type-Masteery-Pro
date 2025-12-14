"use client"

import type React from "react"
import { TypingResultsGraph } from "@/components/typing-results-graph"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface AccuracyTypingTestProps {
  wordCount?: number
}

const ACCURACY_TEXTS = [
  "Accuracy is more important than speed when building strong typing skills.",
  "Precision in every keystroke leads to better overall performance.",
  "Focus on getting it right, not on getting it done quickly.",
  "Quality typing habits start with accuracy and build from there.",
  "Every mistake slows you down more than careful typing does.",
  "Precision is the foundation upon which speed is built.",
  "Train your fingers to be accurate, and speed will follow naturally.",
  "Accuracy builds confidence in your typing abilities.",
  "Get it right the first time, and you will save time overall.",
  "Perfect practice makes perfect, so focus on accuracy.",
  "Your accuracy rate determines your true typing proficiency.",
  "Slow and steady wins the race when it comes to typing.",
  "Careless mistakes undermine all your speed gains.",
  "Build your skills correctly from the start with accuracy.",
  "Typing accurately is a skill that compounds over time.",
  "Quality over quantity is the path to typing mastery.",
  "Accuracy breeds confidence and confidence breeds speed.",
  "Mind your technique and accuracy will follow naturally.",
  "The most successful typists prioritize accuracy always.",
  "Correct finger placement ensures accurate and fast typing.",
]

export default function AccuracyTypingTest({ wordCount = 25 }: AccuracyTypingTestProps) {
  const [text, setText] = useState("")
  const [input, setInput] = useState("")
  const [mistakes, setMistakes] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setText(ACCURACY_TEXTS[Math.floor(Math.random() * ACCURACY_TEXTS.length)])
  }, [])

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
    return { accuracy, correct }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length > text.length) {
      return
    }

    setInput(value)

    if (!isRunning && value.length > 0) setIsRunning(true)

    if (value === text && value.length > 0) {
      setIsComplete(true)
      setIsRunning(false)
    }
  }

  const handleReset = () => {
    setText(ACCURACY_TEXTS[Math.floor(Math.random() * ACCURACY_TEXTS.length)])
    setInput("")
    setMistakes(0)
    setTime(0)
    setIsRunning(false)
    setIsComplete(false)
    inputRef.current?.focus()
  }

  const calculateFinalMistakes = () => {
    const correct = input.split("").filter((char, i) => char === text[i]).length
    return input.length - correct
  }

  const finalMistakes = isComplete ? calculateFinalMistakes() : mistakes

  const stats = calculateStats()
  const progress = (input.length / text.length) * 100

  return (
    <div>
      <div className="mb-8 p-4 bg-accent/10 border border-accent/30 rounded-lg">
        <p className="text-sm text-foreground/80">
          <span className="font-semibold">Instructions:</span> Focus on accuracy! Type the text correctly to complete
          the test and see your results.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-foreground/60">Accuracy</p>
          <p className="text-3xl font-bold text-accent">{stats.accuracy}%</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-foreground/60">Correct</p>
          <p className="text-3xl font-bold text-green-500">{stats.correct}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-foreground/60">Mistakes</p>
          <p className="text-3xl font-bold text-destructive">{finalMistakes}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-foreground/60">Time</p>
          <p className="text-3xl font-bold text-primary">{(time / 10).toFixed(1)}s</p>
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
        placeholder="Type carefully - accuracy matters most..."
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
          wpm={Math.round(stats.correct / (time / 600) || 0)}
          accuracy={stats.accuracy}
          mistakes={finalMistakes}
          time={time / 10}
          testType="accuracy"
          totalCharacters={input.length}
        />
      )}
    </div>
  )
}
