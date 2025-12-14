"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatsCardProps {
  label: string
  value: string | number
  unit?: string
  trend?: number
  icon?: React.ReactNode
  color?: "primary" | "accent" | "secondary" | "destructive"
}

const colorClasses = {
  primary: "text-primary",
  accent: "text-accent",
  secondary: "text-secondary",
  destructive: "text-destructive",
}

export default function StatsCard({ label, value, unit, trend, icon, color = "primary" }: StatsCardProps) {
  return (
    <Card className="bg-card border border-border p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-foreground/60 mb-2">{label}</p>
          <div className="flex items-baseline gap-2">
            <p className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</p>
            {unit && <span className="text-sm text-foreground/50">{unit}</span>}
          </div>
          {trend !== undefined && (
            <div className="flex items-center gap-1 mt-3">
              {trend >= 0 ? (
                <TrendingUp className="w-4 h-4 text-primary" />
              ) : (
                <TrendingDown className="w-4 h-4 text-destructive" />
              )}
              <span className={`text-sm font-medium ${trend >= 0 ? "text-primary" : "text-destructive"}`}>
                {Math.abs(trend)}% {trend >= 0 ? "increase" : "decrease"}
              </span>
            </div>
          )}
        </div>
        {icon && <div className="text-3xl">{icon}</div>}
      </div>
    </Card>
  )
}
