"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Product } from './products'

export interface CartItem {
  product: Product
  quantity: number
  size: string
}

interface CartContextType {
  items: CartItem[]
  currency: 'USD' | 'ETB'
  isCartOpen: boolean
  addToCart: (product: Product, size: string) => void
  removeFromCart: (productId: number, size: string) => void
  updateQuantity: (productId: number, size: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  closeCart: () => void
  openCart: () => void
  setCurrency: (currency: 'USD' | 'ETB') => void
  getTotal: () => number
  getTotalItems: () => number
  formatPrice: (price: number) => string
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const ETB_RATE = 56.5 // USD to ETB exchange rate

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [currency, setCurrency] = useState<'USD' | 'ETB'>('USD')
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = useCallback((product: Product, size: string) => {
    setItems(prev => {
      const existingItem = prev.find(
        item => item.product.id === product.id && item.size === size
      )
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1, size }]
    })
    setIsCartOpen(true)
  }, [])

  const removeFromCart = useCallback((productId: number, size: string) => {
    setItems(prev => prev.filter(
      item => !(item.product.id === productId && item.size === size)
    ))
  }, [])

  const updateQuantity = useCallback((productId: number, size: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId, size)
      return
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    )
  }, [removeFromCart])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const toggleCart = useCallback(() => {
    setIsCartOpen(prev => !prev)
  }, [])

  const closeCart = useCallback(() => {
    setIsCartOpen(false)
  }, [])

  const openCart = useCallback(() => {
    setIsCartOpen(true)
  }, [])

  const getTotal = useCallback(() => {
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    return currency === 'ETB' ? total * ETB_RATE : total
  }, [items, currency])

  const getTotalItems = useCallback(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }, [items])

  const formatPrice = useCallback((price: number) => {
    const convertedPrice = currency === 'ETB' ? price * ETB_RATE : price
    return currency === 'ETB' 
      ? `ETB ${convertedPrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
      : `$${convertedPrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
  }, [currency])

  return (
    <CartContext.Provider
      value={{
        items,
        currency,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        closeCart,
        openCart,
        setCurrency,
        getTotal,
        getTotalItems,
        formatPrice
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
