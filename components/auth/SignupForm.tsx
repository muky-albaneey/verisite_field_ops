'use client'

import { useState, useEffect } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useParams } from 'next/navigation'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'
import Select from '@/components/ui/Select'
import Link from 'next/link'

interface SignupFormProps {
  initialState?: 'default' | 'error' | 'loading'
}

const locationOptions = [
  { value: 'lagos', label: 'Lagos' },
  { value: 'abuja', label: 'Abuja' },
  { value: 'kano', label: 'Kano' },
  { value: 'port-harcourt', label: 'Port Harcourt' },
  { value: 'ibadan', label: 'Ibadan' },
]

export default function SignupForm({ initialState = 'default' }: SignupFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams()
  const locale = params.locale as string || 'en'

  const state = searchParams.get('state') || initialState

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [location, setLocation] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  // Initialize errors if state is error
  useEffect(() => {
    if (state === 'error') {
      // Trigger validation when error state is set
      const newErrors: Record<string, string> = {}
      if (!fullName.trim()) newErrors.fullName = 'Full name is required'
      if (!email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = 'Invalid email address'
      }
      if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required'
      if (!password.trim()) {
        newErrors.password = 'Password is required'
      } else if (password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters'
      }
      if (!location) newErrors.location = 'Location is required'
      setErrors(newErrors)
    }
  }, [state, fullName, email, phoneNumber, password, location])

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email address'
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required'
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required'
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (!location) {
      newErrors.location = 'Location is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validate()) {
      router.push(`/${locale}/auth/signup?state=error`)
      return
    }

    setIsLoading(true)
    router.push(`/${locale}/auth/signup?state=loading`)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 900))

    // Navigate to OTP page with email
    router.push(`/${locale}/auth/signup/otp?email=${encodeURIComponent(email)}`)
  }

  // Show errors if state is error
  const showErrors = state === 'error' || Object.keys(errors).length > 0

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign up as a Field Ops Agent</h1>
        <p className="text-gray-600">Enter your details to create your account</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Full name"
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={showErrors && errors.fullName ? errors.fullName : undefined}
        />

        <Input
          label="Email"
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={showErrors && errors.email ? errors.email : undefined}
        />

        <Input
          label="Phone number"
          type="tel"
          placeholder="9197054837"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          error={showErrors && errors.phoneNumber ? errors.phoneNumber : undefined}
        />

        <Input
          label="Password"
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
          error={showErrors && errors.password ? errors.password : undefined}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <Select
            value={location}
            onChange={setLocation}
            options={locationOptions.map((opt) => ({ value: opt.value, label: opt.label }))}
            placeholder="Select location"
          />
          {showErrors && errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location}</p>
          )}
        </div>

        <Button type="submit" isLoading={isLoading} className="w-full">
          Sign up
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
          <Link href={`/${locale}/auth/login`} className="text-[#0F5132] hover:underline font-medium">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  )
}

