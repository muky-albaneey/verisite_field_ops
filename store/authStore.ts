import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  isAuthenticated: boolean
  user: {
    email: string
    name: string
  } | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (email: string, password: string) => {
        // Demo login - accept test@verisite.com / password123
        if (email === 'test@verisite.com' && password === 'password123') {
          set({
            isAuthenticated: true,
            user: {
              email,
              name: 'Aishat',
            },
          })
          return true
        }
        return false
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
        })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)

