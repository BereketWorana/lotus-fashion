import type { Metadata, Viewport } from 'next'
import { DM_Sans, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/lib/cart-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CartDrawer } from '@/components/cart-drawer'
import { CustomCursor } from '@/components/custom-cursor'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap'
})

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'LOTUS | Ethiopian Luxury Fashion',
  description: 'Rise. Bloom. Become. LOTUS brings Ethiopian luxury fashion to the world. Handcrafted in Addis Ababa with heritage techniques and modern elegance.',
  keywords: ['Ethiopian fashion', 'luxury fashion', 'Habesha clothing', 'Addis Ababa', 'African fashion', 'sustainable fashion'],
  authors: [{ name: 'Bereket Worana' }],
  openGraph: {
    title: 'LOTUS | Ethiopian Luxury Fashion',
    description: 'Rise. Bloom. Become. From the mud, the lotus blooms — and so will you.',
    type: 'website',
    locale: 'en_US',
  },
}

export const viewport: Viewport = {
  themeColor: '#080706',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased bg-[#080706] text-[#f0e8d5] lotus-pattern min-h-screen">
        <CartProvider>
          <CustomCursor />
          <Navbar />
          <main className="relative">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
