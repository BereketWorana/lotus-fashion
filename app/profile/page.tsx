"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Eye, EyeOff, ShieldCheck, LogOut, Loader2 } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { authService } from '@/lib/services/auth.service'

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading: authLoading, logout } = useAuth()
  
  // Password change state
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login')
    }
  }, [user, authLoading, router])

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.')
      return
    }

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters.')
      return
    }

    setLoading(true)
    try {
      await authService.updatePassword(oldPassword, newPassword)
      setSuccess('Password updated successfully!')
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err: any) {
      setError(err?.message || 'Failed to update password. Please check your current password.')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080706]">
        <Loader2 className="w-12 h-12 text-[#c8973a] animate-spin" />
      </div>
    )
  }

  return (
    <main className="pt-32 pb-24 min-h-screen bg-[#080706]">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-12 border-b border-[#c8973a]/10 pb-8">
            <h1 className="font-serif text-4xl md:text-5xl text-[#f0e8d5] mb-2">
              My <span className="text-[#c8973a] italic">Account</span>
            </h1>
            <p className="text-[#7a6e5c] text-sm tracking-widest uppercase">
              Manage your profile and security
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Sidebar / Info */}
            <div className="space-y-8">
              <div className="bg-[#131110] border border-[#c8973a]/20 p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#c8973a]/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-[#c8973a]" />
                  </div>
                  <div>
                    <h2 className="text-[#f0e8d5] font-serif text-lg">{user.name}</h2>
                    <p className="text-[#7a6e5c] text-xs">Member since {new Date(user.$createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t border-[#c8973a]/10">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-[#7a6e5c]" />
                    <span className="text-[#f0e8d5]">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <ShieldCheck className="w-4 h-4 text-[#c8973a]" />
                    <span className={user.emailVerification ? 'text-green-500' : 'text-[#7a6e5c]'}>
                      {user.emailVerification ? 'Verified' : 'Unverified'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => logout()}
                  className="w-full mt-8 flex items-center justify-center gap-2 py-3 border border-red-500/20 text-red-500 hover:bg-red-500/5 transition-colors text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  SIGN OUT
                </button>
              </div>
            </div>

            {/* Main Content / Change Password */}
            <div className="md:col-span-2">
              <div className="bg-[#131110] border border-[#c8973a]/20 p-8 md:p-10">
                <h3 className="font-serif text-2xl text-[#f0e8d5] mb-6">Security</h3>
                
                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
                    {success}
                  </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <h4 className="text-xs text-[#7a6e5c] tracking-widest uppercase mb-4">Change Password</h4>
                  
                  {/* Old Password */}
                  <div>
                    <label htmlFor="oldPassword" id="oldPasswordLabel" className="block text-sm text-[#7a6e5c] mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a6e5c]" />
                      <input
                        type={showPasswords ? 'text' : 'password'}
                        id="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                        className="w-full pl-12 pr-12 py-3 bg-[#0a0908] border border-[#c8973a]/20 text-[#f0e8d5] focus:border-[#c8973a] focus:outline-none transition-colors"
                        placeholder="Your current password"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* New Password */}
                    <div>
                      <label htmlFor="newPassword" id="newPasswordLabel" className="block text-sm text-[#7a6e5c] mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a6e5c]" />
                        <input
                          type={showPasswords ? 'text' : 'password'}
                          id="newPassword"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                          minLength={8}
                          className="w-full pl-12 pr-4 py-3 bg-[#0a0908] border border-[#c8973a]/20 text-[#f0e8d5] focus:border-[#c8973a] focus:outline-none transition-colors"
                          placeholder="At least 8 characters"
                        />
                      </div>
                    </div>

                    {/* Confirm New Password */}
                    <div>
                      <label htmlFor="confirmPassword" id="confirmPasswordLabel" className="block text-sm text-[#7a6e5c] mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a6e5c]" />
                        <input
                          type={showPasswords ? 'text' : 'password'}
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className="w-full pl-12 pr-4 py-3 bg-[#0a0908] border border-[#c8973a]/20 text-[#f0e8d5] focus:border-[#c8973a] focus:outline-none transition-colors"
                          placeholder="Repeat new password"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="text-xs text-[#7a6e5c] hover:text-[#c8973a] transition-colors flex items-center gap-2"
                    >
                      {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      {showPasswords ? 'Hide' : 'Show'} Passwords
                    </button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3 bg-[#c8973a] text-[#080706] font-medium text-sm tracking-wider hover:bg-[#e2b45a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          UPDATING...
                        </>
                      ) : (
                        'UPDATE PASSWORD'
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
