"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { products } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import type { Product } from '@/lib/products'

export function NewArrivalsSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)
  const [newArrivals, setNewArrivals] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const allProducts = await products()
        const filtered = allProducts.filter(p => p.tag === 'New').slice(0, 4)
        setNewArrivals(filtered)
      } catch (error) {
        console.error('Error fetching new arrivals:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) {
    return (
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <div className="animate-pulse text-[#7a6e5c]">Loading arrivals...</div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-[10px] text-[#c8973a] tracking-[0.3em] uppercase mb-3 block">
              Fresh Picks
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#f0e8d5]">
              New Arrivals
            </h2>
          </div>
          <Link 
            href="/shop?category=New In"
            className="group flex items-center gap-2 text-sm text-[#7a6e5c] hover:text-[#c8973a] transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product, index) => (
            <ProductCard 
              key={product.$id || product.id} 
              product={product} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
