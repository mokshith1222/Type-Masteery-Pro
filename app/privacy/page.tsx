"use client"

import { motion } from "framer-motion"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>

          <div className="prose prose-invert space-y-6 text-foreground/70">
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-3">Introduction</h2>
              <p>
                Type Mastery Pro ("we", "our", or "us") operates the https://typemasterpro.com website. This page
                informs you of our policies regarding the collection, use, and disclosure of personal data when you use
                our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-3">Information Collection</h2>
              <p>
                We collect information you provide directly, such as when you create an account or contact us. When you
                use our service without logging in, we do not collect personal data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-3">Data Security</h2>
              <p>
                The security of your data is important to us. We use appropriate technical and organizational measures
                to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-3">Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at mokshithnaik932@gmail.com</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
