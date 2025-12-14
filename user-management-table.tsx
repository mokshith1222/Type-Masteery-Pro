"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Ban, MoreVertical } from "lucide-react"
import type { UserManagement } from "@/types/admin"

interface UserManagementTableProps {
  users: UserManagement[]
}

export default function UserManagementTable({ users }: UserManagementTableProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary/10 text-primary"
      case "inactive":
        return "bg-muted text-foreground/60"
      case "banned":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted"
    }
  }

  return (
    <Card className="bg-card border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">User</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Joined</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Last Active</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Tests</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Best WPM</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-sm text-foreground/60">{user.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-foreground/70">{formatDate(user.joinDate)}</td>
                <td className="px-6 py-4 text-sm text-foreground/70">{formatDate(user.lastActive)}</td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">{user.testsCompleted}</td>
                <td className="px-6 py-4 text-sm font-medium text-primary">{user.bestWPM} WPM</td>
                <td className="px-6 py-4">
                  <Badge className={getStatusColor(user.status)} variant="secondary">
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Ban className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
