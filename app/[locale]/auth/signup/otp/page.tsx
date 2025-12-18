'use client'

import { useSearchParams } from 'next/navigation'
import UploadImageStep from '@/components/auth/UploadImageStep'

export default function OtpPage() {
  const searchParams = useSearchParams()
  const state = searchParams.get('state') || 'empty'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 md:p-12">
        <UploadImageStep initialState={state as 'empty' | 'selected' | 'loading'} />
      </div>
    </div>
  )
}
