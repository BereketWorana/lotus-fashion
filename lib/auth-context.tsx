"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { authService, type User } from './services/auth.service'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check session on mount
  useEffect(() => {
    authService.getCurrentUser()
      .then(u => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    await authService.login(email, password)
    const u = await authService.getCurrentUser()
    setUser(u)
  }, [])

  const signup = useCallback(async (email: string, password: string, name: string) => {
    await authService.createAccount(email, password, name)
    const u = await authService.getCurrentUser()
    setUser(u)
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
