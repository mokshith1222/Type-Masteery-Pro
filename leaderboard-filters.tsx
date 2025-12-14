"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

interface LeaderboardFiltersProps {
  onFiltersChange: (timeframe: string, category: string) => void
}

export function LeaderboardFilters({ onFiltersChange }: LeaderboardFiltersProps) {
  const [timeframe, setTimeframe] = useState("allTime")
  const [category, setCategory] = useState("speed")

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value)
    onFiltersChange(value, category)
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    onFiltersChange(timeframe, value)
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 mb-8">
      <div>
        <label className="block text-sm font-semibold text-foreground mb-3">Timeframe</label>
        <div className="flex gap-2">
          {["weekly", "monthly", "allTime"].map((tf) => (
            <Button
              key={tf}
              onClick={() => handleTimeframeChange(tf)}
              variant={timeframe === tf ? "default" : "outline"}
              className={timeframe === tf ? "" : ""}
            >
              {tf === "allTime" ? "All Time" : tf.charAt(0).toUpperCase() + tf.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-3">Category</label>
        <div className="flex gap-2">
          {["speed", "accuracy", "consistency"].map((cat) => (
            <Button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              variant={category === cat ? "default" : "outline"}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
