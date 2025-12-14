"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface AdminStatCardProps {
  label: string
  value: string | number
  change?: number
  icon?: React.ReactNode
  color?: "primary" | "accent" | "secondary" | "destructive"
}

const colorClasses = {
  primary: "text-primary",
  accent: "text-accent",
  secondary: "text-secondary",
  destructive: "text-destructive",
}

export default function AdminStatCard({ label, value, change, icon, color = "primary" }: AdminStatCardProps) {
  return (
    <Card className="bg-card border border-border p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-foreground/60 mb-2">{label}</p>
          <p className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-3">
              {change >= 0 ? (
                <TrendingUp className="w-4 h-4 text-primary" />
              ) : (
                <TrendingDown className="w-4 h-4 text-destructive" />
              )}
              <span className={`text-sm font-medium ${change >= 0 ? "text-primary" : "text-destructive"}`}>
                {Math.abs(change)}% {change >= 0 ? "increase" : "decrease"}
              </span>
            </div>
          )}
        </div>
        {icon && <div className="text-3xl">{icon}</div>}
      </div>
    </Card>
  )
}
