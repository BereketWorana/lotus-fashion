"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      router.push('/')
    } catch (err: any) {
      setError(err?.message || 'Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="pt-32 pb-24 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <span className="text-[10px] text-[#c8973a] tracking-[0.3em] uppercase mb-3 block">
              Welcome Back
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-[#f0e8d5] mb-3">
              Sign <span className="text-[#c8973a] italic">In</span>
            </h1>
            <p className="text-[#7a6e5c] text-sm">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Form */}
          <div className="bg-[#131110] border border-[#c8973a]/20 p-8 md:p-10">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm text-[#7a6e5c] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a6e5c]" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-[#0a0908] border border-[#c8973a]/20 text-[#f0e8d5] placeholder:text-[#7a6e5c]/50 focus:border-[#c8973a] focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm text-[#7a6e5c] mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a6e5c]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-3 bg-[#0a0908] border border-[#c8973a]/20 text-[#f0e8d5] placeholder:text-[#7a6e5c]/50 focus:border-[#c8973a] focus:outline-none transition-colors"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7a6e5c] hover:text-[#c8973a] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex justify-end mt-2">
                  <Link
                    href="/auth/forgot-password"
                    className="text-[10px] text-[#7a6e5c] hover:text-[#c8973a] tracking-widest uppercase transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#c8973a] text-[#080706] font-medium text-sm tracking-wider hover:bg-[#e2b45a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-[#080706]/30 border-t-[#080706] rounded-full"
                    />
                    SIGNING IN...
                  </>
                ) : (
                  'SIGN IN'
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="mt-8 pt-6 border-t border-[#c8973a]/10 text-center">
              <p className="text-sm text-[#7a6e5c]">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="text-[#c8973a] hover:underline">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
