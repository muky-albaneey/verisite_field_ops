'use client'

import { useParams, useRouter } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function SignupSuccessPage() {
  const params = useParams()
  const router = useRouter()
  const locale = params.locale as string || 'en'

  const handleGoToDashboard = () => {
    router.push(`/${locale}/auth/login`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-12 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-[#0F5132] rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your registration has been received</h1>

        {/* Subtext */}
        <p className="text-gray-600 mb-8">
          Application review in process. You will receive an approval within 48 hours.
        </p>

        {/* Button */}
        <Button onClick={handleGoToDashboard} className="w-full">
          Go to Login
        </Button>
      </div>
    </div>
  )
}

