"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import AppHeader from "@/components/app-header"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: authData, error } = await supabase.auth.getUser()
        if (error || !authData.user) {
          router.push("/auth/login")
          return
        }
        setIsAuthenticated(true)
      } catch (error) {
        router.push("/auth/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [supabase, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground/60 mb-4">Loading...</p>
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <AppHeader />
      {children}
    </>
  )
}
