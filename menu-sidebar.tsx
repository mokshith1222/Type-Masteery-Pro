"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, BookOpen, Trophy, Code, Mail, Info, FileText, Shield, CheckSquare } from "lucide-react"
import Link from "next/link"

export default function MenuSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showComingSoon, setShowComingSoon] = useState(false)

  const menuItems = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Start Typing", icon: Code, href: "/typing" },
    { label: "Tasks", icon: CheckSquare, href: "/typing?mode=tasks" },
    { label: "Leaderboards", icon: Trophy, href: "/leaderboards" },
    { label: "Resources", icon: BookOpen, href: "/blog" },
    { label: "About", icon: Info, href: "/about" },
    { label: "Contact", icon: Mail, href: "/contact" },
    { label: "Privacy", icon: Shield, href: "/privacy" },
    { label: "Terms", icon: FileText, href: "/terms" },
  ]

  const futureFeatures = [
    { label: "Challenge a Friend", icon: Trophy },
    { label: "Play Typing Online", icon: Code },
  ]

  return (
    <>
      {/* Menu Button - Top Left */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 p-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle menu"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
              <Menu className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 h-screen w-64 bg-card border-r border-border z-40 overflow-y-auto"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Type Mastery</h2>
              <p className="text-sm text-foreground/60 mt-1">Master your typing skills</p>
            </div>

            {/* Menu Items */}
            <nav className="p-4 space-y-2">
              {menuItems.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/70 hover:text-foreground hover:bg-muted transition-all duration-200"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            {/* Future Updates Section */}
            <div className="px-4 py-6 border-t border-border space-y-2">
              {futureFeatures.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: menuItems.length * 0.05 + i * 0.05 }}
                  >
                    <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-muted text-foreground/50 cursor-not-allowed">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium text-sm">{item.label}</span>
                      </div>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">Coming Soon</span>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Footer Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-muted/50">
              <p className="text-xs text-foreground/60 text-center">
                Email us at{" "}
                <a href="mailto:mokshithnaik932@gmail.com" className="text-primary hover:underline">
                  mokshithnaik932@gmail.com
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
