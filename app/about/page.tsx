"use client"

import { motion } from "framer-motion"

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1 variants={itemVariants} className="text-4xl font-bold text-foreground mb-6">
            About Type Mastery Pro
          </motion.h1>

          <motion.section variants={itemVariants} className="space-y-4 mb-8">
            <h2 className="text-2xl font-semibold text-primary">Our Mission</h2>
            <p className="text-foreground/70">
              We're committed to helping people master typing through engaging practice, real-time analytics, and
              competitive gameplay. Whether you're a beginner or an advanced typist, our platform has something for
              everyone.
            </p>
          </motion.section>

          <motion.section variants={itemVariants} className="space-y-4 mb-8">
            <h2 className="text-2xl font-semibold text-primary">Why Type Mastery Pro?</h2>
            <ul className="list-disc list-inside space-y-2 text-foreground/70">
              <li>8 different typing modes for varied practice</li>
              <li>Real-time WPM and accuracy tracking</li>
              <li>Completely free - no hidden charges</li>
              <li>Beautiful, modern interface</li>
              <li>Competitive leaderboards</li>
              <li>Optional data persistence with login</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants} className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">Built with Love</h2>
            <p className="text-foreground/70">
              Type Mastery Pro is built using the latest web technologies to provide the best typing practice experience
              possible.
            </p>
          </motion.section>
        </motion.div>
      </div>
    </div>
  )
}
