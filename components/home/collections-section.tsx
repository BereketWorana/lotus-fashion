"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { products } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

export function CollectionsSection() {
  const { ref: menRef, isVisible: menVisible } = useScrollAnimation(0.1)
  const { ref: womenRef, isVisible: womenVisible } = useScrollAnimation(0.1)

  const womenProducts = products.filter(p => p.category === 'Women').slice(0, 4)
  const menProducts = products.filter(p => p.category === 'Men').slice(0, 3)

  return (
    <>
      {/* Women's Collection */}
      <section ref={womenRef} className="py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={womenVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          >
            <div>
              <span className="text-[10px] text-[#c8973a] tracking-[0.3em] uppercase mb-3 block">
                For Her
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#f0e8d5]">
                Women's Collection
              </h2>
            </div>
            <Link 
              href="/shop?category=Women"
              className="group flex items-center gap-2 text-sm text-[#7a6e5c] hover:text-[#c8973a] transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {womenProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Men's Collection */}
      <section ref={menRef} className="py-24 md:py-32 bg-[#0a0908] border-y border-[#c8973a]/10">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={menVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          >
            <div>
              <span className="text-[10px] text-[#c8973a] tracking-[0.3em] uppercase mb-3 block">
                For Him
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#f0e8d5]">
                Men's Collection
              </h2>
            </div>
            <Link 
              href="/shop?category=Men"
              className="group flex items-center gap-2 text-sm text-[#7a6e5c] hover:text-[#c8973a] transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
