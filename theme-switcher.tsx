"use client"

import { useTheme } from "@/lib/theme-context"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"

export function ThemeSwitcher() {
  const { theme, toggleTheme, colorTheme, setColorTheme } = useTheme()

  return (
    <motion.div
      className="flex items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Theme Toggle */}
      <motion.button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-card hover:bg-card/80 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? <Moon className="w-5 h-5 text-foreground" /> : <Sun className="w-5 h-5 text-foreground" />}
      </motion.button>

      {/* Color Theme Selector */}
      <div className="flex items-center gap-1 bg-card rounded-lg p-1">
        <motion.button
          onClick={() => setColorTheme("blue")}
          className={`px-3 py-1 rounded-md transition-all ${
            colorTheme === "blue" ? "bg-primary text-primary-foreground" : "text-foreground/60 hover:text-foreground"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-xs font-medium">Blue</span>
          </div>
        </motion.button>

        <motion.button
          onClick={() => setColorTheme("light")}
          className={`px-3 py-1 rounded-md transition-all ${
            colorTheme === "light" ? "bg-primary text-primary-foreground" : "text-foreground/60 hover:text-foreground"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-cyan-400" />
            <span className="text-xs font-medium">Light</span>
          </div>
        </motion.button>
      </div>
    </motion.div>
  )
}
