"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

export function SaleBanner() {
  const { ref, isVisible } = useScrollAnimation(0.3)

  return (
    <section ref={ref} className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative bg-[#131110] border border-[#c8973a]/20 p-12 md:p-16 text-center overflow-hidden"
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 shimmer pointer-events-none" />
          
          {/* Content */}
          <div className="relative z-10">
            <span className="text-[10px] text-[#c8973a] tracking-[0.3em] uppercase mb-4 block">
              Limited Time
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#f0e8d5] mb-4">
              Seasonal <span className="text-[#c8973a] italic">Sale</span>
            </h2>
            <p className="text-[#7a6e5c] text-lg mb-8 max-w-xl mx-auto">
              Up to 30% off select heritage pieces. Embrace Ethiopian elegance at exceptional value.
            </p>
            <Link
              href="/shop?category=Sale"
              className="inline-block px-10 py-4 bg-[#c8973a] text-[#080706] font-medium text-sm tracking-wider hover:bg-[#e2b45a] transition-colors"
            >
              SHOP SALE
            </Link>
          </div>

          {/* Decorative Corners */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[#c8973a]/40" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#c8973a]/40" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-[#c8973a]/40" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-[#c8973a]/40" />
        </motion.div>
      </div>
    </section>
  )
}
