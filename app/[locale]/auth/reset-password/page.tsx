'use client'

import { useSearchParams } from 'next/navigation'
import CreateNewPasswordForm from '@/components/auth/CreateNewPasswordForm'
import AuthImagePanel from '@/components/auth/AuthImagePanel'

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const state = searchParams.get('state') || 'default'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="flex flex-col md:grid md:grid-cols-2">
          {/* Mobile: Image on top */}
          <div className="md:hidden">
            <div className="relative h-64 w-full">
              <AuthImagePanel />
            </div>
          </div>

          {/* Desktop: Left Panel - Image */}
          <div className="hidden md:block relative">
            <AuthImagePanel />
          </div>

          {/* Right Panel - Form */}
          <div className="flex items-center justify-center py-8 md:py-12 px-4 md:px-8">
            <CreateNewPasswordForm initialState={state as 'default' | 'weak' | 'error' | 'loading'} />
          </div>
        </div>
      </div>
    </div>
  )
}

