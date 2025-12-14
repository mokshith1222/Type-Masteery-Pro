"use client"

import { motion } from "framer-motion"

const blogPosts = [
  {
    id: 1,
    title: "Tips to Improve Your Typing Speed",
    date: "Dec 10, 2025",
    excerpt: "Learn the best techniques to increase your WPM and become a typing master.",
  },
  {
    id: 2,
    title: "The Science Behind Touch Typing",
    date: "Dec 8, 2025",
    excerpt: "Understand how your brain develops muscle memory for faster typing.",
  },
  {
    id: 3,
    title: "Competitive Typing: A New Hobby",
    date: "Dec 5, 2025",
    excerpt: "Join the typing community and compete with typists from around the world.",
  },
]

export default function BlogPage() {
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
          <motion.h1 variants={itemVariants} className="text-4xl font-bold text-foreground mb-10">
            Blog
          </motion.h1>

          <div className="space-y-6">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                className="p-6 border border-border rounded-lg hover:bg-card/50 transition-colors"
              >
                <h2 className="text-2xl font-semibold text-primary mb-2">{post.title}</h2>
                <p className="text-sm text-foreground/60 mb-3">{post.date}</p>
                <p className="text-foreground/70">{post.excerpt}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
