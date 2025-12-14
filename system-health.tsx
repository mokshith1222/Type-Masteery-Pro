"use client"

import { Card } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import type { SystemHealthType } from "@/types/admin"

interface SystemHealthProps {
  health: SystemHealthType
}

export default function SystemHealth({ health }: SystemHealthProps) {
  const getHealthStatus = (metric: number, threshold: number, higher = true) => {
    if (higher) {
      return metric >= threshold ? "healthy" : "warning"
    } else {
      return metric <= threshold ? "healthy" : "warning"
    }
  }

  const metrics = [
    {
      label: "API Response Time",
      value: `${health.apiResponseTime}ms`,
      status: getHealthStatus(health.apiResponseTime, 200, false),
      threshold: "< 200ms",
    },
    {
      label: "Error Rate",
      value: `${health.errorRate}%`,
      status: getHealthStatus(health.errorRate, 0.5, false),
      threshold: "< 0.5%",
    },
    {
      label: "Database QPS",
      value: `${health.databaseQueriesPerSecond}`,
      status: getHealthStatus(health.databaseQueriesPerSecond, 1000),
      threshold: "> 1000 QPS",
    },
    {
      label: "Active Connections",
      value: health.activeConnections.toLocaleString(),
      status: "healthy",
      threshold: "current",
    },
    {
      label: "Cache Hit Rate",
      value: `${health.cacheHitRate}%`,
      status: getHealthStatus(health.cacheHitRate, 85),
      threshold: "> 85%",
    },
    {
      label: "Uptime",
      value: `${health.uptime}%`,
      status: getHealthStatus(health.uptime, 99.9),
      threshold: "> 99.9%",
    },
  ]

  return (
    <Card className="bg-card border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">System Health</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <p className="text-sm text-foreground/60">{metric.label}</p>
              {metric.status === "healthy" ? (
                <CheckCircle2 className="w-5 h-5 text-primary" />
              ) : (
                <AlertCircle className="w-5 h-5 text-accent" />
              )}
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">{metric.value}</p>
            <p className="text-xs text-foreground/50">{metric.threshold}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
