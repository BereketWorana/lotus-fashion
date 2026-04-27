"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const values = [
  {
    image: 'https://i.imgur.com/zxPWzu8.jpeg',
    title: 'Artisan Weaving',
    description: 'Traditional techniques passed down through generations of master artisans.'
  },
  {
    image: 'https://i.imgur.com/doylj1g.png',
    title: 'Tibeb Embroidery',
    description: 'Every piece tells a story of transformation and becoming your best self.'
  },
  {
    image: 'https://i.imgur.com/aAXZ30R.jpeg',
    title: 'Silk Texture',
    description: 'Premium materials sourced ethically for the ultimate luxury feel.'
  }
]

export function BrandValuesSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section ref={ref} className="py-24 md:py-32 border-y border-[#c8973a]/10 bg-[#0a0908]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group text-center p-8 bg-[#131110] border border-[#c8973a]/10 hover:border-[#c8973a]/30 transition-all cursor-default"
            >
              <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden rounded-sm">
                <Image 
                  src={value.image} 
                  alt={value.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
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
