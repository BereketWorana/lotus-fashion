// lib/services/auth.service.ts
import { account, ID } from '../appwrite'
import type { Models } from 'appwrite'

export type User = Models.User<Models.Preferences>

export const authService = {
  async createAccount(email: string, password: string, name: string): Promise<User> {
    const user = await account.create(ID.unique(), email, password, name)
    // Auto-login after signup
    await account.createEmailPasswordSession(email, password)
    return user
  },

  async login(email: string, password: string): Promise<Models.Session> {
    return await account.createEmailPasswordSession(email, password)
  },

  async logout(): Promise<void> {
    try {
      await account.deleteSession('current')
    } catch (error) {
      console.error('Logout error:', error)
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      return await account.get()
    } catch {
      return null
    }
  },

  async isLoggedIn(): Promise<boolean> {
    const user = await this.getCurrentUser()
    return user !== null
  }
}
