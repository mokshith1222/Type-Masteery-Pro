"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { TypingResultsGraph } from "@/components/typing-results-graph"

const QUOTES = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Innovation distinguishes between a leader and a follower. - Steve Jobs",
  "Life is what happens when you're busy making other plans. - John Lennon",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "It is during our darkest moments that we must focus to see the light. - Aristotle",
  "The way to get started is to quit talking and begin doing. - Walt Disney",
  "Don't let yesterday take up too much of today. - Will Rogers",
  "The only impossible journey is the one you never begin. - Tony Robbins",
  "Success is not about making money. It's about making a difference. - Unknown",
  "Your time is limited, do not waste it living someone else's life. - Steve Jobs",
  "The best time to plant a tree was twenty years ago. The second best time is now. - Chinese Proverb",
  "Be yourself everyone else is already taken. - Oscar Wilde",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "The future is created by what you do today, not tomorrow. - Unknown",
  "Everything you've ever wanted is on the other side of fear. - George Addair",
  "The only limit to our realization is our doubt about the future. - Franklin D. Roosevelt",
  "Do what you can with all you have, wherever you are. - Theodore Roosevelt",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "The perfect time to start is now. - Unknown",
  "Great things never came from comfort zones. - Unknown",
  "Success is not final, failure is not fatal. - Winston Churchill",
]

interface QuotesTypingTestProps {
  wordCount?: number
}

export default function QuotesTypingTest({ wordCount = 25 }: QuotesTypingTestProps) {
  const [quote, setQuote] = useState("")
  const [input, setInput] = useState("")
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const selectedQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)]
    const words = selectedQuote.split(/\s+/)
    if (words.length > wordCount) {
      const truncatedQuote = words.slice(0, wordCount).join(" ")
      setQuote(truncatedQuote)
    } else {
      setQuote(selectedQuote)
    }
  }, [wordCount])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && !isComplete) {
      interval = setInterval(() => setTime((t) => t + 1), 100)
    }
    return () => clearInterval(interval)
  }, [isRunning, isComplete])

  const calculateStats = () => {
    const words = input.trim().split(/\s+/).length
    const minutes = Math.max(time / 600, 0.01)
    const wpm = Math.round(words / minutes)
    const correct = input.split("").filter((char, i) => char === quote[i]).length
    const accuracy = input.length > 0 ? Math.round((correct / input.length) * 100) : 0
    const finalMistakes = input.length - correct
    return { wpm, accuracy, mistakes: finalMistakes }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length > quote.length) return
    setInput(value)
    if (!isRunning && value.length > 0) setIsRunning(true)
    if (value === quote) {
      setIsRunning(false)
      setIsComplete(true)
    }
  }

  const handleReset = () => {
    const selectedQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)]
    const words = selectedQuote.split(/\s+/)
    if (words.length > wordCount) {
      const truncatedQuote = words.slice(0, wordCount).join(" ")
      setQuote(truncatedQuote)
    } else {
      setQuote(selectedQuote)
    }
    setInput("")
    setTime(0)
    setIsRunning(false)
    setIsComplete(false)
    inputRef.current?.focus()
  }

  const stats = calculateStats()
  const progress = (input.length / quote.length) * 100

  return (
    <div>
      <div className="mb-8 p-4 bg-accent/10 border border-accent/30 rounded-lg">
        <p className="text-sm text-foreground/80">
          <span className="font-semibold">Instructions:</span> Type the quote exactly as shown to complete the test and
          see your results.
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
          <p className="text-sm text-foreground/60">Time</p>
          <p className="text-3xl font-bold text-secondary">{(time / 10).toFixed(1)}s</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-foreground/60">Mistakes</p>
          <p className="text-3xl font-bold text-destructive">{stats.mistakes}</p>
        </div>
      </div>

      <div className="w-full h-2 bg-muted rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="bg-card border border-border rounded-lg p-8 mb-8">
        <p className="text-xl italic leading-relaxed text-foreground/70">"{quote}"</p>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInput}
        placeholder="Type the quote exactly..."
        disabled={isComplete}
        className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary mb-8"
        autoFocus
      />

      <div className="flex gap-4">
        <Button size="lg" variant="outline" onClick={handleReset} className="gap-2 bg-transparent flex-1">
          <RotateCcw className="w-4 h-4" />
          Next Quote
        </Button>
      </div>

      {isComplete && (
        <TypingResultsGraph
          wpm={stats.wpm}
          accuracy={stats.accuracy}
          mistakes={stats.mistakes}
          time={time / 10}
          testType="quotes"
          totalCharacters={input.length}
        />
      )}
    </div>
  )
}
