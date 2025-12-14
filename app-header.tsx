"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Keyboard, LogOut } from "lucide-react"

export default function AppHeader() {
  const [userName, setUserName] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data: authData } = await supabase.auth.getUser()
        if (authData.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("username")
            .eq("id", authData.user.id)
            .single()

          setUserName(profile?.username || authData.user.email?.split("@")[0] || "User")
        }
      } catch (error) {
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <Keyboard className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Type Mastery
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-foreground/70 hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link href="/typing" className="text-foreground/70 hover:text-foreground transition-colors">
              Type
            </Link>
            <Link href="/lessons" className="text-foreground/70 hover:text-foreground transition-colors">
              Lessons
            </Link>
            <Link href="/leaderboards" className="text-foreground/70 hover:text-foreground transition-colors">
              Leaderboards
            </Link>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {!isLoading && userName && <span className="text-foreground/70 hidden md:inline">Welcome, {userName}</span>}
            <Button onClick={handleLogout} variant="ghost" size="sm" className="gap-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
