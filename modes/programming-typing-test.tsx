"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { TypingResultsGraph } from "@/components/typing-results-graph"

interface ProgrammingTypingTestProps {
  language?: string
  wordCount?: number
}

const CODE_SNIPPETS: Record<string, string[]> = {
  javascript: [
    `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
    `const sortArray = (arr) => {
  return arr.sort((a, b) => a - b);
};`,
    `class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}`,
    `const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    // Error handling
  }
};`,
  ],
  python: [
    `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)`,
    `def sort_array(arr):
    return sorted(arr)`,
    `class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email`,
    `async def fetch_data(url):
    try:
        response = await fetch(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")`,
  ],
  java: [
    `public class User {
    private String name;
    private String email;
    
    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }
}`,
    `public static int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}`,
    `List<Integer> sorted = Arrays.stream(arr)
    .sorted()
    .collect(Collectors.toList());`,
    `public static void main(String[] args) {
    System.out.println("Hello, World!");
}`,
  ],
  c: [
    `int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}`,
    `void sort_array(int arr[], int n) {
    qsort(arr, n, sizeof(int), compare);
}`,
    `struct User {
    char name[50];
    char email[50];
};`,
    `int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  ],
  cpp: [
    `int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}`,
    `std::vector<int> sort_vector(std::vector<int> v) {
    std::sort(v.begin(), v.end());
    return v;
}`,
    `class User {
private:
    std::string name;
    std::string email;
};`,
    `int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
  ],
  csharp: [
    `public int Fibonacci(int n) {
    if (n <= 1) return n;
    return Fibonacci(n - 1) + Fibonacci(n - 2);
}`,
    `public List<int> SortArray(List<int> arr) {
    arr.Sort();
    return arr;
}`,
    `public class User {
    public string Name { get; set; }
    public string Email { get; set; }
}`,
    `class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
  ],
  golang: [
    `func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}`,
    `func sortArray(arr []int) []int {
    sort.Ints(arr)
    return arr
}`,
    `type User struct {
    Name  string
    Email string
}`,
    `func main() {
    fmt.Println("Hello, World!")
}`,
  ],
  rust: [
    `fn fibonacci(n: u32) -> u32 {
    match n {
        0 | 1 => n,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}`,
    `fn sort_vector(mut v: Vec<i32>) -> Vec<i32> {
    v.sort();
    v
}`,
    `struct User {
    name: String,
    email: String,
}`,
    `fn main() {
    println!("Hello, World!");
}`,
  ],
}

export default function ProgrammingTypingTest({ language = "javascript", wordCount = 50 }: ProgrammingTypingTestProps) {
  const [code, setCode] = useState("")
  const [input, setInput] = useState("")
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [mistakes, setMistakes] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const snippets = CODE_SNIPPETS[language] || CODE_SNIPPETS.javascript
    let selectedCode = snippets[Math.floor(Math.random() * snippets.length)]

    const lines = selectedCode.split("\n")
    const targetLines = Math.max(1, Math.ceil(wordCount / 10))
    selectedCode = lines.slice(0, targetLines).join("\n")

    setCode(selectedCode)
    setInput("")
    setTime(0)
    setIsRunning(false)
    setIsComplete(false)
    setMistakes(0)
  }, [language, wordCount])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isRunning && !isComplete) {
      interval = setInterval(() => setTime((t) => t + 1), 100)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, isComplete])

  const calculateStats = () => {
    const correct = input.split("").filter((char, i) => char === code[i]).length
    const finalMistakes = input.length - correct
    const accuracy = input.length > 0 ? Math.round((correct / input.length) * 100) : 0
    const minutes = Math.max(time / 600, 0.01)
    const wpm = Math.round((input.split(/\s+/).length - 1) / minutes)
    return { wpm: Math.max(0, wpm), accuracy, correct, mistakes: finalMistakes }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    if (value.length > code.length) return
    setInput(value)
    if (!isRunning && value.length > 0) setIsRunning(true)
    if (value === code && value.length > 0) {
      setIsRunning(false)
      setIsComplete(true)
    }
  }

  const handleReset = () => {
    const snippets = CODE_SNIPPETS[language] || CODE_SNIPPETS.javascript
    let selectedCode = snippets[Math.floor(Math.random() * snippets.length)]

    const lines = selectedCode.split("\n")
    const targetLines = Math.max(1, Math.ceil(wordCount / 10))
    selectedCode = lines.slice(0, targetLines).join("\n")

    setCode(selectedCode)
    setInput("")
    setTime(0)
    setIsRunning(false)
    setIsComplete(false)
    setMistakes(0)
    inputRef.current?.focus()
  }

  const stats = calculateStats()
  const progress = code.length > 0 ? (input.length / code.length) * 100 : 0

  return (
    <div>
      {/* Instructions Note */}
      <div className="mb-8 p-4 bg-accent/10 border border-accent/30 rounded-lg">
        <p className="text-sm text-foreground/80">
          <span className="font-semibold">Instructions:</span> Type the code snippet correctly to complete the test and
          see your results.
        </p>
      </div>

      {/* Stats Grid */}
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

      {/* Progress Bar */}
      <div className="w-full h-2 bg-muted rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Code Display */}
      <div className="bg-card border border-border rounded-lg p-6 mb-8 min-h-40 font-mono text-sm overflow-auto">
        <pre className="whitespace-pre-wrap">
          {code.split("").map((char, i) => {
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
        </pre>
      </div>

      {/* Input Field */}
      <textarea
        ref={inputRef}
        value={input}
        onChange={handleInput}
        placeholder="Click here and start typing the code..."
        disabled={isComplete}
        className="w-full h-32 px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary mb-8 font-mono text-sm resize-none"
        autoFocus
      />

      {/* Buttons */}
      <div className="flex gap-4">
        <Button size="lg" variant="outline" onClick={handleReset} className="gap-2 bg-transparent flex-1">
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>

      {/* Results */}
      {isComplete && (
        <TypingResultsGraph
          wpm={stats.wpm}
          accuracy={stats.accuracy}
          mistakes={stats.mistakes}
          time={time / 10}
          testType="programming"
          totalCharacters={input.length}
        />
      )}
    </div>
  )
}
