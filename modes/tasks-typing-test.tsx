"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, CheckCircle, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Task {
  id: number
  text: string
  timeLimit: number
  difficulty: "easy" | "medium" | "hard"
}

const TASKS: Task[] = [
  // Easy Tasks (30-45 seconds)
  { id: 1, text: "The quick brown fox jumps over the lazy dog", timeLimit: 30, difficulty: "easy" },
  { id: 2, text: "Practice makes perfect", timeLimit: 30, difficulty: "easy" },
  { id: 3, text: "Type faster every day", timeLimit: 30, difficulty: "easy" },
  { id: 4, text: "Focus on accuracy first", timeLimit: 35, difficulty: "easy" },
  { id: 5, text: "Keep your fingers on home row", timeLimit: 35, difficulty: "easy" },
  { id: 6, text: "Speed will follow accuracy", timeLimit: 35, difficulty: "easy" },
  { id: 7, text: "Typing is a useful skill", timeLimit: 40, difficulty: "easy" },
  { id: 8, text: "Learn to type without looking", timeLimit: 40, difficulty: "easy" },
  { id: 9, text: "A journey of a thousand miles begins with a single keystroke", timeLimit: 40, difficulty: "easy" },
  { id: 10, text: "The early bird catches the worm", timeLimit: 35, difficulty: "easy" },

  // Medium Tasks (45-60 seconds)
  {
    id: 11,
    text: "Typing is like playing a musical instrument with precision and rhythm",
    timeLimit: 45,
    difficulty: "medium",
  },
  {
    id: 12,
    text: "In the digital age typing has become more important than handwriting",
    timeLimit: 50,
    difficulty: "medium",
  },
  { id: 13, text: "Good typing habits save time and reduce errors in your work", timeLimit: 50, difficulty: "medium" },
  { id: 14, text: "Mastering the keyboard unlocks your productivity potential", timeLimit: 50, difficulty: "medium" },
  {
    id: 15,
    text: "Practice typing daily to improve your speed and accuracy over time",
    timeLimit: 55,
    difficulty: "medium",
  },
  {
    id: 16,
    text: "Your fingers should rest naturally on the home row of the keyboard",
    timeLimit: 50,
    difficulty: "medium",
  },
  {
    id: 17,
    text: "Proper posture and hand positioning are essential for typing efficiency",
    timeLimit: 55,
    difficulty: "medium",
  },
  {
    id: 18,
    text: "The most common typing mistakes come from rushing too quickly",
    timeLimit: 50,
    difficulty: "medium",
  },
  {
    id: 19,
    text: "Building typing speed is a gradual process that requires consistent practice",
    timeLimit: 55,
    difficulty: "medium",
  },
  {
    id: 20,
    text: "Technology has made typing a fundamental skill in modern education",
    timeLimit: 50,
    difficulty: "medium",
  },

  // Hard Tasks (60-90 seconds)
  {
    id: 21,
    text: "The power of words lies not just in their meaning but in how quickly you can convey your thoughts through typing",
    timeLimit: 60,
    difficulty: "hard",
  },
  {
    id: 22,
    text: "Professionals who can type efficiently gain a significant competitive advantage in today's fast-paced digital workplace",
    timeLimit: 70,
    difficulty: "hard",
  },
  {
    id: 23,
    text: "Research shows that typing speed correlates directly with academic performance and professional productivity levels",
    timeLimit: 75,
    difficulty: "hard",
  },
  {
    id: 24,
    text: "The transition from handwriting to typing represents a fundamental shift in how humans communicate and process information",
    timeLimit: 70,
    difficulty: "hard",
  },
  {
    id: 25,
    text: "Keyboard mastery allows writers to express ideas at the speed of thought without losing momentum in their creative process",
    timeLimit: 75,
    difficulty: "hard",
  },
  {
    id: 26,
    text: "Accurate typing is not just about speed but about precision timing and muscle memory developed through deliberate practice",
    timeLimit: 70,
    difficulty: "hard",
  },
  {
    id: 27,
    text: "The intersection of touch typing and digital literacy has become essential for anyone seeking to succeed in technical fields",
    timeLimit: 80,
    difficulty: "hard",
  },
  {
    id: 28,
    text: "Understanding typing ergonomics and implementing proper techniques prevents injury and enables long-term skill development",
    timeLimit: 75,
    difficulty: "hard",
  },
  {
    id: 29,
    text: "In competitive typing, the ability to maintain focus and rhythm while handling complex text becomes the determining factor",
    timeLimit: 80,
    difficulty: "hard",
  },
  {
    id: 30,
    text: "The evolution of typing from mechanical typewriters to digital keyboards has revolutionized the way we create and share written content",
    timeLimit: 85,
    difficulty: "hard",
  },
]

interface TaskResult {
  taskId: number
  wpm: number
  accuracy: number
  mistakes: number
  time: number
}

export default function TasksTypingTest() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [timeLeft, setTimeLeft] = useState(0)
  const [result, setResult] = useState<TaskResult | null>(null)
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (!isTyping || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTyping(false)
          finishTask()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isTyping, timeLeft])

  const startTask = (task: Task) => {
    setSelectedTask(task)
    setIsTyping(true)
    setTypedText("")
    setTimeLeft(task.timeLimit)
    setResult(null)
  }

  const finishTask = () => {
    if (!selectedTask) return

    let mistakes = 0
    const maxLen = Math.max(selectedTask.text.length, typedText.length)
    for (let i = 0; i < maxLen; i++) {
      if (selectedTask.text[i] !== typedText[i]) {
        mistakes++
      }
    }

    const accuracy = Math.max(0, 100 - (mistakes / selectedTask.text.length) * 100)
    const timeSpent = selectedTask.timeLimit - timeLeft
    const wpm = typedText.length > 0 ? Math.round((typedText.split(" ").length / timeSpent) * 60) : 0

    setResult({
      taskId: selectedTask.id,
      wpm: Math.max(0, wpm),
      accuracy: Math.round(accuracy),
      mistakes,
      time: timeSpent,
    })

    setCompletedTasks((prev) => new Set([...prev, selectedTask.id]))
    setIsTyping(false)
  }

  const resetTask = () => {
    if (!selectedTask) return
    setTypedText("")
    setTimeLeft(selectedTask.timeLimit)
    setResult(null)
    setIsTyping(true)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Task List Sidebar */}
      <div className="lg:col-span-1 bg-card rounded-lg p-4 h-fit sticky top-20">
        <h2 className="text-lg font-semibold mb-4 text-foreground">30 Tasks</h2>
        <div className="space-y-2 max-h-[60vh] overflow-y-auto">
          {TASKS.map((task) => (
            <motion.button
              key={task.id}
              onClick={() => !isTyping && startTask(task)}
              disabled={isTyping && selectedTask?.id !== task.id}
              className={`w-full text-left p-3 rounded-lg transition-all text-sm ${
                selectedTask?.id === task.id
                  ? "bg-primary text-primary-foreground"
                  : completedTasks.has(task.id)
                    ? "bg-green-500/20 text-foreground border border-green-500/30"
                    : "bg-muted text-foreground/70 hover:bg-muted/80"
              } ${isTyping && selectedTask?.id !== task.id ? "opacity-50 cursor-not-allowed" : ""}`}
              whileHover={!isTyping ? { x: 4 } : {}}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">Task {task.id}</span>
                {completedTasks.has(task.id) && <CheckCircle className="w-4 h-4" />}
              </div>
              <span
                className={`text-xs block mt-1 ${
                  task.difficulty === "easy"
                    ? "text-blue-400"
                    : task.difficulty === "medium"
                      ? "text-yellow-400"
                      : "text-red-400"
                }`}
              >
                {task.difficulty}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Task Content */}
      <div className="lg:col-span-3">
        {!selectedTask ? (
          <Card className="p-12 flex flex-col items-center justify-center text-center min-h-96">
            <p className="text-foreground/60">Select a task from the menu to begin</p>
          </Card>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Task Display */}
            <Card className="p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Task {selectedTask.id}</h2>
                <div className="flex items-center gap-2">
                  <Clock className={`w-5 h-5 ${timeLeft <= 5 ? "text-red-500" : "text-foreground/60"}`} />
                  <span className={`text-2xl font-bold ${timeLeft <= 5 ? "text-red-500" : "text-foreground"}`}>
                    {timeLeft}s
                  </span>
                </div>
              </div>

              {/* Target Text Display */}
              <div className="bg-muted p-4 rounded-lg mb-4 min-h-24 flex items-center">
                <p className="text-foreground text-lg leading-relaxed">
                  {selectedTask.text.split("").map((char, idx) => (
                    <span
                      key={idx}
                      className={`${
                        idx < typedText.length
                          ? char === typedText[idx]
                            ? "text-green-500"
                            : "text-red-500 underline"
                          : "text-foreground/40"
                      }`}
                    >
                      {char}
                    </span>
                  ))}
                </p>
              </div>

              {/* Input Field */}
              {!result ? (
                <input
                  type="text"
                  value={typedText}
                  onChange={(e) => setTypedText(e.target.value)}
                  disabled={!isTyping}
                  autoFocus
                  className="w-full px-4 py-3 rounded-lg bg-background border-2 border-primary text-foreground focus:outline-none"
                  placeholder={isTyping ? "Start typing..." : "Task not started"}
                />
              ) : null}
            </Card>

            {/* Results Display - Auto-shown when task finishes */}
            {result ? (
              <Card className="p-6 border-2 border-green-500/30 bg-green-500/5">
                <h3 className="text-2xl font-bold text-foreground mb-4">Task Complete!</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-sm text-foreground/60">WPM</p>
                    <p className="text-2xl font-bold text-primary">{result.wpm}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-foreground/60">Accuracy</p>
                    <p className="text-2xl font-bold text-accent">{result.accuracy}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-foreground/60">Mistakes</p>
                    <p className="text-2xl font-bold text-red-500">{result.mistakes}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-foreground/60">Time</p>
                    <p className="text-2xl font-bold">{result.time}s</p>
                  </div>
                </div>

                {result.mistakes > 0 && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-sm font-semibold text-red-400 mb-2">Mistakes at positions:</p>
                    <p className="text-sm text-foreground/70">
                      {Array.from({ length: Math.max(selectedTask.text.length, typedText.length) })
                        .map((_, i) => (selectedTask.text[i] !== typedText[i] ? i + 1 : null))
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button onClick={resetTask} variant="outline" className="flex-1 bg-transparent">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Retry
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedTask(null)
                      setResult(null)
                    }}
                    className="flex-1"
                  >
                    Next Task
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="flex gap-3">
                {!isTyping && (
                  <Button onClick={() => startTask(selectedTask)} size="lg" className="w-full">
                    Start Task
                  </Button>
                )}
                {isTyping && (
                  <Button onClick={finishTask} size="lg" className="w-full bg-red-500 hover:bg-red-600">
                    Finish Task
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
