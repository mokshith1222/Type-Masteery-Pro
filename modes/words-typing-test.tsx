"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { TypingResultsGraph } from "@/components/typing-results-graph"

interface WordsTypingTestProps {
  wordCount?: number
}

const WORDS = [
  "the",
  "be",
  "to",
  "of",
  "and",
  "a",
  "in",
  "that",
  "have",
  "I",
  "it",
  "for",
  "not",
  "on",
  "with",
  "he",
  "as",
  "you",
  "do",
  "at",
  "this",
  "but",
  "his",
  "by",
  "from",
  "they",
  "we",
  "say",
  "her",
  "she",
  "or",
  "an",
  "will",
  "my",
  "one",
  "all",
  "would",
  "there",
  "their",
  "what",
  "so",
  "up",
  "out",
  "if",
  "about",
  "who",
  "get",
  "which",
  "go",
  "me",
  "when",
  "make",
  "can",
  "like",
  "time",
  "no",
  "just",
  "him",
  "know",
  "take",
  "people",
  "into",
  "year",
  "your",
  "good",
  "some",
  "could",
  "them",
  "see",
  "other",
  "than",
  "then",
  "now",
  "look",
  "only",
  "come",
  "its",
  "over",
  "think",
  "also",
]

export default function WordsTypingTest({ wordCount = 25 }: WordsTypingTestProps) {
  const [words, setWords] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [input, setInput] = useState("")
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [score, setScore] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const newWords = Array.from({ length: wordCount }, () => WORDS[Math.floor(Math.random() * WORDS.length)])
    setWords(newWords)
  }, [wordCount])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => setTime((t) => t + 1), 100)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (!isRunning && value.length > 0) {
      setIsRunning(true)
    }

    if (value.includes(" ")) {
      const word = value.trim()
      // Only increment score if word is correct (don't penalize corrections)
      if (word === words[currentIndex]) {
        setScore(score + 1)
      }
      setInput("")
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      if (nextIndex >= words.length) {
        setIsRunning(false)
      }
    } else {
      setInput(value)
    }
  }

  const handleReset = () => {
    const newWords = Array.from({ length: wordCount }, () => WORDS[Math.floor(Math.random() * WORDS.length)])
    setWords(newWords)
    setCurrentIndex(0)
    setInput("")
    setTime(0)
    setIsRunning(false)
    setScore(0)
    setMistakes(0)
    inputRef.current?.focus()
  }

  const isComplete = currentIndex >= words.length
  const finalMistakes = words.length - score
  const accuracy = isComplete && time > 0 ? Math.round((score / words.length) * 100) : 0
  const wpm = time > 0 ? Math.round(score / (time / 600) || 0) : 0

  return (
    <div>
      <div className="mb-8 p-4 bg-accent/10 border border-accent/30 rounded-lg">
        <p className="text-sm text-foreground/80">
          <span className="font-semibold">Instructions:</span> Type each word correctly and press space after each word
          to see your results.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-foreground/60">WPM</p>
          <p className="text-3xl font-bold text-primary">{wpm}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-foreground/60">Accuracy</p>
          <p className="text-3xl font-bold text-accent">{accuracy}%</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-foreground/60">Score</p>
          <p className="text-3xl font-bold text-secondary">
            {score}/{words.length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-foreground/60">Mistakes</p>
          <p className="text-3xl font-bold text-destructive">{finalMistakes}</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-12 mb-8 text-center">
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {words.map((word, idx) => (
            <span
              key={idx}
              className={`text-xl font-mono px-3 py-2 rounded ${
                idx < currentIndex
                  ? "bg-green-500/20 text-green-500"
                  : idx === currentIndex
                    ? "bg-primary/30 text-primary font-bold"
                    : "text-foreground/40"
              }`}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInput}
        placeholder="Type each word and press space..."
        disabled={isComplete}
        className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary mb-8"
        autoFocus
      />

      <Button size="lg" variant="outline" onClick={handleReset} className="w-full gap-2 bg-transparent mb-8">
        <RotateCcw className="w-4 h-4" />
        Reset
      </Button>

      {isComplete && (
        <TypingResultsGraph
          wpm={wpm}
          accuracy={accuracy}
          mistakes={finalMistakes}
          time={time / 10}
          testType="words"
          totalCharacters={words.length}
        />
      )}
    </div>
  )
}
