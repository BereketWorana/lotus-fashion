"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useParallax } from '@/hooks/use-scroll-animation'

// Animated Lotus SVG
function AnimatedLotus() {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="w-16 h-16 md:w-20 md:h-20"
      initial="hidden"
      animate="visible"
    >
      {/* Center petal */}
      <motion.path
        d="M50 20 Q55 40 50 55 Q45 40 50 20"
        fill="none"
        stroke="#c8973a"
        strokeWidth="1"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1, transition: { duration: 1.5, delay: 0.2 } }
        }}
      />
      {/* Left petal */}
      <motion.path
        d="M35 30 Q45 45 50 55 Q40 45 35 30"
        fill="none"
        stroke="#c8973a"
        strokeWidth="1"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1, transition: { duration: 1.5, delay: 0.4 } }
        }}
      />
      {/* Right petal */}
      <motion.path
        d="M65 30 Q55 45 50 55 Q60 45 65 30"
        fill="none"
        stroke="#c8973a"
        strokeWidth="1"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1, transition: { duration: 1.5, delay: 0.6 } }
        }}
      />
      {/* Far left petal */}
      <motion.path
        d="M25 40 Q40 50 50 55 Q35 50 25 40"
        fill="none"
        stroke="#c8973a"
        strokeWidth="1"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1, transition: { duration: 1.5, delay: 0.8 } }
        }}
      />
      {/* Far right petal */}
      <motion.path
        d="M75 40 Q60 50 50 55 Q65 50 75 40"
        fill="none"
        stroke="#c8973a"
        strokeWidth="1"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1, transition: { duration: 1.5, delay: 1 } }
        }}
      />
      {/* Base */}
      <motion.path
        d="M40 60 Q50 70 60 60"
        fill="none"
        stroke="#c8973a"
        strokeWidth="1"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1, transition: { duration: 1, delay: 1.2 } }
        }}
      />
    </motion.svg>
  )
}

const heroWords = ['Bloom', 'Into', 'Your', 'Best', 'Self']

export function HeroSection() {
  const { ref: parallaxRef, offset } = useParallax(0.3)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 lotus-pattern opacity-50" />
      
      <div className="container mx-auto px-6 lg:px-12 py-32 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-screen">
          {/* Left Content */}
          <div className="relative z-10 order-2 lg:order-1">
            {/* Animated Lotus */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-8"
            >
              <AnimatedLotus />
            </motion.div>

            {/* Main Headline - Word by Word Animation */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] mb-6">
              {heroWords.map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 30 }}
                  animate={mounted ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.8 + index * 0.15,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className={`inline-block mr-[0.3em] ${
                    word === 'Bloom' || word === 'Best' ? 'text-[#c8973a]' : 'text-[#f0e8d5]'
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Gold Divider Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={mounted ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="w-24 h-px bg-[#c8973a] origin-left mb-6"
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 2 }}
              className="text-[#7a6e5c] text-lg md:text-xl max-w-md leading-relaxed mb-8"
            >
              From the mud, the lotus blooms — and so will you. Ethiopian luxury fashion, handcrafted in Addis Ababa.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 2.2 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/shop"
                className="group px-8 py-4 bg-[#c8973a] text-[#080706] font-medium text-sm tracking-wider hover:bg-[#e2b45a] transition-all inline-flex items-center gap-3"
              >
                SHOP COLLECTION
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 border border-[#c8973a]/30 text-[#f0e8d5] text-sm tracking-wider hover:border-[#c8973a] hover:bg-[#c8973a]/5 transition-all"
              >
                OUR STORY
              </Link>
            </motion.div>
          </div>

          {/* Right - Hero Image */}
          <div 
            ref={parallaxRef}
            className="relative order-1 lg:order-2 h-[60vh] lg:h-[85vh]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={mounted ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="relative h-full w-full overflow-hidden"
              style={{ transform: `translateY(${offset * 0.5}px)` }}
            >
              <div className="relative h-full w-full ken-burns">
                <Image
                  src="https://images.pexels.com/photos/33968170/pexels-photo-33968170.jpeg"
                  alt="Ethiopian luxury fashion model"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#080706] via-transparent to-transparent opacity-40 lg:opacity-60" />

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 2.5 }}
                className="float absolute bottom-8 right-8 md:bottom-12 md:right-12 bg-[#131110]/90 backdrop-blur-sm border border-[#c8973a]/30 p-4 md:p-6"
              >
                <p className="text-[10px] text-[#7a6e5c] tracking-wider uppercase mb-1">Featured</p>
                <p className="font-serif text-[#f0e8d5] text-sm md:text-base">Habesha Silk Gown</p>
                <p className="text-[#c8973a] font-serif">$340</p>
              </motion.div>
            </motion.div>

            {/* Decorative Border */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={mounted ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1.5 }}
              className="absolute -inset-4 border border-[#c8973a]/20 -z-10 hidden lg:block"
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-[#7a6e5c] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-[#c8973a] to-transparent"
        />
      </motion.div>
    </section>
  )
}
