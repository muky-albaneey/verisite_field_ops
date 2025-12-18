'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useParams } from 'next/navigation'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'

interface LoginFormProps {
  initialState?: 'default' | 'filled' | 'error'
}

export default function LoginForm({ initialState = 'default' }: LoginFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams()
  const locale = params.locale as string || 'en'
  const { login } = useAuthStore()

  const state = searchParams.get('state') || initialState

  const [email, setEmail] = useState(state === 'filled' ? 'test@verisite.com' : '')
  const [password, setPassword] = useState(state === 'filled' ? 'password123' : '')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(state === 'error' ? 'Wrong email and password, try again' : '')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 900))

    // Use Zustand login
    const success = await login(email, password)
    
    if (success) {
      router.push(`/${locale}/auth/login/success`)
    } else {
      setError('Wrong email and password, try again')
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-8">
      {/* Brand */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-600 font-bold text-sm">V</span>
        </div>
        <span className="text-gray-600 font-semibold text-lg">Verisite</span>
      </div>

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
        <p className="text-gray-600">Enter your details to access your account</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div>
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            }
          />
          {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          )}
          <div className="flex justify-end mt-2">
            <Link
              href={`/${locale}/auth/forgot-password`}
              className="text-sm text-[#0F5132] hover:underline"
            >
              Forgot password
            </Link>
          </div>
        </div>

        <Button type="submit" isLoading={isLoading} className="w-full">
          Login
        </Button>

        <Divider />

        <Button
          type="button"
          variant="secondary"
          className="w-full"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>

        <div className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href={`/${locale}/auth/signup`} className="text-[#0F5132] hover:underline font-medium">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  )
}

