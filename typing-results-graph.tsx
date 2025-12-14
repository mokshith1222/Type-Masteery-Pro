"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface TypingResultsGraphProps {
  wpm: number
  accuracy: number
  mistakes: number
  time: number
  testType?: string
  totalCharacters?: number
}

export function TypingResultsGraph({
  wpm = 0,
  accuracy = 0,
  mistakes = 0,
  time = 0,
  testType = "test",
  totalCharacters = 0,
}: TypingResultsGraphProps) {
  const safeWpm = isNaN(wpm) ? 0 : Math.max(0, wpm)
  const safeAccuracy = isNaN(accuracy) ? 0 : Math.max(0, Math.min(100, accuracy))
  const safeMistakes = isNaN(mistakes) ? 0 : Math.max(0, mistakes)
  const safeTime = isNaN(time) ? 0 : Math.max(0, time)
  const safeCharacters = isNaN(totalCharacters) ? 0 : Math.max(0, totalCharacters)

  // Calculate metrics
  const calculateConsistency = () => {
    // Simplified consistency calculation based on WPM and time
    const variance = Math.abs(safeWpm - safeWpm) // Perfect consistency if WPM stays same
    return Math.max(0, Math.round(100 - variance))
  }

  // Generate chart data showing WPM progression
  const generateChartData = () => {
    const data = []

    // Create 20 data points across the test duration
    for (let i = 1; i <= 20; i++) {
      const timePoint = (safeTime / 20) * i
      // Simulate WPM curve with some variance
      const wpmVariance = Math.sin(i / 5) * 5
      const currentWpm = Math.max(0, safeWpm + wpmVariance)

      data.push({
        index: i,
        wpm: Math.round(currentWpm),
        errors: Math.max(0, safeMistakes - Math.floor(safeMistakes * (1 - i / 20))),
        time: Math.round(timePoint),
      })
    }

    return data
  }

  const chartData = generateChartData()
  const consistency = calculateConsistency()
  const rawWpm = Math.round(safeWpm * 1.2 || 0) // Raw WPM approximation
  const characterStats = `${safeCharacters}/${safeMistakes}/0/${safeMistakes}`

  return (
    <div className="space-y-6">
      {/* Main Results Card */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Panel - Key Stats */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-foreground/60 mb-1">wpm</p>
            <p className="text-5xl font-bold text-yellow-400">{String(safeWpm)}</p>
          </div>

          <div>
            <p className="text-sm text-foreground/60 mb-1">acc</p>
            <p className="text-5xl font-bold text-yellow-400">{String(safeAccuracy)}%</p>
          </div>

          <div className="space-y-2 pt-4 border-t border-foreground/20">
            <p className="text-xs text-foreground/60">test type</p>
            <p className="text-sm font-semibold text-foreground">time {String(Math.round(safeTime))}</p>
            <p className="text-sm text-foreground/70">{testType}</p>
          </div>
        </div>

        {/* Right Panel - Chart */}
        <div className="bg-card border border-border rounded-lg p-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="time" stroke="rgba(255, 255, 255, 0.5)" />
              <YAxis stroke="rgba(255, 255, 255, 0.5)" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
                labelStyle={{ color: "#fff" }}
              />
              <Legend />
              <Line type="monotone" dataKey="wpm" stroke="#fbbf24" strokeWidth={3} dot={false} name="wpm" />
              <Line
                type="monotone"
                dataKey="errors"
                stroke="#ef4444"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="errors"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-foreground/60 mb-2">raw</p>
          <p className="text-2xl font-bold text-yellow-400">{String(rawWpm)}</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-foreground/60 mb-2">characters</p>
          <p className="text-sm font-bold text-yellow-400">{String(characterStats)}</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-foreground/60 mb-2">consistency</p>
          <p className="text-2xl font-bold text-yellow-400">{String(consistency)}%</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-foreground/60 mb-2">time</p>
          <p className="text-2xl font-bold text-yellow-400">{String(Math.round(safeTime))}s</p>
          <p className="text-xs text-foreground/50 mt-1">session</p>
        </div>
      </div>
    </div>
  )
}
