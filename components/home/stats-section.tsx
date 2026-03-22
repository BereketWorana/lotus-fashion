"use client"

import { motion } from 'framer-motion'
import { useCountUp, useScrollAnimation } from '@/hooks/use-scroll-animation'

const stats = [
  { number: 200, suffix: '+', label: 'Artisans' },
  { number: 12, suffix: '', label: 'Collections' },
  { number: 40, suffix: '+', label: 'Countries' },
  { number: 8, suffix: '', label: 'Years' },
]

function StatItem({ number, suffix, label }: { number: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(number, 2000)

  return (
    <div ref={ref} className="text-center">
      <p className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#c8973a] mb-2 count-up">
        {count}{suffix}
      </p>
      <p className="text-sm text-[#7a6e5c] tracking-wider uppercase">{label}</p>
    </div>
  )
}

export function StatsSection() {
  const { ref, isVisible } = useScrollAnimation(0.3)

  return (
    <section ref={ref} className="py-20 md:py-28 border-y border-[#c8973a]/10">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <StatItem {...stat} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
