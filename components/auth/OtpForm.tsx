'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useParams } from 'next/navigation'
import Button from '@/components/ui/Button'

interface OtpFormProps {
  initialState?: 'default' | 'resent' | 'error' | 'loading'
  email?: string
}

export default function OtpForm({ initialState = 'default', email }: OtpFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams()
  const locale = params.locale as string || 'en'

  const state = searchParams.get('state') || initialState
  const emailParam = searchParams.get('email') || email || 'example@gmail.com'

  const [otp, setOtp] = useState<string[]>(['', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const [showResent, setShowResent] = useState(false)
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Initialize state from query params
  useEffect(() => {
    if (state === 'error') {
      setError('Invalid OTP')
    }
    if (state === 'loading') {
      setIsLoading(true)
    }
    if (state === 'resent') {
      setShowResent(true)
      setTimeout(() => setShowResent(false), 3000)
    }
  }, [state])

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError('')

    // Auto-focus next input
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 5)
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp]
      pastedData.split('').forEach((digit, index) => {
        if (index < 5) {
          newOtp[index] = digit
        }
      })
      setOtp(newOtp)
      // Focus last filled input
      const lastFilledIndex = Math.min(pastedData.length - 1, 4)
      inputRefs.current[lastFilledIndex]?.focus()
    }
  }

  const handleVerify = async () => {
    const otpString = otp.join('')
    if (otpString.length !== 5) return

    setIsLoading(true)
    setError('')
    router.push(`/${locale}/auth/signup/otp?email=${encodeURIComponent(emailParam)}&state=loading`)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 900))

    // Demo: accept OTP 12345 for success, any other shows error
    if (otpString === '12345') {
      router.push(`/${locale}/dashboard`)
    } else {
      setIsLoading(false)
      setError('Invalid OTP')
      router.push(`/${locale}/auth/signup/otp?email=${encodeURIComponent(emailParam)}&state=error`)
    }
  }

  const handleResend = () => {
    if (!canResend) return

    setCountdown(30)
    setCanResend(false)
    setShowResent(true)
    setOtp(['', '', '', '', ''])
    setError('')
    
    // Clear resent message after 3 seconds
    setTimeout(() => setShowResent(false), 3000)
    
    router.push(`/${locale}/auth/signup/otp?email=${encodeURIComponent(emailParam)}&state=resent`)
    
    // Focus first input
    setTimeout(() => inputRefs.current[0]?.focus(), 100)
  }

  const isComplete = otp.every((digit) => digit !== '') && otp.join('').length === 5

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="w-full max-w-md mx-auto p-8">
      {/* Brand */}
      <div className="flex items-center gap-2 mb-12">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-600 font-bold text-sm">V</span>
        </div>
        <span className="text-gray-600 font-semibold text-lg">Verisite</span>
      </div>

      {/* Heading */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">OTP VERIFICATION</h1>
        <p className="text-gray-600">Enter the OTP sent to {emailParam}</p>
      </div>

      {/* OTP Inputs */}
      <div className="mb-6">
        <div className="flex justify-center gap-3 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className={`
                w-14 h-14 text-center text-xl font-semibold border-2 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-[#0F5132] focus:border-transparent
                transition-colors
                ${error ? 'border-red-500' : 'border-gray-300'}
              `}
            />
          ))}
        </div>
        
        {error && (
          <p className="text-sm text-red-600 text-center mt-2">{error}</p>
        )}
        
        {showResent && (
          <p className="text-sm text-green-600 text-center mt-2">Code resent successfully</p>
        )}
      </div>

      {/* Timer and Resend */}
      <div className="mb-6 text-center space-y-2">
        {countdown > 0 && (
          <p className="text-sm text-gray-600">Resend code in {formatTime(countdown)}</p>
        )}
        <p className="text-sm text-gray-600">
          Didn't receive OTP?{' '}
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              className="text-[#0F5132] hover:underline font-medium"
            >
              Resend Code
            </button>
          ) : (
            <span className="text-gray-400">Resend Code</span>
          )}
        </p>
      </div>

      {/* Verify Button */}
      <Button
        onClick={handleVerify}
        isLoading={isLoading}
        disabled={!isComplete || isLoading}
        className="w-full"
      >
        Verify
      </Button>
    </div>
  )
}
