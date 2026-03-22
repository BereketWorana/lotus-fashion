"use client"

import { motion } from 'framer-motion'

const marqueeItems = [
  'Bloom Into Your Best Self',
  'Ethiopian Luxury Fashion',
  'Rise · Bloom · Become',
  'Handcrafted in Addis Ababa',
  'ሎተስ · Born to Bloom',
  'Ethical & Sustainable',
  '200+ Master Artisans',
]

export function MarqueeSection() {
  return (
    <section className="relative py-6 border-y border-[#c8973a]/10 bg-[#0a0908] overflow-hidden">
      <div className="flex animate-marquee">
        {/* First set */}
        {marqueeItems.map((item, index) => (
          <div key={`first-${index}`} className="flex items-center flex-shrink-0">
            <span className="px-8 text-sm md:text-base font-serif text-[#f0e8d5]/80 whitespace-nowrap tracking-wide">
              {item}
            </span>
            <motion.span 
              className="text-[#c8973a] text-xs"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              ✦
            </motion.span>
          </div>
        ))}
        {/* Duplicate for seamless loop */}
        {marqueeItems.map((item, index) => (
          <div key={`second-${index}`} className="flex items-center flex-shrink-0">
            <span className="px-8 text-sm md:text-base font-serif text-[#f0e8d5]/80 whitespace-nowrap tracking-wide">
              {item}
            </span>
            <motion.span 
              className="text-[#c8973a] text-xs"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              ✦
            </motion.span>
          </div>
        ))}
      </div>
    </section>
  )
}
