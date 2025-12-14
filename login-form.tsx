"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { AlertCircle, Eye, EyeOff } from "lucide-react"
import { validateLogin } from "@/lib/auth"
import { useAuth } from "@/components/auth-context"

export default function LoginForm() {
  const router = useRouter()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate form
    const validation = validateLogin(formData)
    if (!validation.valid) {
      setErrors(validation.errors)
      setIsLoading(false)
      return
    }

    try {
      await login(formData.email, formData.password)
      router.push("/dashboard")
    } catch (error) {
      setErrors({ submit: "Failed to log in. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-card border border-border p-8 w-full max-w-md">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h2>
        <p className="text-foreground/60">Sign in to your Type Mastery account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full"
            disabled={isLoading}
          />
          {errors.email && <p className="text-sm text-destructive mt-1 flex items-center gap-1">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full pr-10"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-destructive mt-1 flex items-center gap-1">{errors.password}</p>
          )}
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex items-center gap-2 text-destructive text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {errors.submit}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      {/* Demo Credentials */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
        <p className="text-xs font-semibold text-foreground/70 mb-2">Demo Credentials:</p>
        <p className="text-xs text-foreground/60">Email: demo@example.com</p>
        <p className="text-xs text-foreground/60">Password: demo123</p>
      </div>
    </Card>
  )
}
