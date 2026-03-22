"use client"

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { products, getProductsByCategory } from '@/lib/products'
import { ProductCard } from '@/components/product-card'

const categories = ['All', 'Women', 'Men', 'Streetwear', 'New In', 'Sale']

function ShopContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'All')
  const [filteredProducts, setFilteredProducts] = useState(products)

  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam)
    }
  }, [categoryParam])

  useEffect(() => {
    setFilteredProducts(getProductsByCategory(activeCategory))
  }, [activeCategory])

  return (
    <main className="pt-32 pb-24">
      {/* Hero Header */}
      <section className="container mx-auto px-6 lg:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-[10px] text-[#c8973a] tracking-[0.3em] uppercase mb-4 block">
            The Collection
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#f0e8d5] mb-6">
            Shop <span className="text-[#c8973a] italic">LOTUS</span>
          </h1>
          <p className="text-[#7a6e5c] text-lg max-w-xl mx-auto">
            Discover Ethiopian luxury. Each piece tells a story of heritage, craftsmanship, and becoming your best self.
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-6 lg:px-12 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 text-sm tracking-wider transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[#c8973a] text-[#080706]'
                  : 'bg-[#131110] text-[#f0e8d5] border border-[#c8973a]/20 hover:border-[#c8973a]/50'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Product Count */}
      <section className="container mx-auto px-6 lg:px-12 mb-8">
        <motion.p
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[#7a6e5c] text-sm"
        >
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </motion.p>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-6 lg:px-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
    </main>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-[#c8973a] font-serif text-xl">Loading...</div>
          </div>
        </div>
      </main>
    }>
      <ShopContent />
    </Suspense>
  )
}
