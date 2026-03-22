"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const TikTokIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className="w-5 h-5"
  >
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
  </svg>
)

const footerLinks = {
  collections: [
    { label: 'Women', href: '/shop?category=Women' },
    { label: 'Men', href: '/shop?category=Men' },
    { label: 'Streetwear', href: '/shop?category=Streetwear' },
    { label: 'New Arrivals', href: '/shop?category=New In' },
    { label: 'Sale', href: '/shop?category=Sale' },
  ],
  support: [
    { label: 'Shipping & Returns', href: '/contact' },
    { label: 'Size Guide', href: '/contact' },
    { label: 'Care Instructions', href: '/contact' },
    { label: 'FAQ', href: '/contact' },
  ],
  company: [
    { label: 'Our Story', href: '/about' },
    { label: 'Artisans', href: '/about' },
    { label: 'Sustainability', href: '/about' },
    { label: 'Press', href: '/contact' },
    { label: 'Contact', href: '/contact' },
  ],
}

export function Footer() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <footer 
      ref={ref}
      className="relative bg-[#0a0908] border-t border-[#c8973a]/10"
    >
      <div className="container mx-auto px-6 lg:px-12 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif text-3xl tracking-wider text-[#f0e8d5]">
                LO<span className="text-[#c8973a]">T</span>US
              </span>
            </Link>
            <p className="text-[#7a6e5c] text-sm leading-relaxed mb-6">
              ሎተስ · Rise. Bloom. Become.
            </p>
            <p className="text-[#7a6e5c]/70 text-sm leading-relaxed mb-8">
              From the mud, the lotus blooms — and so will you. Handcrafted Ethiopian luxury fashion.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com/we_are_lotus"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-[#c8973a]/20 text-[#7a6e5c] hover:text-[#c8973a] hover:border-[#c8973a]/50 transition-all"
                aria-label="Follow on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://tiktok.com/@we_are_lotus"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-[#c8973a]/20 text-[#7a6e5c] hover:text-[#c8973a] hover:border-[#c8973a]/50 transition-all"
                aria-label="Follow on TikTok"
              >
                <TikTokIcon />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-serif text-lg text-[#f0e8d5] mb-6">Collections</h4>
            <ul className="space-y-3">
              {footerLinks.collections.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#7a6e5c] hover:text-[#c8973a] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-serif text-lg text-[#f0e8d5] mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#7a6e5c] hover:text-[#c8973a] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif text-lg text-[#f0e8d5] mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#7a6e5c] hover:text-[#c8973a] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-[#c8973a]/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#7a6e5c]/60 text-xs tracking-wider">
              © {new Date().getFullYear()} LOTUS. All rights reserved.
            </p>
            <p className="text-[#7a6e5c]/60 text-xs tracking-wider">
              Built by <span className="text-[#c8973a]/80">Bereket Worana</span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
