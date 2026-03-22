"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useScrollAnimation, useParallax } from '@/hooks/use-scroll-animation'
import { ArrowRight } from 'lucide-react'

export function StorySection() {
  const { ref, isVisible } = useScrollAnimation(0.2)
  const { ref: imageRef, offset } = useParallax(0.2)

  return (
    <section ref={ref} className="py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div ref={imageRef} className="relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] overflow-hidden"
              style={{ transform: `translateY(${offset * 0.3}px)` }}
            >
              <Image
                src="https://images.pexels.com/photos/29076955/pexels-photo-29076955.jpeg"
                alt="Ethiopian artisan crafting fabric"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080706]/40 to-transparent" />
            </motion.div>
            
            {/* Decorative Frame */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 w-full h-full border border-[#c8973a]/20 -z-10 hidden lg:block"
            />
          </div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:pl-8"
          >
            <span className="text-[10px] text-[#c8973a] tracking-[0.3em] uppercase mb-4 block">
              Our Heritage
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#f0e8d5] mb-6 leading-tight">
              Where Tradition <br />
              <span className="text-[#c8973a] italic">Meets Tomorrow</span>
            </h2>
            
            <div className="w-16 h-px bg-[#c8973a]/50 mb-6" />
            
            <p className="text-[#7a6e5c] text-lg leading-relaxed mb-6">
              LOTUS was born from a simple belief: that Ethiopian craftsmanship deserves a place on the world stage. Our artisans carry centuries of knowledge in their hands, weaving stories of heritage into every thread.
            </p>
            <p className="text-[#7a6e5c] leading-relaxed mb-8">
              From the highlands of Gondar to the bustling streets of Addis Ababa, we work directly with over 200 artisan families, ensuring fair wages and preserving ancient techniques for future generations.
            </p>
            
            <Link 
              href="/about"
              className="group inline-flex items-center gap-3 text-[#c8973a] hover:text-[#e2b45a] transition-colors"
            >
              <span className="text-sm tracking-wider uppercase">Read Our Story</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
