"use client"

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export function CartDrawer() {
  const { 
    items, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity, 
    getTotal, 
    formatPrice 
  } = useCart()
  const [showComingSoon, setShowComingSoon] = useState(false)

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#080706]/80 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#0a0908] border-l border-[#c8973a]/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#c8973a]/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#c8973a]" />
                <h2 className="font-serif text-xl text-[#f0e8d5]">Your Cart</h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-[#7a6e5c] hover:text-[#f0e8d5] transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <div className="text-6xl mb-6">🪷</div>
                  <h3 className="font-serif text-xl text-[#f0e8d5] mb-2">Your cart is empty</h3>
                  <p className="text-[#7a6e5c] text-sm mb-6">
                    Begin your journey to becoming your best self
                  </p>
                  <button
                    onClick={closeCart}
                    className="px-8 py-3 bg-[#c8973a] text-[#080706] font-medium text-sm tracking-wider hover:bg-[#e2b45a] transition-colors"
                  >
                    EXPLORE COLLECTION
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        key={`${item.product.id}-${item.size}`}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex gap-4 p-4 bg-[#131110] border border-[#c8973a]/10"
                      >
                        {/* Product Image */}
                        <div className="relative w-20 h-24 flex-shrink-0 overflow-hidden">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="font-serif text-sm text-[#f0e8d5] truncate">
                              {item.product.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.product.id, item.size)}
                              className="p-1 text-[#7a6e5c] hover:text-[#f0e8d5] transition-colors flex-shrink-0"
                              aria-label="Remove item"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <p className="text-xs text-[#7a6e5c] mt-1">Size: {item.size}</p>
                          
                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                                className="p-1 border border-[#c8973a]/20 text-[#7a6e5c] hover:text-[#c8973a] hover:border-[#c8973a]/50 transition-all"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-sm text-[#f0e8d5]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                                className="p-1 border border-[#c8973a]/20 text-[#7a6e5c] hover:text-[#c8973a] hover:border-[#c8973a]/50 transition-all"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Price */}
                            <p className="font-serif text-[#c8973a]">
                              {formatPrice(item.product.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#c8973a]/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#7a6e5c] text-sm">Subtotal</span>
                  <span className="font-serif text-2xl text-[#c8973a]">
                    {formatPrice(getTotal())}
                  </span>
                </div>
                <p className="text-xs text-[#7a6e5c]">
                  Shipping and taxes calculated at checkout
                </p>
                <AnimatePresence mode="wait">
                  {showComingSoon ? (
                    <motion.div
                      key="coming-soon"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="w-full py-4 border border-[#c8973a]/50 text-center"
                    >
                      <p className="text-[#c8973a] font-serif text-sm">Checkout coming soon!</p>
                      <p className="text-[#7a6e5c] text-xs mt-1">We're working on payments 🛍️</p>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="order-btn"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowComingSoon(true)}
                      className="w-full py-4 bg-[#c8973a] text-[#080706] font-medium text-sm tracking-wider hover:bg-[#e2b45a] transition-colors"
                    >
                      COMPLETE ORDER
                    </motion.button>
                  )}
                </AnimatePresence>
                <button
                  onClick={closeCart}
                  className="w-full py-3 border border-[#c8973a]/30 text-[#f0e8d5] text-sm tracking-wider hover:border-[#c8973a] transition-colors"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}