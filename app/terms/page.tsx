"use client"

import { motion } from "framer-motion"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>

          <div className="prose prose-invert space-y-6 text-foreground/70">
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-3">Agreement to Terms</h2>
              <p>
                By accessing and using Type Mastery Pro, you accept and agree to be bound by the terms and provision of
                this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-3">Use License</h2>
              <p>
                Permission is granted to download one copy of the materials (information or software) on Type Mastery
                Pro for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer
                of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on the site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-3">Disclaimer</h2>
              <p>
                The materials on Type Mastery Pro are provided on an 'as is' basis. Type Mastery Pro makes no
                warranties, expressed or implied, and hereby disclaims and negates all other warranties including,
                without limitation, implied warranties or conditions of merchantability, fitness for a particular
                purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
