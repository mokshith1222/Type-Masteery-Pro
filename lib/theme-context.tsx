"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"
type ColorTheme = "blue" | "light"

interface ThemeContextType {
  theme: Theme
  colorTheme: ColorTheme
  toggleTheme: () => void
  setColorTheme: (color: ColorTheme) => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [colorTheme, setColorThemeState] = useState<ColorTheme>("blue")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme | null
      const savedColorTheme = localStorage.getItem("colorTheme") as ColorTheme | null
      setTheme(savedTheme || "light")
      setColorThemeState(savedColorTheme || "blue")
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme)
    }
  }, [theme, mounted])

  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    root.setAttribute("data-color-theme", colorTheme)
    if (typeof window !== "undefined") {
      localStorage.setItem("colorTheme", colorTheme)
    }
  }, [colorTheme, mounted])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  const setColorTheme = (color: ColorTheme) => {
    setColorThemeState(color)
  }

  return (
    <ThemeContext.Provider value={{ theme, colorTheme, toggleTheme, setColorTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
