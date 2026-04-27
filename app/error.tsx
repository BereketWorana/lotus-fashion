"use client"

import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-[70vh] flex items-center justify-center pt-32 pb-24">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[#c8973a]/60 text-6xl mb-6">🪷</div>
          <h1 className="font-serif text-4xl md:text-5xl text-[#f0e8d5] mb-4">
            Something went wrong
          </h1>
          <p className="text-[#7a6e5c] max-w-md mx-auto mb-10">
            An unexpected error occurred while loading this page. Our team has been notified.
          </p>
          <button
            onClick={() => reset()}
            className="inline-block px-8 py-4 bg-[#c8973a] text-[#080706] font-medium text-sm tracking-wider hover:bg-[#e2b45a] transition-all"
          >
            TRY AGAIN
          </button>
        </motion.div>
      </div>
    </main>
  )
}
