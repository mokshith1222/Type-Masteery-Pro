"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { TypingResultsGraph } from "@/components/typing-results-graph"

const CLASSIC_TEXTS = [
  "The quick brown fox jumps over the lazy dog with grace and agility. This pangram contains every letter of the alphabet at least once. It is commonly used for testing typewriters and computer keyboards, displaying examples of fonts, and other applications involving text. The phrase has been a staple of the typing and design industry for over a century, proving its enduring utility in education and professional settings worldwide. Its versatility makes it invaluable for designers, developers, and educators everywhere. From printing presses to digital displays, this sentence has remained relevant throughout history.",
  "Programming is the art of telling another human what you want the computer to do through carefully written instructions and logical sequences. Code is poetry written in a language that both humans and machines can understand simultaneously. Every line of code tells a story about problem-solving and creative thinking. The greatest programmers are those who can balance elegance with functionality, creating solutions that are both beautiful and efficient. They understand that code is read far more often than it is written by teams of developers. Software architecture requires vision, planning, and meticulous attention to detail throughout the development process.",
  "Type faster, type better, and watch your productivity soar with every keystroke and improved technique. Master the keyboard completely and discover newfound efficiency in your daily tasks. Speed and accuracy are the foundations of professional typing and successful communication. Consistent practice builds muscle memory and confidence in your abilities over time. The difference between an amateur typist and a professional can be measured in words per minute, but more importantly in the quality and accuracy of their work. Professionalism in typing leads directly to success in communication and business endeavors.",
  "In the beginning, there was nothing but an empty void waiting to be filled. Then came the first line of code, and from that emerged entire worlds of digital possibility. Technology transforms ideas into reality through careful planning and systematic execution. Every program started as a simple thought in someone's creative mind. From the smallest script to the largest enterprise system, all software begins with a vision and determination. Innovation requires both imagination and technical skill applied consistently throughout the development lifecycle.",
  "Your brain is an incredible organ that constantly adapts and learns through regular practice and dedicated effort. Neuroscience shows that repeated practice creates new neural pathways and strengthens existing connections. The more you practice typing, the more natural it becomes without conscious thought. Your fingers develop muscle memory that allows you to type without consciously thinking about each keystroke. This automaticity frees your mind to focus entirely on the content rather than the mechanics. The brain is constantly rewiring itself based on your actions and experiences.",
  "Success is not final, failure is not fatal, and what truly matters is the courage to continue moving forward. Every keystroke brings you closer to mastery and proficiency in your craft. The journey of a thousand miles begins with a single step of determination and persistence. Whether you are learning to type or mastering a new skill entirely, remember that progress is made through consistent effort. Celebrate small victories and build upon your success with patience and dedication. Persistence is absolutely the key to all meaningful achievement.",
  "Learning to type efficiently is an investment in your future productivity and professional success worldwide. Fast typing skills save you hours each week and significantly reduce stress and frustration. Embrace the challenge and celebrate your progress with every single practice session you complete. In today's digital world, typing is as fundamental as handwriting was in previous generations. Those who master this skill gain a significant competitive advantage in education and career. Your future self will definitely thank you for practicing typing diligently today.",
  "The digital world moves at lightning speed and waits for no one who lags behind. Those who can type quickly and accurately gain a tremendous competitive advantage. Your fingers are the gateway to your thoughts and ideas in the digital realm. Let them dance across the keyboard with precision and grace throughout your typing journey. In an era where communication happens at the speed of thought, typing ability becomes crucial. Speed and accuracy truly define success in the modern digital age.",
  "Technology has transformed how we communicate and work together across the globe continuously. Typing is the modern form of written expression in the digital age we inhabit. Every character you type becomes part of the digital conversation and record. Email, messaging, social media, and content creation all depend on typing skills. Whether you are composing a professional email or writing creative content, typing ability matters. The digital revolution has made typing more important and essential than ever before.",
  "Dedication and consistency are the keys to mastering absolutely any skill you pursue. Whether you are a student, professional, or writer, typing speed matters greatly. Practice makes perfect, and perfection comes from repetition and mindful effort constantly. Each day that you practice your typing brings you closer to fluency naturally. The habits you build today will serve you faithfully for the rest of your life. Consistency compounds into excellence and mastery over extended periods of time.",
]

interface ClassicTypingTestProps {
  wordCount?: number
}

interface Result {
  wpm: number
  accuracy: number
  mistakes: number
  time: number
  text: string
  input: string
}

export default function ClassicTypingTest({ wordCount = 25 }: ClassicTypingTestProps) {
  const [text, setText] = useState("")
  const [input, setInput] = useState("")
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const selectedText = CLASSIC_TEXTS[Math.floor(Math.random() * CLASSIC_TEXTS.length)]
    const words = selectedText.split(/\s+/)
    const truncatedText = words.slice(0, wordCount).join(" ")
    setText(truncatedText)
    setInput("")
    setTime(0)
    setIsRunning(false)
    setIsComplete(false)
    setResult(null)
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

    // Count only FINAL mistakes by comparing input with target text character by character
    let finalMistakes = 0
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== text[i]) {
        finalMistakes++
      }
    }

    const correct = input.split("").filter((char, i) => char === text[i]).length
    const accuracy = input.length > 0 ? Math.round((correct / input.length) * 100) : 0
    return { wpm, accuracy, correct, mistakes: finalMistakes }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length > text.length) return

    setInput(value)
    if (!isRunning && value.length > 0) setIsRunning(true)
    if (value === text && value.length > 0) {
      setIsRunning(false)
      setIsComplete(true)
      const stats = calculateStats()
      setResult({
        wpm: stats.wpm,
        accuracy: stats.accuracy,
        mistakes: stats.mistakes,
        time,
        text,
        input: value,
      })
    }
  }

  const handleReset = () => {
    setInput("")
    setTime(0)
    setIsRunning(false)
    setIsComplete(false)
    setResult(null)
    const selectedText = CLASSIC_TEXTS[Math.floor(Math.random() * CLASSIC_TEXTS.length)]
    const words = selectedText.split(/\s+/)
    const truncatedText = words.slice(0, wordCount).join(" ")
    setText(truncatedText)
    inputRef.current?.focus()
  }

  const stats = calculateStats()
  const progress = (input.length / text.length) * 100

  return (
    <div>
      <div className="mb-8 p-4 bg-accent/10 border border-accent/30 rounded-lg">
        <p className="text-sm text-foreground/80">
          <span className="font-semibold">Instructions:</span> Type the text correctly to complete the test and see your
          results.
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

      <div className="bg-card border border-border rounded-lg p-8 mb-8 min-h-32">
        <p className="text-lg leading-relaxed font-mono text-foreground/60">
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
        placeholder="Click here and start typing..."
        disabled={isComplete}
        className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary mb-8"
        autoFocus
      />

      <Button size="lg" variant="outline" onClick={handleReset} className="w-full gap-2 mb-8 bg-transparent">
        <RotateCcw className="w-4 h-4" />
        Reset
      </Button>

      {isComplete && result && (
        <TypingResultsGraph
          wpm={stats.wpm}
          accuracy={stats.accuracy}
          mistakes={stats.mistakes}
          time={time}
          testType="Classic"
          totalCharacters={text.length}
        />
      )}
    </div>
  )
}
