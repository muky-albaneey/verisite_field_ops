'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useParams } from 'next/navigation'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import PasswordRules from '@/components/ui/PasswordRules'
import Link from 'next/link'

interface CreateNewPasswordFormProps {
  initialState?: 'default' | 'weak' | 'error' | 'loading'
}

export default function CreateNewPasswordForm({ initialState = 'default' }: CreateNewPasswordFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams()
  const locale = params.locale as string || 'en'

  const state = searchParams.get('state') || initialState

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validatePassword = () => {
    if (password.length < 8) return false
    if (!/[A-Z]/.test(password)) return false
    if (!/[0-9]/.test(password)) return false
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePassword()) {
      router.push(`/${locale}/auth/reset-password?state=weak&from=${searchParams.get('from') || ''}`)
      return
    }

    if (password !== confirmPassword) {
      router.push(`/${locale}/auth/reset-password?state=error&from=${searchParams.get('from') || ''}`)
      return
    }

    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 900))

    router.push(`/${locale}/auth/signup/success`)
  }

  // Show error if state is error and passwords don't match
  const showError = state === 'error' && password && confirmPassword && password !== confirmPassword

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Password</h1>
        <p className="text-gray-600">
          Your password must be at least 8 characters long and should include at least one uppercase letter, one number and one special character.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Enter new password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
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

        <div>
          <Input
            label="Confirm password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            }
          />
          {showError && (
            <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
          )}
        </div>

        {/* Password Rules */}
        {password && <PasswordRules password={password} />}

        <Button type="submit" isLoading={isLoading} className="w-full">
          Submit
        </Button>

        <div className="text-center text-sm text-gray-600">
          <Link href={`/${locale}/auth/login`} className="text-[#0F5132] hover:underline">
            Back to login
          </Link>
        </div>
      </form>
    </div>
  )
}
