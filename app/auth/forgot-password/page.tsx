"use client"

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { authService } from '@/lib/services/auth.service'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const resetUrl = `${window.location.origin}/auth/reset-password`
      await authService.forgotPassword(email, resetUrl)
      setSuccess(true)
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.')
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
              Recovery
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-[#f0e8d5] mb-3">
              Forgot <span className="text-[#c8973a] italic">Password</span>
            </h1>
            <p className="text-[#7a6e5c] text-sm">
              Enter your email and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Form / Success State */}
          <div className="bg-[#131110] border border-[#c8973a]/20 p-8 md:p-10">
            {success ? (
              <div className="text-center py-4">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-[#c8973a]/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-[#c8973a]" />
                  </div>
                </div>
                <h3 className="text-[#f0e8d5] text-xl font-serif mb-4">Check Your Email</h3>
                <p className="text-[#7a6e5c] text-sm mb-8">
                  We've sent a password reset link to <span className="text-[#c8973a]">{email}</span>. 
                  Please check your inbox and spam folder.
                </p>
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-2 text-sm text-[#c8973a] hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Sign In
                </Link>
              </div>
            ) : (
              <>
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
                        SENDING LINK...
                      </>
                    ) : (
                      'SEND RESET LINK'
                    )}
                  </motion.button>

                  <div className="text-center pt-2">
                    <Link
                      href="/auth/login"
                      className="inline-flex items-center gap-2 text-xs text-[#7a6e5c] hover:text-[#c8973a] transition-colors"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      Back to Sign In
                    </Link>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  )
}
