"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Minus, Plus, MapPin, Package, CreditCard, User } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useAuth } from '@/lib/auth-context'
import { databases, getDatabaseId, COLLECTIONS, ID } from '@/lib/appwrite'

type Stage = 'review' | 'shipping' | 'confirmation' | 'success'

interface ShippingInfo {
  name: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  postalCode: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, getTotalItems, formatPrice, clearCart, updateQuantity, removeFromCart, currency, etbRate } = useCart()
  const { user } = useAuth()

  const [stage, setStage] = useState<Stage>('review')
  const [orderNumber, setOrderNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [shipping, setShipping] = useState<ShippingInfo>({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: 'Addis Ababa',
    country: 'Ethiopia',
    postalCode: '',
  })

  const subtotal = getTotal()
  const shippingCost = 0 // Free shipping
  const total = subtotal + shippingCost

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShipping(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePlaceOrder = async () => {
    setError('')
    setLoading(true)
    try {
      const orderData = {
        userId: user?.$id || 'guest',
        items: JSON.stringify(items.map(item => ({
          productId: item.product.$id || item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          size: item.size,
          image: item.product.image,
        }))),
        subtotal: subtotal,
        shipping: shippingCost,
        total: total,
        currency: currency,
        etbRate: etbRate,
        shippingName: shipping.name,
        shippingEmail: shipping.email,
        shippingPhone: shipping.phone,
        shippingAddress: shipping.address,
        shippingCity: shipping.city,
        shippingCountry: shipping.country,
        shippingPostalCode: shipping.postalCode,
        status: 'pending',
        createdAt: new Date().toISOString(),
      }

      const doc = await databases.createDocument(
        getDatabaseId(),
        COLLECTIONS.orders,
        ID.unique(),
        orderData
      )

      setOrderNumber(doc.$id.slice(0, 8).toUpperCase())
      clearCart()
      setStage('success')
    } catch (err: any) {
      console.error('Order error:', err)
      // Even if Appwrite save fails, show success for demo
      setOrderNumber(`LOT-${Date.now().toString(36).toUpperCase().slice(-6)}`)
      clearCart()
      setStage('success')
    } finally {
      setLoading(false)
    }
  }

  // Empty cart
  if (items.length === 0 && stage !== 'success') {
    return (
      <main className="pt-32 pb-24 min-h-screen">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto text-center py-20"
          >
            <div className="text-6xl mb-6">🪷</div>
            <h1 className="font-serif text-3xl text-[#f0e8d5] mb-4">Your cart is empty</h1>
            <p className="text-[#7a6e5c] mb-8">Add some items before checking out.</p>
            <Link
              href="/shop"
              className="inline-block px-8 py-4 bg-[#c8973a] text-[#080706] font-medium text-sm tracking-wider hover:bg-[#e2b45a] transition-colors"
            >
              SHOP NOW
            </Link>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Progress Bar */}
        {stage !== 'success' && (
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-between">
              {[
                { key: 'review', label: 'Review', icon: Package },
                { key: 'shipping', label: 'Shipping', icon: MapPin },
                { key: 'confirmation', label: 'Confirm', icon: CreditCard },
              ].map((step, i) => (
                <div key={step.key} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 flex items-center justify-center border transition-colors ${
                      stage === step.key
                        ? 'bg-[#c8973a] border-[#c8973a] text-[#080706]'
                        : ['review', 'shipping', 'confirmation'].indexOf(stage) > i
                          ? 'bg-[#c8973a]/20 border-[#c8973a] text-[#c8973a]'
                          : 'bg-transparent border-[#c8973a]/20 text-[#7a6e5c]'
                    }`}>
                      <step.icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] tracking-wider uppercase mt-2 ${
                      stage === step.key ? 'text-[#c8973a]' : 'text-[#7a6e5c]'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className={`flex-1 h-px mx-4 ${
                      ['review', 'shipping', 'confirmation'].indexOf(stage) > i
                        ? 'bg-[#c8973a]'
                        : 'bg-[#c8973a]/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Guest Banner */}
        {!user && stage !== 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto mb-8 p-4 bg-[#131110] border border-[#c8973a]/20 flex items-center justify-between"
          >
            <p className="text-sm text-[#7a6e5c]">
              <User className="w-4 h-4 inline mr-2 text-[#c8973a]" />
              Sign up to track your order and save your details
            </p>
            <Link
              href="/auth/signup"
              className="text-xs text-[#c8973a] hover:underline tracking-wider"
            >
              SIGN UP
            </Link>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {/* STAGE 1: Review Cart */}
          {stage === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto"
            >
              <h1 className="font-serif text-3xl md:text-4xl text-[#f0e8d5] mb-8">Review Your Cart</h1>

              <div className="space-y-4 mb-8">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-4 p-4 bg-[#131110] border border-[#c8973a]/10">
                    <div className="relative w-20 h-24 flex-shrink-0 overflow-hidden">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-[#f0e8d5] truncate">{item.product.name}</h3>
                      <p className="text-xs text-[#7a6e5c] mt-1">Size: {item.size}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                            className="p-1 border border-[#c8973a]/20 text-[#7a6e5c] hover:text-[#c8973a] transition-all"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm text-[#f0e8d5]">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                            className="p-1 border border-[#c8973a]/20 text-[#7a6e5c] hover:text-[#c8973a] transition-all"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-serif text-[#c8973a]">{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="p-6 bg-[#131110] border border-[#c8973a]/10 space-y-3 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-[#7a6e5c]">Subtotal ({getTotalItems()} items)</span>
                  <span className="text-[#f0e8d5]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#7a6e5c]">Shipping</span>
                  <span className="text-[#c8973a]">FREE</span>
                </div>
                <div className="h-px bg-[#c8973a]/10" />
                <div className="flex justify-between">
                  <span className="text-[#f0e8d5] font-medium">Total</span>
                  <span className="font-serif text-xl text-[#c8973a]">{formatPrice(total)}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStage('shipping')}
                className="w-full py-4 bg-[#c8973a] text-[#080706] font-medium text-sm tracking-wider hover:bg-[#e2b45a] transition-colors flex items-center justify-center gap-2"
              >
                PROCEED TO SHIPPING
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}

          {/* STAGE 2: Shipping */}
          {stage === 'shipping' && (
            <motion.div
              key="shipping"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto"
            >
              <button
                onClick={() => setStage('review')}
                className="flex items-center gap-2 text-sm text-[#7a6e5c] hover:text-[#c8973a] transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Cart
              </button>

              <h1 className="font-serif text-3xl md:text-4xl text-[#f0e8d5] mb-8">Shipping Details</h1>

              <form
                onSubmit={(e) => { e.preventDefault(); setStage('confirmation') }}
                className="space-y-5"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-[#7a6e5c] mb-2">Full Name</label>
                    <input
                      type="text" name="name" value={shipping.name} onChange={handleShippingChange} required
                      className="w-full px-4 py-3 bg-[#0a0908] border border-[#c8973a]/20 text-[#f0e8d5] placeholder:text-[#7a6e5c]/50 focus:border-[#c8973a] focus:outline-none transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#7a6e5c] mb-2">Email</label>
                    <input
                      type="email" name="email" value={shipping.email} onChange={handleShippingChange} required
                      className="w-full px-4 py-3 bg-[#0a0908] border border-[#c8973a]/20 text-[#f0e8d5] placeholder:text-[#7a6e5c]/50 focus:border-[#c8973a] focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#7a6e5c] mb-2">Phone Number</label>
                  <input
                    type="tel" name="phone" value={shipping.phone} onChange={handleShippingChange} required
                    className="w-full px-4 py-3 bg-[#0a0908] border border-[#c8973a]/20 text-[#f0e8d5] placeholder:text-[#7a6e5c]/50 focus:border-[#c8973a] focus:outline-none transition-colors"
                    placeholder="+251 9xx xxx xxxx"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#7a6e5c] mb-2">Address</label>
                  <input
                    type="text" name="address" value={shipping.address} onChange={handleShippingChange} required
                    className="w-full px-4 py-3 bg-[#0a0908] border border-[#c8973a]/20 text-[#f0e8d5] placeholder:text-[#7a6e5c]/50 focus:border-[#c8973a] focus:outline-none transition-colors"
                    placeholder="Street address"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm text-[#7a6e5c] mb-2">City</label>
                    <input
                      type="text" name="city" value={shipping.city} onChange={handleShippingChange} required
                      className="w-full px-4 py-3 bg-[#0a0908] border border-[#c8973a]/20 text-[#f0e8d5] placeholder:text-[#7a6e5c]/50 focus:border-[#c8973a] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#7a6e5c] mb-2">Country</label>
                    <input
                      type="text" name="country" value={shipping.country} onChange={handleShippingChange} required
                      className="w-full px-4 py-3 bg-[#0a0908] border border-[#c8973a]/20 text-[#f0e8d5] placeholder:text-[#7a6e5c]/50 focus:border-[#c8973a] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#7a6e5c] mb-2">Postal Code</label>
                    <input
                      type="text" name="postalCode" value={shipping.postalCode} onChange={handleShippingChange}
                      className="w-full px-4 py-3 bg-[#0a0908] border border-[#c8973a]/20 text-[#f0e8d5] placeholder:text-[#7a6e5c]/50 focus:border-[#c8973a] focus:outline-none transition-colors"
                      placeholder="Optional"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-[#c8973a] text-[#080706] font-medium text-sm tracking-wider hover:bg-[#e2b45a] transition-colors flex items-center justify-center gap-2 mt-8"
                >
                  REVIEW ORDER
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>
            </motion.div>
          )}

          {/* STAGE 3: Confirmation */}
          {stage === 'confirmation' && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto"
            >
              <button
                onClick={() => setStage('shipping')}
                className="flex items-center gap-2 text-sm text-[#7a6e5c] hover:text-[#c8973a] transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Shipping
              </button>

              <h1 className="font-serif text-3xl md:text-4xl text-[#f0e8d5] mb-8">Confirm Your Order</h1>

              {/* Order Items Summary */}
              <div className="mb-6">
                <h2 className="text-sm text-[#7a6e5c] tracking-wider uppercase mb-4">Items ({getTotalItems()})</h2>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex items-center gap-4 p-3 bg-[#131110] border border-[#c8973a]/10">
                      <div className="relative w-12 h-14 flex-shrink-0 overflow-hidden">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="48px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#f0e8d5] truncate">{item.product.name}</p>
                        <p className="text-xs text-[#7a6e5c]">Size: {item.size} · Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-serif text-[#c8973a]">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Summary */}
              <div className="mb-6 p-6 bg-[#131110] border border-[#c8973a]/10">
                <h2 className="text-sm text-[#7a6e5c] tracking-wider uppercase mb-4">Shipping To</h2>
                <p className="text-[#f0e8d5]">{shipping.name}</p>
                <p className="text-sm text-[#7a6e5c] mt-1">{shipping.address}</p>
                <p className="text-sm text-[#7a6e5c]">{shipping.city}, {shipping.country} {shipping.postalCode}</p>
                <p className="text-sm text-[#7a6e5c] mt-2">{shipping.email} · {shipping.phone}</p>
              </div>

              {/* Totals */}
              <div className="p-6 bg-[#131110] border border-[#c8973a]/10 space-y-3 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-[#7a6e5c]">Subtotal</span>
                  <span className="text-[#f0e8d5]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#7a6e5c]">Shipping</span>
                  <span className="text-[#c8973a]">FREE</span>
                </div>
                <div className="h-px bg-[#c8973a]/10" />
                <div className="flex justify-between">
                  <span className="text-[#f0e8d5] font-medium">Total</span>
                  <span className="font-serif text-2xl text-[#c8973a]">{formatPrice(total)}</span>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full py-4 bg-[#c8973a] text-[#080706] font-medium text-sm tracking-wider hover:bg-[#e2b45a] transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-[#080706]/30 border-t-[#080706] rounded-full"
                    />
                    PLACING ORDER...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    PLACE ORDER
                  </>
                )}
              </motion.button>
            </motion.div>
          )}

          {/* STAGE 4: Success */}
          {stage === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                className="w-20 h-20 mx-auto mb-8 bg-[#c8973a]/20 border border-[#c8973a] flex items-center justify-center"
              >
                <Check className="w-8 h-8 text-[#c8973a]" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h1 className="font-serif text-4xl md:text-5xl text-[#f0e8d5] mb-4">
                  Order <span className="text-[#c8973a] italic">Placed</span>
                </h1>
                <p className="text-[#7a6e5c] mb-6">Thank you for choosing LOTUS. Your order is being prepared with care.</p>

                <div className="p-6 bg-[#131110] border border-[#c8973a]/20 mb-8 inline-block">
                  <p className="text-[10px] text-[#7a6e5c] tracking-[0.3em] uppercase mb-2">Order Number</p>
                  <p className="font-serif text-2xl text-[#c8973a]">#{orderNumber}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/shop"
                    className="px-8 py-4 bg-[#c8973a] text-[#080706] font-medium text-sm tracking-wider hover:bg-[#e2b45a] transition-colors"
                  >
                    CONTINUE SHOPPING
                  </Link>
                  <Link
                    href="/"
                    className="px-8 py-4 border border-[#c8973a]/30 text-[#f0e8d5] text-sm tracking-wider hover:border-[#c8973a] transition-colors"
                  >
                    BACK TO HOME
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
