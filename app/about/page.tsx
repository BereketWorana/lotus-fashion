"use client"

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation, useParallax } from '@/hooks/use-scroll-animation'

const team = [
  {
    name: 'Bereket Worana',
    role: 'Founder & Creative Director',
    image: 'https://images.pexels.com/photos/17430755/pexels-photo-17430755.jpeg',
    bio: 'Visionary behind LOTUS, combining Ethiopian heritage with modern luxury.'
  },
  {
    name: 'Selam Tadesse',
    role: 'Head of Design',
    image: 'https://images.pexels.com/photos/29076955/pexels-photo-29076955.jpeg',
    bio: 'Award-winning designer bridging traditional techniques with contemporary fashion.'
  },
  {
    name: 'Dawit Alemu',
    role: 'Master Artisan',
    image: 'https://images.pexels.com/photos/19179683/pexels-photo-19179683.jpeg',
    bio: 'Third-generation weaver preserving the ancient art of Ethiopian textiles.'
  }
]

const timeline = [
  { year: '2016', title: 'The Seed', description: 'LOTUS was founded in a small workshop in Addis Ababa with just 3 artisans.' },
  { year: '2017', title: 'First Collection', description: 'Launched our debut "Heritage" collection, honoring traditional Habesha craftsmanship.' },
  { year: '2019', title: 'Global Recognition', description: 'Featured in Vogue Africa and expanded to 15 international markets.' },
  { year: '2021', title: 'Artisan Network', description: 'Built partnerships with 200+ artisan families across Ethiopia.' },
  { year: '2023', title: 'Sustainability Pledge', description: 'Achieved carbon-neutral operations and launched ethical sourcing program.' },
  { year: '2024', title: 'The Future', description: 'Opening flagship stores in London and Dubai while staying true to our roots.' },
]

export default function AboutPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.2)
  const { ref: storyRef, isVisible: storyVisible } = useScrollAnimation(0.2)
  const { ref: story2Ref, isVisible: story2Visible } = useScrollAnimation(0.2)
  const { ref: quoteRef, isVisible: quoteVisible } = useScrollAnimation(0.3)
  const { ref: teamRef, isVisible: teamVisible } = useScrollAnimation(0.1)
  const { ref: parallaxRef, offset } = useParallax(0.3)
  
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  })
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])

  return (
    <main>
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          ref={parallaxRef}
          className="absolute inset-0"
          style={{ transform: `translateY(${offset * 0.5}px)` }}
        >
          <Image
            src="https://images.pexels.com/photos/11440539/pexels-photo-11440539.jpeg"
            alt="Ethiopian artisans at work"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#080706]/70" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={heroVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <span className="text-[10px] text-[#c8973a] tracking-[0.3em] uppercase mb-4 block">
            Our Story
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#f0e8d5] mb-6">
            From Addis Ababa <br />
            <span className="text-[#c8973a] italic">To The World</span>
          </h1>
          <p className="text-[#7a6e5c] text-lg md:text-xl max-w-2xl mx-auto">
            We are LOTUS. Born in Ethiopia, made for the world. Every stitch tells a story of heritage, hope, and becoming.
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={heroVisible ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
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

      {/* Story Block 1 */}
      <section ref={storyRef} className="py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={storyVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] overflow-hidden"
            >
              <Image
                src="https://images.pexels.com/photos/28635266/pexels-photo-28635266.jpeg"
                alt="Ethiopian textile craftsmanship"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#c8973a]/20 -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={storyVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-[10px] text-[#c8973a] tracking-[0.3em] uppercase mb-4 block">
                The Beginning
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#f0e8d5] mb-6 leading-tight">
                Born From <br /><span className="text-[#c8973a] italic">Ethiopian Soil</span>
              </h2>
              <div className="w-16 h-px bg-[#c8973a]/50 mb-6" />
              <p className="text-[#7a6e5c] text-lg leading-relaxed mb-6">
                LOTUS began in 2016 with a simple mission: to share the extraordinary beauty of Ethiopian craftsmanship with the world. Founded by Bereket Worana in a small Addis Ababa workshop, we started with just three artisans and a dream.
              </p>
              <p className="text-[#7a6e5c] leading-relaxed">
                Today, we work with over 200 artisan families across Ethiopia, from the highlands of Gondar to the ancient city of Lalibela. Each piece carries centuries of tradition, reimagined for the modern world.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Block 2 - Reversed */}
      <section ref={story2Ref} className="py-24 md:py-32 bg-[#0a0908] overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={story2Visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-2 lg:order-1"
            >
              <span className="text-[10px] text-[#c8973a] tracking-[0.3em] uppercase mb-4 block">
                Our Philosophy
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#f0e8d5] mb-6 leading-tight">
                Ethical At <br /><span className="text-[#c8973a] italic">Every Stitch</span>
              </h2>
              <div className="w-16 h-px bg-[#c8973a]/50 mb-6" />
              <p className="text-[#7a6e5c] text-lg leading-relaxed mb-6">
                We believe luxury should lift everyone it touches. That's why we pay fair wages, use sustainable materials, and invest in our artisan communities. When you wear LOTUS, you wear a promise.
              </p>
              <p className="text-[#7a6e5c] leading-relaxed">
                From sourcing organic cotton in Jimma to preserving ancient weaving techniques, every decision is made with people and planet in mind. This is fashion that feels as good as it looks.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={story2Visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] overflow-hidden order-1 lg:order-2"
            >
              <Image
                src="https://images.pexels.com/photos/3298594/pexels-photo-3298594.jpeg"
                alt="Sustainable Ethiopian fashion"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute -bottom-4 -left-4 w-full h-full border border-[#c8973a]/20 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pull Quote */}
      <section ref={quoteRef} className="py-24 md:py-32 border-y border-[#c8973a]/10">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            animate={quoteVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-[#c8973a] text-4xl mb-8 block">"</span>
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#f0e8d5] italic leading-tight mb-8">
              You do not need to explain where you came from. You only need to show the world where you are going.
            </p>
            <footer className="text-[#7a6e5c]">
              — Bereket Worana, Founder
            </footer>
          </motion.blockquote>
        </div>
      </section>

      {/* Horizontal Timeline */}
      <section ref={timelineRef} className="py-24 md:py-32 overflow-hidden bg-[#0a0908]">
        <div className="container mx-auto px-6 lg:px-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] text-[#c8973a] tracking-[0.3em] uppercase mb-4 block">
              Our Journey
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#f0e8d5]">
              The LOTUS Timeline
            </h2>
          </motion.div>
        </div>

        <motion.div 
          style={{ x }}
          className="flex gap-8 pl-6 lg:pl-12"
        >
          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex-shrink-0 w-80 md:w-96 p-8 bg-[#131110] border border-[#c8973a]/20"
            >
              <span className="font-serif text-5xl text-[#c8973a] mb-4 block">{item.year}</span>
              <h3 className="font-serif text-2xl text-[#f0e8d5] mb-3">{item.title}</h3>
              <p className="text-[#7a6e5c] leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[10px] text-[#c8973a] tracking-[0.3em] uppercase mb-4 block">
              The People
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#f0e8d5]">
              Meet Our Team
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={teamVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-transparent to-transparent opacity-60" />
                </div>
                <h3 className="font-serif text-2xl text-[#f0e8d5] mb-1 group-hover:text-[#c8973a] transition-colors">
                  {member.name}
                </h3>
                <p className="text-[#c8973a] text-sm tracking-wider uppercase mb-3">
                  {member.role}
                </p>
                <p className="text-[#7a6e5c] text-sm leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
