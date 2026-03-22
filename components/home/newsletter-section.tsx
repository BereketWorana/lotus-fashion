"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

export function NewsletterSection() {
  const { ref, isVisible } = useScrollAnimation(0.3)
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section ref={ref} className="py-24 md:py-32 border-t border-[#c8973a]/10">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="text-[10px] text-[#c8973a] tracking-[0.3em] uppercase mb-4 block">
            Stay Connected
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#f0e8d5] mb-4">
            Join the Bloom
          </h2>
          <p className="text-[#7a6e5c] mb-8">
            Subscribe for exclusive early access, styling tips, and stories from our artisans.
          </p>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 border border-[#c8973a]/30 bg-[#131110]"
            >
              <span className="text-4xl mb-4 block">🪷</span>
              <p className="font-serif text-xl text-[#c8973a]">Welcome to the family</p>
              <p className="text-sm text-[#7a6e5c] mt-2">
                You'll hear from us soon with something beautiful.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 bg-[#131110] border border-[#c8973a]/20 text-[#f0e8d5] placeholder:text-[#7a6e5c] focus:border-[#c8973a] focus:outline-none transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-8 py-4 bg-[#c8973a] text-[#080706] font-medium text-sm tracking-wider hover:bg-[#e2b45a] transition-colors whitespace-nowrap"
              >
                SUBSCRIBE
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
