"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useScrollDirection } from '@/hooks/use-scroll-animation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const { toggleCart, getTotalItems, currency, setCurrency } = useCart()
  const { scrollY } = useScrollDirection()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const isScrolled = scrollY > 50
  const totalItems = getTotalItems()

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'py-3 backdrop-blur-xl bg-[#080706]/90 border-b border-[#c8973a]/10' 
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex flex-col items-start group">
              <span className="font-serif text-2xl md:text-3xl tracking-wider text-[#f0e8d5] transition-colors">
                LO<span className="text-[#c8973a]">T</span>US
              </span>
              <span className="text-[10px] text-[#7a6e5c] tracking-[0.3em] -mt-1">
                ሎተስ
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link text-sm tracking-wide uppercase transition-colors ${
                    pathname === link.href 
                      ? 'text-[#c8973a] active' 
                      : 'text-[#f0e8d5]/80 hover:text-[#f0e8d5]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* Currency Toggle */}
              <button
                onClick={() => setCurrency(currency === 'USD' ? 'ETB' : 'USD')}
                className="hidden sm:flex items-center gap-1 text-xs tracking-wider text-[#7a6e5c] hover:text-[#c8973a] transition-colors"
              >
                <span className={currency === 'USD' ? 'text-[#c8973a]' : ''}>USD</span>
                <span>/</span>
                <span className={currency === 'ETB' ? 'text-[#c8973a]' : ''}>ETB</span>
              </button>

              {/* Cart Button */}
              <button
                onClick={toggleCart}
                className="relative p-2 text-[#f0e8d5] hover:text-[#c8973a] transition-colors"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-[#c8973a] text-[#080706] text-[10px] font-medium rounded-full"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#f0e8d5] hover:text-[#c8973a] transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div 
              className="absolute inset-0 bg-[#080706]/95 backdrop-blur-xl"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.nav 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="relative flex flex-col items-center justify-center h-full gap-8"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={`font-serif text-3xl tracking-wide transition-colors ${
                      pathname === link.href 
                        ? 'text-[#c8973a]' 
                        : 'text-[#f0e8d5] hover:text-[#c8973a]'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              {/* Currency Toggle in Mobile */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                onClick={() => setCurrency(currency === 'USD' ? 'ETB' : 'USD')}
                className="mt-8 flex items-center gap-2 text-sm tracking-wider text-[#7a6e5c]"
              >
                <span className={currency === 'USD' ? 'text-[#c8973a]' : ''}>USD</span>
                <span className="text-[#c8973a]">/</span>
                <span className={currency === 'ETB' ? 'text-[#c8973a]' : ''}>ETB</span>
              </motion.button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
