"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import type { Product } from '@/lib/products'
import { useCart } from '@/lib/cart-context'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart, formatPrice } = useCart()

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Add with default size M
    addToCart(product, 'M')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/product/${product.id}`} className="block group">
        <div
          className="product-card relative bg-[#131110] border border-[#c8973a]/10 overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover image-scale"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            
            {/* Gold Shimmer Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-[#c8973a]/20 via-transparent to-transparent"
            />

            {/* Tag Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 text-xs tracking-wider ${
                product.tag === 'Sale' 
                  ? 'bg-[#c8973a] text-[#080706]' 
                  : product.tag === 'New'
                  ? 'bg-[#f0e8d5] text-[#080706]'
                  : 'bg-[#080706]/80 text-[#f0e8d5] border border-[#c8973a]/30'
              }`}>
                {product.tag}
              </span>
            </div>

            {/* Quick Add Button */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleQuickAdd}
              className="absolute bottom-4 left-4 right-4 py-3 bg-[#c8973a] text-[#080706] text-sm font-medium tracking-wider flex items-center justify-center gap-2 hover:bg-[#e2b45a] transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              QUICK ADD
            </motion.button>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <p className="text-[10px] text-[#7a6e5c] tracking-wider uppercase mb-1">
              {product.origin}
            </p>
            <h3 className="font-serif text-lg text-[#f0e8d5] mb-2 group-hover:text-[#c8973a] transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center gap-3">
              <span className="font-serif text-[#c8973a]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#7a6e5c] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
