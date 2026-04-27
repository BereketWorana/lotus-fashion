"use client"

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { authService } from '@/lib/services/auth.service'

function VerifyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Verifying your email...')

  const userId = searchParams.get('userId')
  const secret = searchParams.get('secret')

  useEffect(() => {
    const verify = async () => {
      if (!userId || !secret) {
        setStatus('error')
        setMessage('Invalid verification link.')
        return
      }

      try {
        await authService.verifyEmail(userId, secret)
        setStatus('success')
        setMessage('Your email has been successfully verified.')
      } catch (err: any) {
        setStatus('error')
        setMessage(err?.message || 'Verification failed. The link may have expired.')
      }
    }

    verify()
  }, [userId, secret])

  return (
    <div className="bg-[#131110] border border-[#c8973a]/20 p-8 md:p-10 text-center">
      {status === 'loading' && (
        <div className="py-8 flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-[#c8973a] animate-spin mb-6" />
          <h3 className="text-[#f0e8d5] text-xl font-serif mb-2">Verifying Email</h3>
          <p className="text-[#7a6e5c] text-sm">{message}</p>
        </div>
      )}

      {status === 'success' && (
        <div className="py-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#c8973a]/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-[#c8973a]" />
            </div>
          </div>
          <h3 className="text-[#f0e8d5] text-xl font-serif mb-4">Verification Successful</h3>
          <p className="text-[#7a6e5c] text-sm mb-8">{message}</p>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#c8973a] text-[#080706] font-medium text-sm tracking-wider hover:bg-[#e2b45a] transition-colors"
          >
            CONTINUE TO LOGIN
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {status === 'error' && (
        <div className="py-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <h3 className="text-[#f0e8d5] text-xl font-serif mb-4">Verification Failed</h3>
          <p className="text-[#7a6e5c] text-sm mb-8">{message}</p>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-sm text-[#c8973a] hover:underline"
          >
            Back to Sign In
          </Link>
        </div>
      )}
    </div>
  )
}

export default function VerifyPage() {
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
              Authentication
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-[#f0e8d5] mb-3">
              Email <span className="text-[#c8973a] italic">Verification</span>
            </h1>
            <p className="text-[#7a6e5c] text-sm">
              Confirming your identity to secure your account.
            </p>
          </div>

          <Suspense fallback={
            <div className="bg-[#131110] border border-[#c8973a]/20 p-8 md:p-10 flex flex-col items-center justify-center min-h-[300px]">
               <Loader2 className="w-10 h-10 text-[#c8973a] animate-spin mb-4" />
                <p className="text-[#7a6e5c] text-sm tracking-widest">LOADING...</p>
            </div>
          }>
            <VerifyContent />
          </Suspense>
        </motion.div>
      </div>
    </main>
  )
}
