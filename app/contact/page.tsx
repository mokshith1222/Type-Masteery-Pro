"use client"

import { motion } from "framer-motion"
import { Mail, MessageSquare } from "lucide-react"

export default function ContactPage() {
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
      <div className="max-w-2xl mx-auto px-4">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Get in Touch</h1>
            <p className="text-lg text-foreground/70">Have questions? Contact us directly via email</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Email 1 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-card border border-border rounded-lg cursor-default"
            >
              <div className="flex items-center gap-4 mb-3">
                <Mail className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Primary Contact</h3>
              </div>
              <p className="text-foreground break-all font-medium">mokshithnaik932@gmail.com</p>
            </motion.div>

            {/* Email 2 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-card border border-border rounded-lg cursor-default"
            >
              <div className="flex items-center gap-4 mb-3">
                <MessageSquare className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Secondary Contact</h3>
              </div>
              <p className="text-foreground break-all font-medium">ganesh1235ram@gmail.com</p>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="mt-12 p-6 bg-card border border-border rounded-lg text-center">
            <p className="text-foreground/70">
              Email us at either address above. We'll get back to you as soon as possible!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
