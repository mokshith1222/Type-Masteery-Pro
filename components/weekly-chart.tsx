"use client"

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card } from "@/components/ui/card"
import type { WeeklyProgress } from "@/types/dashboard"

interface WeeklyChartProps {
  data: WeeklyProgress[]
  type?: "line" | "bar"
}

export default function WeeklyChart({ data, type = "line" }: WeeklyChartProps) {
  const chartColor = "hsl(var(--color-primary))"
  const accentColor = "hsl(var(--color-accent))"

  return (
    <Card className="bg-card border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Progress</h3>
      <ResponsiveContainer width="100%" height={300}>
        {type === "line" ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
            <XAxis dataKey="day" stroke="hsl(var(--color-foreground-muted))" />
            <YAxis stroke="hsl(var(--color-foreground-muted))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--color-card))",
                border: "1px solid hsl(var(--color-border))",
                borderRadius: "0.5rem",
              }}
              cursor={{ stroke: chartColor, strokeWidth: 2 }}
            />
            <Legend />
            <Line type="monotone" dataKey="wpm" stroke={chartColor} strokeWidth={2} name="WPM" dot={{ r: 4 }} />
            <Line type="monotone" dataKey="accuracy" stroke={accentColor} strokeWidth={2} name="Accuracy %" />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
            <XAxis dataKey="day" stroke="hsl(var(--color-foreground-muted))" />
            <YAxis stroke="hsl(var(--color-foreground-muted))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--color-card))",
                border: "1px solid hsl(var(--color-border))",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
            <Bar dataKey="wpm" fill={chartColor} name="WPM" radius={[8, 8, 0, 0]} />
            <Bar dataKey="accuracy" fill={accentColor} name="Accuracy %" radius={[8, 8, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </Card>
  )
}
