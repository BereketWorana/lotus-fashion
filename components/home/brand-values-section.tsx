"use client"

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const values = [
  {
    icon: '🌸',
    title: 'Born to Bloom',
    description: 'Every piece tells a story of transformation and becoming your best self.'
  },
  {
    icon: '🧵',
    title: 'Ethiopian Craft',
    description: 'Traditional techniques passed down through generations of master artisans.'
  },
  {
    icon: '🌍',
    title: 'Made in Addis',
    description: 'Proudly designed and handcrafted in the heart of Addis Ababa, Ethiopia.'
  },
  {
    icon: '♻️',
    title: 'Ethical Always',
    description: 'Fair wages, sustainable materials, and respect for people and planet.'
  }
]

export function BrandValuesSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section ref={ref} className="py-24 md:py-32 border-y border-[#c8973a]/10 bg-[#0a0908]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group text-center p-8 bg-[#131110] border border-[#c8973a]/10 hover:border-[#c8973a]/30 transition-all cursor-default"
            >
              <motion.div 
                className="text-4xl mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {value.icon}
              </motion.div>
              <h3 className="font-serif text-xl text-[#f0e8d5] mb-3 group-hover:text-[#c8973a] transition-colors">
                {value.title}
              </h3>
              <p className="text-sm text-[#7a6e5c] leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
