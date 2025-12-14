"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { RotateCcw, Pause as Pause2, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import type { TypingStats } from "@/types/typing"

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once, making it useful for testing typewriters and computer keyboards, displaying examples of fonts, and other applications involving text.",
  "Programming is the art of telling another human what you want the computer to do. Code is poetry written in a language that both humans and machines can understand.",
  "Type faster, type better. Master the keyboard and watch your productivity soar. Every keystroke brings you closer to typing excellence and unlocking your full potential.",
  "In the beginning, there was nothing. Then came the first line of code, and from that emerged entire worlds of possibility and innovation in the digital age.",
  "Your brain is an incredible organ that constantly adapts and learns. With regular practice and dedication, you can master any skill, including the ability to type at superhuman speeds.",
]

export default function TypingTest() {
  const [displayText, setDisplayText] = useState("")
  const [userInput, setUserInput] = useState("")
  const [isActive, setIsActive] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [stats, setStats] = useState<TypingStats | null>(null)
  const [testComplete, setTestComplete] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()
  const supabase = createClient()

  // Initialize test
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * SAMPLE_TEXTS.length)
    setDisplayText(SAMPLE_TEXTS[randomIndex])
  }, [])

  // Timer effect
  useEffect(() => {
    if (isActive && !testComplete) {
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isActive, testComplete])

  // Calculate stats in real-time
  const calculateStats = useCallback(
    (input: string) => {
      if (timeElapsed === 0 || input.length === 0) return null

      const correctChars = Array.from(input).filter((char, idx) => displayText[idx] === char).length
      const mistakes = input.length - correctChars
      const words = input.trim().split(/\s+/).length
      const minutes = Math.max(timeElapsed / 60, 0.1)
      const wpm = Math.round(words / minutes)
      const accuracy = Math.round((correctChars / Math.max(input.length, 1)) * 100)

      return {
        wordsPerMinute: Math.max(0, wpm),
        accuracy: Math.max(0, accuracy),
        charactersTyped: input.length,
        correctCharacters: correctChars,
        totalDuration: timeElapsed,
        mistakes: Math.max(0, mistakes),
      }
    },
    [displayText, timeElapsed],
  )

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value

    // Prevent typing beyond the display text
    if (input.length > displayText.length) return

    setUserInput(input)

    if (!isActive && input.length === 1) {
      setIsActive(true)
    }

    const newStats = calculateStats(input)
    if (newStats) setStats(newStats)

    // Check if test is complete
    if (input.length === displayText.length && input === displayText) {
      setIsActive(false)
      setTestComplete(true)
    }
  }

  const handleSubmit = async () => {
    if (!stats) return

    setIsSaving(true)
    try {
      const { data: authData } = await supabase.auth.getUser()
      if (!authData.user) {
        router.push("/auth/login")
        return
      }

      const { error } = await supabase.from("typing_tests").insert({
        user_id: authData.user.id,
        wpm: stats.wordsPerMinute,
        accuracy: stats.accuracy / 100,
        raw_wpm: stats.wordsPerMinute,
        consistency: 95,
        test_duration: stats.totalDuration,
      })

      if (error) throw error

      // Refresh dashboard or show success
      alert("Test saved successfully!")
      handleReset()
    } catch (error) {
      alert("Failed to save test result")
    } finally {
      setIsSaving(false)
    }
  }

  // Reset test
  const handleReset = () => {
    setUserInput("")
    setIsActive(false)
    setTimeElapsed(0)
    setStats(null)
    setTestComplete(false)
    const randomIndex = Math.floor(Math.random() * SAMPLE_TEXTS.length)
    setDisplayText(SAMPLE_TEXTS[randomIndex])
    inputRef.current?.focus()
  }

  // Toggle pause/play
  const handleTogglePause = () => {
    if (userInput.length > 0) {
      setIsActive(!isActive)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="max-w-5xl mx-auto pt-8 pb-16 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Typing Test</h1>
        <p className="text-foreground/60">Type the text as fast and accurately as you can.</p>
      </div>

      {/* Stats Display */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-foreground/60 mb-1">WPM</p>
          <p className="text-3xl font-bold text-primary">{stats?.wordsPerMinute || 0}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-foreground/60 mb-1">Accuracy</p>
          <p className="text-3xl font-bold text-accent">{stats?.accuracy || 0}%</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-foreground/60 mb-1">Time</p>
          <p className="text-3xl font-bold text-secondary">{formatTime(timeElapsed)}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-foreground/60 mb-1">Mistakes</p>
          <p className="text-3xl font-bold text-destructive">{stats?.mistakes || 0}</p>
        </div>
      </div>

      {/* Display Text Area */}
      <div className="mb-8 bg-card border border-border rounded-lg p-8">
        <div className="text-xl leading-relaxed text-foreground/60 min-h-32 font-mono">
          {displayText.split("").map((char, idx) => (
            <span
              key={idx}
              className={cn("transition-colors", {
                "text-foreground bg-primary/20": userInput[idx] === char && userInput[idx],
                "bg-destructive/30 text-destructive": userInput[idx] && userInput[idx] !== char,
                "text-foreground/30": idx >= userInput.length,
              })}
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* Input Field */}
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Click here and start typing..."
        className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary mb-8"
        autoFocus
        disabled={testComplete}
      />

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleTogglePause}
          disabled={userInput.length === 0}
          variant="outline"
          className="flex-1 gap-2 bg-transparent"
        >
          {isActive ? <Pause2 className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isActive ? "Pause" : "Resume"}
        </Button>
        <Button onClick={handleReset} variant="outline" className="flex-1 gap-2 bg-transparent">
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
        <Button
          onClick={handleSubmit}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={!testComplete || isSaving}
        >
          {isSaving ? "Saving..." : "Submit & Save"}
        </Button>
      </div>

      {/* Results */}
      {testComplete && (
        <div className="mt-12 p-8 bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-lg">
          <h2 className="text-2xl font-bold text-foreground mb-6">Test Complete!</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-foreground/60 mb-2">Words Per Minute</p>
              <p className="text-5xl font-bold text-primary">{stats?.wordsPerMinute}</p>
            </div>
            <div>
              <p className="text-foreground/60 mb-2">Accuracy</p>
              <p className="text-5xl font-bold text-accent">{stats?.accuracy}%</p>
            </div>
            <div>
              <p className="text-foreground/60 mb-2">Total Time</p>
              <p className="text-5xl font-bold text-secondary">{formatTime(stats?.totalDuration || 0)}</p>
            </div>
            <div>
              <p className="text-foreground/60 mb-2">Errors</p>
              <p className="text-5xl font-bold text-destructive">{stats?.mistakes}</p>
            </div>
          </div>
          <div className="flex gap-4 mt-8">
            <Button
              onClick={handleSubmit}
              disabled={isSaving}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isSaving ? "Saving..." : "Save & Continue"}
            </Button>
            <Button onClick={handleReset} variant="outline" className="flex-1 bg-transparent">
              Try Again
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
