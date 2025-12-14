"use client"

import { motion } from "framer-motion"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold text-foreground mb-8">Cookie Policy</h1>

          <div className="prose prose-invert space-y-6 text-foreground/70">
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-3">What are Cookies?</h2>
              <p>
                Cookies are small text files that are stored on your device when you visit a website. They help websites
                remember information about your visit, such as your preferences and settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-3">How We Use Cookies</h2>
              <p>Type Mastery Pro uses cookies to:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Remember your theme preferences (light/dark mode and color theme)</li>
                <li>Store your authentication information (if you choose to log in)</li>
                <li>Analyze website usage and improve our service</li>
                <li>Provide security features to protect your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-3">Your Cookie Choices</h2>
              <p>
                You can control cookies through your browser settings. Most browsers allow you to refuse cookies or
                alert you when cookies are being sent. However, blocking cookies may affect the functionality of our
                website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-3">Contact Us</h2>
              <p>If you have questions about our use of cookies, please contact us at mokshithnaik932@gmail.com</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
