"use client"

import { useState } from "react"
import AdminHeader from "@/components/admin-header"
import AdminStatCard from "@/components/admin-stat-card"
import UserManagementTable from "@/components/user-management-table"
import SystemHealth from "@/components/system-health"
import WeeklyChart from "@/components/weekly-chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Activity, Zap, TrendingUp, Clock } from "lucide-react"
import type { AdminStats, UserManagement, SystemHealth as SystemHealthType } from "@/types/admin"

// Mock data
const mockStats: AdminStats = {
  totalUsers: 5284,
  activeUsers: 1842,
  totalTests: 48392,
  averageWPM: 87,
  totalPracticeHours: 12584,
  newUsersThisWeek: 342,
  peakHourActivity: 1205,
  platformAccuracy: 97.2,
}

const mockUsers: UserManagement[] = [
  {
    id: "1",
    email: "alex@example.com",
    name: "Alex Johnson",
    joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
    testsCompleted: 156,
    bestWPM: 178,
    status: "active",
  },
  {
    id: "2",
    email: "sarah@example.com",
    name: "Sarah Chen",
    joinDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
    testsCompleted: 342,
    bestWPM: 205,
    status: "active",
  },
  {
    id: "3",
    email: "mike@example.com",
    name: "Mike Taylor",
    joinDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    testsCompleted: 89,
    bestWPM: 142,
    status: "inactive",
  },
  {
    id: "4",
    email: "emma@example.com",
    name: "Emma Wilson",
    joinDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    lastActive: new Date(Date.now() - 120 * 60 * 60 * 1000),
    testsCompleted: 203,
    bestWPM: 165,
    status: "active",
  },
  {
    id: "5",
    email: "banned@example.com",
    name: "Banned User",
    joinDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
    lastActive: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    testsCompleted: 12,
    bestWPM: 98,
    status: "banned",
  },
]

const mockSystemHealth: SystemHealthType = {
  apiResponseTime: 145,
  errorRate: 0.23,
  databaseQueriesPerSecond: 2847,
  activeConnections: 485,
  cacheHitRate: 92.4,
  uptime: 99.97,
}

const mockWeeklyData = [
  { day: "Mon", wpm: 1240, accuracy: 96, tests: 342 },
  { day: "Tue", wpm: 1385, accuracy: 97, tests: 421 },
  { day: "Wed", wpm: 1520, accuracy: 97, tests: 512 },
  { day: "Thu", wpm: 1645, accuracy: 98, tests: 634 },
  { day: "Fri", wpm: 1820, accuracy: 97, tests: 728 },
  { day: "Sat", wpm: 1950, accuracy: 98, tests: 856 },
  { day: "Sun", wpm: 1680, accuracy: 97, tests: 612 },
]

export default function AdminPage() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader adminName="Admin User" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <AdminStatCard
            label="Total Users"
            value={mockStats.totalUsers.toLocaleString()}
            change={8}
            icon={<Users className="text-primary" />}
          />
          <AdminStatCard
            label="Active Users"
            value={mockStats.activeUsers.toLocaleString()}
            change={12}
            icon={<Activity className="text-accent" />}
            color="accent"
          />
          <AdminStatCard
            label="Total Tests"
            value={mockStats.totalTests.toLocaleString()}
            change={15}
            icon={<Zap className="text-secondary" />}
            color="secondary"
          />
          <AdminStatCard
            label="Avg Platform WPM"
            value={mockStats.averageWPM}
            change={5}
            icon={<TrendingUp className="text-primary" />}
          />
        </div>

        {/* Additional Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <AdminStatCard
            label="New Users This Week"
            value={mockStats.newUsersThisWeek}
            change={18}
            icon={<Users className="text-accent" />}
            color="accent"
          />
          <AdminStatCard
            label="Total Practice Hours"
            value={mockStats.totalPracticeHours.toLocaleString()}
            change={22}
            icon={<Clock className="text-secondary" />}
            color="secondary"
          />
          <AdminStatCard
            label="Platform Accuracy"
            value={`${mockStats.platformAccuracy}%`}
            change={2}
            icon={<TrendingUp className="text-primary" />}
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="health">System Health</TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <WeeklyChart data={mockWeeklyData} type="bar" />

            {/* Activity Insights */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Peak Activity Hours</h3>
                <p className="text-4xl font-bold text-primary mb-2">{mockStats.peakHourActivity}</p>
                <p className="text-sm text-foreground/60">concurrent users at peak</p>
                <div className="mt-6 space-y-3">
                  {["9:00 PM", "8:00 PM", "10:00 PM", "7:00 PM"].map((time, i) => (
                    <div key={time} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-foreground">{time}</span>
                      <div className="flex-1 h-2 bg-border rounded-full">
                        <div className="bg-primary h-full rounded-full" style={{ width: `${100 - i * 15}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Engagement Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-foreground/60">Daily Active Users</span>
                      <span className="text-sm font-semibold text-foreground">34.8%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "34.8%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-foreground/60">Lesson Completion Rate</span>
                      <span className="text-sm font-semibold text-foreground">72.4%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: "72.4%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-foreground/60">Race Participation</span>
                      <span className="text-sm font-semibold text-foreground">58.2%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div className="bg-secondary h-2 rounded-full" style={{ width: "58.2%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <UserManagementTable users={mockUsers} />
          </TabsContent>

          {/* System Health Tab */}
          <TabsContent value="health">
            <SystemHealth health={mockSystemHealth} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
