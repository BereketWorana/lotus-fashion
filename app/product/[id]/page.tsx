"use client"

import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { Check, Truck, Shield, RotateCcw, Heart } from 'lucide-react'
import { getProductById, products } from '@/lib/products'
import { useCart } from '@/lib/cart-context'
import { ProductCard } from '@/components/product-card'

const perks = [
  { icon: Truck, label: 'Free shipping on orders over $200' },
  { icon: Shield, label: 'Authenticity guaranteed' },
  { icon: RotateCcw, label: '30-day returns' },
]

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const product = getProductById(parseInt(resolvedParams.id))
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isImageZoomed, setIsImageZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { addToCart, formatPrice } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  if (!product) {
    notFound()
  }

  // Get related products (same category, different product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    if (!selectedSize) return
    addToCart(product, selectedSize)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  return (
    <main className="pt-24 pb-24">
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 lg:px-12 py-6">
        <nav className="flex items-center gap-2 text-sm text-[#7a6e5c]">
          <Link href="/" className="hover:text-[#c8973a] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#c8973a] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-[#f0e8d5]">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Sticky Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32 lg:h-fit"
          >
            <div 
              className="relative aspect-[3/4] overflow-hidden bg-[#131110] cursor-zoom-in"
              onMouseEnter={() => setIsImageZoomed(true)}
              onMouseLeave={() => setIsImageZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300"
                style={{
                  transform: isImageZoomed ? 'scale(1.5)' : 'scale(1)',
                  transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                }}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* Tag Badge */}
              <div className="absolute top-6 left-6">
                <span className={`px-4 py-1.5 text-xs tracking-wider ${
                  product.tag === 'Sale' 
                    ? 'bg-[#c8973a] text-[#080706]' 
                    : product.tag === 'New'
                    ? 'bg-[#f0e8d5] text-[#080706]'
                    : 'bg-[#080706]/80 text-[#f0e8d5] border border-[#c8973a]/30'
                }`}>
                  {product.tag}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right - Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="py-4"
          >
            {/* Origin Tag */}
            <span className="text-[10px] text-[#c8973a] tracking-[0.3em] uppercase mb-4 block">
              {product.origin} · {product.category}
            </span>

            {/* Product Name */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#f0e8d5] mb-6 leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4 mb-8">
              <span className="font-serif text-3xl text-[#c8973a]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-[#7a6e5c] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.originalPrice && (
                <span className="px-3 py-1 bg-[#c8973a]/20 text-[#c8973a] text-xs tracking-wider">
                  SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#c8973a]/20 mb-8" />

            {/* Description */}
            <p className="text-[#7a6e5c] leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-[#f0e8d5] tracking-wider">Select Size</span>
                <button className="text-xs text-[#c8973a] hover:underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[50px] px-4 py-3 text-sm tracking-wider transition-all ${
                      selectedSize === size
                        ? 'bg-[#c8973a] text-[#080706] border-[#c8973a]'
                        : 'bg-transparent text-[#f0e8d5] border border-[#c8973a]/30 hover:border-[#c8973a]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`flex-1 py-4 font-medium text-sm tracking-wider transition-all flex items-center justify-center gap-2 ${
                  !selectedSize 
                    ? 'bg-[#c8973a]/50 text-[#080706]/50 cursor-not-allowed'
                    : isAdded
                    ? 'bg-green-600 text-white'
                    : 'bg-[#c8973a] text-[#080706] hover:bg-[#e2b45a]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    ADDED TO CART
                  </>
                ) : (
                  <>
                    {!selectedSize ? 'SELECT A SIZE' : 'ADD TO CART'}
                  </>
                )}
              </motion.button>
              <button className="p-4 border border-[#c8973a]/30 text-[#f0e8d5] hover:border-[#c8973a] hover:text-[#c8973a] transition-all">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Perks */}
            <div className="space-y-4 border-t border-[#c8973a]/10 pt-8">
              {perks.map((perk) => (
                <div key={perk.label} className="flex items-center gap-3 text-[#7a6e5c]">
                  <perk.icon className="w-5 h-5 text-[#c8973a]" />
                  <span className="text-sm">{perk.label}</span>
                </div>
              ))}
            </div>

            {/* Ethiopian Heritage Note */}
            <div className="mt-8 p-6 bg-[#131110] border border-[#c8973a]/20">
              <p className="font-serif text-[#f0e8d5] italic mb-2">
                "From the mud, the lotus blooms."
              </p>
              <p className="text-sm text-[#7a6e5c]">
                Each LOTUS piece is handcrafted by Ethiopian artisans using traditional techniques passed down through generations.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="container mx-auto px-6 lg:px-12 mt-24 pt-16 border-t border-[#c8973a]/10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-[10px] text-[#c8973a] tracking-[0.3em] uppercase mb-3 block">
              You May Also Like
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#f0e8d5]">
              Related Pieces
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct, index) => (
              <ProductCard 
                key={relatedProduct.id} 
                product={relatedProduct} 
                index={index}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
