"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { TypingResultsGraph } from "@/components/typing-results-graph"

const FULL_PARAGRAPHS = [
  "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once. It is commonly used for testing typewriters and computer keyboards, displaying examples of fonts, and other applications involving text. The phrase has been a staple of the typing and design industry for over a century, proving its enduring utility in education and professional settings worldwide.",

  "Programming is the art of telling another human what you want the computer to do. Code is poetry written in a language that both humans and machines can understand. Every line of code tells a story about problem-solving. The greatest programmers are those who can balance elegance with functionality, creating solutions that are both beautiful and efficient. They understand that code is read far more often than it is written.",

  "Type faster, type better. Master the keyboard and watch your productivity soar with every keystroke. Speed and accuracy are the foundations of professional typing. Consistent practice builds muscle memory and confidence. The difference between an amateur typist and a professional can be measured in words per minute, but more importantly in the quality and accuracy of their work. Professionalism in typing leads to success in communication.",

  "In the beginning, there was nothing. Then came the first line of code, and from that emerged entire worlds. Technology transforms ideas into reality through careful planning and execution. Every program started as a simple thought. From the smallest script to the largest enterprise system, all software begins with a vision and the determination to see it through to completion. Innovation requires both imagination and technical skill.",

  "Your brain is an incredible organ that constantly adapts and learns through regular practice and dedication. Neuroscience shows that repeated practice creates new neural pathways. The more you practice typing, the more natural it becomes. Your fingers develop muscle memory that allows you to type without consciously thinking about each keystroke. This automaticity frees your mind to focus on the content rather than the mechanics of typing. The brain is constantly rewiring itself.",

  "Success is not final, failure is not fatal. It is the courage to continue that counts. Every keystroke brings you closer to mastery. The journey of a thousand miles begins with a single step of determination and persistence. Whether you are learning to type or mastering a new skill, remember that progress is made through consistent effort and a willingness to embrace challenges. Persistence is the key to all achievement.",

  "Learning to type efficiently is an investment in your future productivity and professional success. Fast typing skills save you hours each week and reduce stress. Embrace the challenge and celebrate your progress with every practice session. In today's digital world, typing is as fundamental as handwriting was in previous generations. Those who master this skill gain a significant advantage in both education and career. Your future self will thank you for practicing today.",

  "The digital world moves at lightning speed. Those who can type quickly and accurately gain a competitive advantage. Your fingers are the gateway to your thoughts. Let them dance across the keyboard with precision and grace. In an era where communication happens at the speed of thought, the ability to type quickly and accurately becomes increasingly valuable. Speed and accuracy define success in the digital age.",

  "Technology has transformed how we communicate and work together across the globe. Typing is the modern form of written expression in the digital age. Every character you type becomes part of the digital conversation. Email, messaging, social media, and content creation all depend on typing skills. Whether you are composing a professional email or writing creative content, typing ability matters. The digital revolution has made typing more important than ever.",

  "Dedication and consistency are the keys to mastering any skill. Whether you are a student, professional, or writer, typing speed matters. Practice makes perfect, and perfection comes from repetition and mindful effort. Each day that you practice your typing brings you closer to fluency. The habits you build today will serve you for the rest of your life. Consistency compounds into excellence over time.",

  "The power of words lies not just in their meaning but in how quickly you can share them. Fast typing enables faster thinking and creative expression. Your thoughts flow freely when your fingers can keep pace. Writers know that the speed of typing affects the quality of their work. When typing does not slow you down, your ideas can flow without interruption. The physical act of typing influences your creative process.",

  "In this digital era, communication is instantaneous and continuous. Those who can type quickly are better equipped to keep up with the pace. Every second saved is a victory in the race against time. Instant messaging, email, and video conferencing all require fast typing. In professional settings, typing speed can directly impact your productivity and success. The ability to communicate quickly is invaluable.",

  "Typing is both an art and a science. It requires technique, rhythm, and muscle memory. Master the fundamentals and everything else becomes easier and more natural. Proper posture, finger placement, and hand position all contribute to typing speed and accuracy. Learning the correct technique from the beginning prevents bad habits from forming. Good form leads to better results and fewer injuries.",

  "The keyboard is your instrument and each word is a note. When you type with skill and confidence, your message resonates with power. Practice until typing becomes second nature. Musicians practice scales and chords to master their instruments. Typists practice exercises and passages to master the keyboard. Both require dedication and repetition. The keyboard is truly an instrument for modern communication.",

  "From ancient scribes to modern typists, the written word has always been essential. Today's typist carries on a proud tradition of communication and information sharing. Throughout history, the ability to write quickly has been valued. The typewriter revolutionized writing in the nineteenth and twentieth centuries. Today the computer keyboard continues this evolution. Writing and typing connect us across time and space.",

  "Every expert was once a beginner who refused to give up. Your commitment to improvement will pay dividends in your typing ability. Embrace the learning process with patience and persistence. The path to expertise is long but rewarding. Every practice session builds skills that compound over time. Beginner typists can become experts through determination and practice. The journey is just as important as the destination.",

  "The internet connects millions of people through the written word. Fast and accurate typing is essential for effective digital communication. Your voice deserves to be heard clearly and quickly. Online communities, social media, and digital platforms all rely on written communication. The ability to type well allows you to participate fully in the digital world. Your typing skills are your voice in the digital age.",

  "Muscle memory develops through repetition and conscious practice over time. Your hands will remember the keyboard layout without conscious thought. Building this memory takes dedication but rewards you forever. Neurologically, repeated actions create stronger neural connections. These connections allow actions to become automatic and effortless. Muscle memory is one of the greatest gifts of consistent practice.",

  "Words have power to inspire, inform, and transform the world around us. When you can type quickly and accurately, you unlock this potential. Let your fingers fly across the keyboard with confidence. Every word you type has the potential to change someone's perspective. The power of written communication has never been greater. Your ability to type well magnifies your voice and influence.",

  "The journey to typing mastery is rewarding and full of small victories. Celebrate each improvement and build upon your progress daily. With determination and practice, you will achieve your typing goals. Whether your goal is fifty words per minute or one hundred, the path is the same. Consistent practice and focused effort lead to measurable improvement. Every keystroke is a step toward your goal. Celebrate the progress you are making today.",
]

export default function ParagraphsTypingTest() {
  const [paragraph, setParagraph] = useState("")
  const [input, setInput] = useState("")
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const selectedParagraph = FULL_PARAGRAPHS[Math.floor(Math.random() * FULL_PARAGRAPHS.length)]
    setParagraph(selectedParagraph)
    setInput("")
    setTime(0)
    setIsRunning(false)
    setIsComplete(false)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && !isComplete) {
      interval = setInterval(() => setTime((t) => t + 1), 100)
    }
    return () => clearInterval(interval)
  }, [isRunning, isComplete])

  const calculateStats = () => {
    const words = input
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0).length
    const minutes = Math.max(time / 600, 0.01)
    const wpm = Math.round(words / minutes)

    // Count only FINAL mistakes by comparing input with target text character by character
    let finalMistakes = 0
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== paragraph[i]) {
        finalMistakes++
      }
    }

    const correct = input.split("").filter((char, i) => char === paragraph[i]).length
    const accuracy = input.length > 0 ? Math.round((correct / input.length) * 100) : 0
    return { wpm, accuracy, correct, mistakes: finalMistakes }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length > paragraph.length) return

    setInput(value)
    if (!isRunning && value.length > 0) setIsRunning(true)

    // Auto-complete when full paragraph is typed correctly
    if (value === paragraph && value.length > 0) {
      setIsRunning(false)
      setIsComplete(true)
    }
  }

  const handleReset = () => {
    const selectedParagraph = FULL_PARAGRAPHS[Math.floor(Math.random() * FULL_PARAGRAPHS.length)]
    setParagraph(selectedParagraph)
    setInput("")
    setTime(0)
    setIsRunning(false)
    setIsComplete(false)
    inputRef.current?.focus()
  }

  const stats = calculateStats()
  const progress = (input.length / paragraph.length) * 100

  return (
    <div>
      <div className="mb-8 p-4 bg-accent/10 border border-accent/30 rounded-lg">
        <p className="text-sm text-foreground/80">
          <span className="font-semibold">Instructions:</span> Type the full paragraph correctly to complete the test
          and see your results.
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

      <div className="bg-card border border-border rounded-lg p-8 mb-8 min-h-40">
        <p className="text-base leading-relaxed text-foreground/60 whitespace-pre-wrap">
          {paragraph.split("").map((char, i) => {
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
        placeholder="Click here and start typing the paragraph..."
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
          time={time / 10}
          testType="paragraphs"
          totalCharacters={input.length}
        />
      )}
    </div>
  )
}
