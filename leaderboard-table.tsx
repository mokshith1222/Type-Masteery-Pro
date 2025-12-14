"use client"

import type { LeaderboardEntry } from "@/types/leaderboard"
import { Trophy } from "lucide-react"
import Link from "next/link"

interface LeaderboardTableProps {
  entries: LeaderboardEntry[]
  category: string
}

export function LeaderboardTable({ entries, category }: LeaderboardTableProps) {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-muted border-b border-border">
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Rank</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Player</th>
            {category === "speed" && (
              <>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Best WPM</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Avg WPM</th>
              </>
            )}
            {category === "accuracy" && (
              <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Accuracy</th>
            )}
            {category === "consistency" && (
              <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Total Tests</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {entries.map((entry) => (
            <tr key={entry.rank} className="hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  {entry.rank <= 3 && <Trophy className="w-5 h-5 text-yellow-500" />}
                  <span className="font-bold text-foreground">{entry.rank}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <Link
                  href={`/profile/${entry.username}`}
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                    {entry.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-foreground">{entry.username}</span>
                </Link>
              </td>
              {category === "speed" && (
                <>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-primary">{entry.bestWPM} WPM</span>
                  </td>
                  <td className="px-6 py-4 text-right text-foreground/70">{entry.averageWPM} WPM</td>
                </>
              )}
              {category === "accuracy" && (
                <td className="px-6 py-4 text-right">
                  <span className="font-bold text-primary">{entry.accuracy}%</span>
                </td>
              )}
              {category === "consistency" && (
                <td className="px-6 py-4 text-right">
                  <span className="font-bold text-primary">{entry.totalTests}</span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
