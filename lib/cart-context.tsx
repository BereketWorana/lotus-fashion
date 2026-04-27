"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { Product } from './products'
import { getExchangeRate, formatPriceSync } from './services/currency.service'

export interface CartItem {
  product: Product
  quantity: number
  size: string
}

interface CartContextType {
  items: CartItem[]
  currency: 'USD' | 'ETB'
  etbRate: number
  isCartOpen: boolean
  addToCart: (product: Product, size: string) => void
  removeFromCart: (productId: number | string, size: string) => void
  updateQuantity: (productId: number | string, size: string, quantity: number) => void
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

const CART_STORAGE_KEY = 'lotus_cart'

function loadCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveCartToStorage(items: CartItem[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch {}
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [currency, setCurrency] = useState<'USD' | 'ETB'>('USD')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [etbRate, setEtbRate] = useState(155) // sensible default

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = loadCartFromStorage()
    if (stored.length > 0) setItems(stored)
  }, [])

  // Save cart to localStorage on change
  useEffect(() => {
    saveCartToStorage(items)
  }, [items])

  // Fetch live exchange rate on mount
  useEffect(() => {
    getExchangeRate().then(rate => setEtbRate(rate))
  }, [])

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

  const removeFromCart = useCallback((productId: number | string, size: string) => {
    setItems(prev => prev.filter(
      item => !(item.product.id === productId && item.size === size)
    ))
  }, [])

  const updateQuantity = useCallback((productId: number | string, size: string, quantity: number) => {
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
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  }, [items])

  const getTotalItems = useCallback(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }, [items])

  const formatPrice = useCallback((price: number) => {
    return formatPriceSync(price, currency, etbRate)
  }, [currency, etbRate])

  return (
    <CartContext.Provider
      value={{
        items,
        currency,
        etbRate,
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
