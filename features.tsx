"use client"

import { BarChart3, Users, Trophy, BookOpen, Zap, Target } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: BookOpen,
    title: "AI-Powered Lessons",
    description: "Personalized typing lessons that adapt to your skill level and learning pace.",
    color: "text-primary",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Track WPM, accuracy, and progress with detailed visualizations and insights.",
    color: "text-accent",
  },
  {
    icon: Users,
    title: "Multiplayer Races",
    description: "Compete with friends and players worldwide in real-time typing races.",
    color: "text-secondary",
  },
  {
    icon: Trophy,
    title: "Leaderboards & Badges",
    description: "Earn badges and climb global leaderboards to prove your typing mastery.",
    color: "text-primary",
  },
  {
    icon: Target,
    title: "Guided Progression",
    description: "Follow structured paths from beginner to advanced typing techniques.",
    color: "text-accent",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "Get immediate feedback on speed, accuracy, and areas for improvement.",
    color: "text-secondary",
  },
]

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Everything You Need to Master Typing
          </motion.h2>
          <motion.p
            className="text-lg text-foreground/60 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Comprehensive tools and features designed to help you type faster, more accurately, and compete with
            confidence.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                }}
                className="group bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300"
              >
                <motion.div
                  className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors`}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
