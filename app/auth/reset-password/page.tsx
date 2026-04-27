"use client"

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import { authService } from '@/lib/services/auth.service'

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const userId = searchParams.get('userId')
  const secret = searchParams.get('secret')

  useEffect(() => {
    if (!userId || !secret) {
      setError('Invalid or expired reset link.')
    }
  }, [userId, secret])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    if (!userId || !secret) {
      setError('Invalid reset token.')
      return
    }

    setLoading(true)
    try {
      await authService.resetPassword(userId, secret, password)
      setSuccess(true)
      setTimeout(() => {
        router.push('/auth/login')
      }, 3000)
    } catch (err: any) {
      setError(err?.message || 'Failed to reset password. The link may have expired.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#131110] border border-[#c8973a]/20 p-8 md:p-10">
      {success ? (
        <div className="text-center py-4">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#c8973a]/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-[#c8973a]" />
            </div>
          </div>
          <h3 className="text-[#f0e8d5] text-xl font-serif mb-4">Password Reset Successful</h3>
          <p className="text-[#7a6e5c] text-sm mb-4">
            Your password has been successfully updated.
          </p>
          <p className="text-[#c8973a] text-xs animate-pulse">
            Redirecting to login page...
          </p>
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

          {!userId || !secret ? (
             <div className="text-center py-4">
                <p className="text-[#7a6e5c] text-sm mb-6">
                  This reset link is invalid or has expired. Please request a new one.
                </p>
                <button
                  onClick={() => router.push('/auth/forgot-password')}
                  className="w-full py-4 bg-transparent border border-[#c8973a]/20 text-[#c8973a] font-medium text-sm tracking-wider hover:bg-[#c8973a]/5 transition-colors"
                >
                  REQUEST NEW LINK
                </button>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm text-[#7a6e5c] mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a6e5c]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full pl-12 pr-12 py-3 bg-[#0a0908] border border-[#c8973a]/20 text-[#f0e8d5] placeholder:text-[#7a6e5c]/50 focus:border-[#c8973a] focus:outline-none transition-colors"
                    placeholder="Minimum 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7a6e5c] hover:text-[#c8973a] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm text-[#7a6e5c] mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a6e5c]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-[#0a0908] border border-[#c8973a]/20 text-[#f0e8d5] placeholder:text-[#7a6e5c]/50 focus:border-[#c8973a] focus:outline-none transition-colors"
                    placeholder="Repeat new password"
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
                    RESETTING PASSWORD...
                  </>
                ) : (
                  'RESET PASSWORD'
                )}
              </motion.button>
            </form>
          )}
        </>
      )}
    </div>
  )
}

export default function ResetPasswordPage() {
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
              Security
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-[#f0e8d5] mb-3">
              New <span className="text-[#c8973a] italic">Password</span>
            </h1>
            <p className="text-[#7a6e5c] text-sm">
              Please enter your new password below.
            </p>
          </div>

          <Suspense fallback={
            <div className="bg-[#131110] border border-[#c8973a]/20 p-8 md:p-10 flex flex-col items-center justify-center min-h-[300px]">
               <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 border-2 border-[#c8973a]/30 border-t-[#c8973a] rounded-full mb-4"
                />
                <p className="text-[#7a6e5c] text-sm tracking-widest">LOADING...</p>
            </div>
          }>
            <ResetPasswordForm />
          </Suspense>
        </motion.div>
      </div>
    </main>
  )
}
