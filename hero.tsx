"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Zap } from "lucide-react"
import { motion } from "framer-motion"

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
      {/* Background gradient effect */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20"
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-0 right-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl opacity-20"
          animate={{
            y: [0, 20, 0],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text */}
          <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Zap className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="text-sm text-primary font-medium">Master Typing in 30 Days - Completely Free</span>
            </motion.div>

            <motion.h1 className="text-5xl sm:text-6xl font-bold leading-tight text-foreground" variants={itemVariants}>
              Type Faster,
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {" "}
                Master Better
              </span>
            </motion.h1>

            <motion.p className="text-lg text-foreground/70 max-w-xl leading-relaxed" variants={itemVariants}>
              Join thousands of users improving their typing speed with our AI-powered lessons, real-time analytics, and
              competitive racing mode. No login required to get started. Sign up only to save your progress.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4 pt-4" variants={itemVariants}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2" asChild>
                  <Link href="/typing">
                    Start Typing Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="border-border hover:bg-muted bg-transparent" asChild>
                  <Link href="/typing">Watch Demo / Practice</Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div className="flex items-center gap-6 pt-8" variants={itemVariants}>
              {[
                { value: "50K+", label: "Active Typists" },
                { value: "98%", label: "Satisfaction Rate" },
                { value: "3x", label: "Faster Progress" },
              ].map((stat, i) => (
                <motion.div key={i} className={i < 2 ? "space-y-1" : "space-y-1"} whileHover={{ scale: 1.1 }}>
                  {i !== 0 && <div className="w-px h-12 bg-border" />}
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-foreground/60">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column - Visual */}
          <motion.div className="relative hidden lg:block">
            <motion.div
              className="bg-card rounded-xl border border-border p-8 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="space-y-4">
                <motion.div
                  className="h-8 bg-gradient-to-r from-primary to-accent rounded opacity-20"
                  animate={{ scaleX: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-3 bg-muted rounded-full"
                      style={{ width: `${80 - i * 10}%` }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.1 }}
                    />
                  ))}
                </div>
                <div className="pt-6 space-y-3">
                  {[
                    { label: "Current Speed", value: "142 WPM", color: "text-primary" },
                    { label: "Accuracy", value: "99.2%", color: "text-accent" },
                    { label: "Personal Best", value: "178 WPM", color: "text-secondary" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center justify-between"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                    >
                      <span className="text-sm text-foreground/60">{item.label}</span>
                      <span className={`font-bold ${item.color}`}>{item.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating cards */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-card rounded-lg border border-border p-4 shadow-lg w-40"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}>
                <p className="text-xs text-foreground/60 mb-2">Weekly Progress</p>
                <p className="text-2xl font-bold text-primary">+24 WPM</p>
              </motion.div>
            </motion.div>
            <motion.div
              className="absolute -top-6 -right-6 bg-card rounded-lg border border-border p-4 shadow-lg w-40"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}>
                <p className="text-xs text-foreground/60 mb-2">Streak</p>
                <p className="text-2xl font-bold text-accent">12 Days</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
