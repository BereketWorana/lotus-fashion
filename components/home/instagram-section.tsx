"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const instagramImages = [
  'https://images.pexels.com/photos/33968170/pexels-photo-33968170.jpeg',
  'https://images.pexels.com/photos/29076955/pexels-photo-29076955.jpeg',
  'https://images.pexels.com/photos/28635266/pexels-photo-28635266.jpeg',
  'https://images.pexels.com/photos/17430755/pexels-photo-17430755.jpeg',
  'https://images.pexels.com/photos/19179683/pexels-photo-19179683.jpeg',
  'https://images.pexels.com/photos/11440539/pexels-photo-11440539.jpeg',
]

export function InstagramSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="container mx-auto px-6 lg:px-12 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <a 
            href="https://instagram.com/we_are_lotus"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-[#7a6e5c] hover:text-[#c8973a] transition-colors"
          >
            <Instagram className="w-5 h-5" />
            <span className="text-sm tracking-wider">@we_are_lotus</span>
          </a>
        </motion.div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
        {instagramImages.map((image, index) => (
          <motion.a
            key={index}
            href="https://instagram.com/we_are_lotus"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative aspect-square overflow-hidden group"
          >
            <Image
              src={image}
              alt={`Instagram post ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 33vw, 16vw"
            />
            {/* Gold Hover Overlay */}
            <div className="absolute inset-0 bg-[#c8973a]/0 group-hover:bg-[#c8973a]/40 transition-colors duration-300 flex items-center justify-center">
              <motion.span 
                initial={{ opacity: 0, scale: 0.5 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="text-[#f0e8d5] text-2xl opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✦
              </motion.span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
