'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import SuccessModal from '@/components/ui/SuccessModal'
import { useQueryModal } from '@/hooks/useQueryModal'

export default function SecurityForm() {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string || 'en'
  const { isOpen, openModal, closeModal } = useQueryModal()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChangePassword = () => {
    // In a real app, this would change the password
    openModal('password-updated', `/${locale}/settings?tab=security`)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Password</h2>
        <p className="text-gray-600">Change your password here</p>
      </div>

      <div className="space-y-6 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5132] focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5132] focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleChangePassword}
            className="bg-[#0F5132] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0d4228] transition-colors"
          >
            Change password
          </button>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isOpen('password-updated')}
        onClose={closeModal}
        title="New password update"
        message="Congratulations! You have successfully reset your password!"
      />
    </div>
  )
}

