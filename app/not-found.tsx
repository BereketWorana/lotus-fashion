"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center pt-32 pb-24">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[#c8973a] text-6xl mb-6">🪷</div>
          <h1 className="font-serif text-5xl md:text-7xl text-[#f0e8d5] mb-6">
            404
          </h1>
          <h2 className="font-serif text-2xl text-[#c8973a] mb-6 italic">
            Page Not Found
          </h2>
          <p className="text-[#7a6e5c] max-w-md mx-auto mb-10">
            The page you are looking for has blossomed elsewhere or no longer exists in our collection.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 border border-[#c8973a]/30 text-[#f0e8d5] text-sm tracking-wider hover:border-[#c8973a] hover:text-[#c8973a] transition-all"
          >
            RETURN HOME
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
