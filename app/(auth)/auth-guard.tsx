"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: authData } = await supabase.auth.getUser()
      if (!authData.user) {
        router.push("/auth/login")
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [supabase, router])

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  return <>{children}</>
}
