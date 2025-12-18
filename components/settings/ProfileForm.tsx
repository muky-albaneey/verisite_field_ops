'use client'

import { useState, useEffect } from 'react'
import { Camera, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import Select from '@/components/ui/Select'
import SuccessModal from '@/components/ui/SuccessModal'
import { useQueryModal } from '@/hooks/useQueryModal'

export default function ProfileForm() {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string || 'en'
  const { isOpen, openModal, closeModal } = useQueryModal()

  const [fullName, setFullName] = useState('Jemimah Koti')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState('Lagos, Nigeria')
  const [language, setLanguage] = useState('english')
  const [timezone, setTimezone] = useState('gmt+1')

  const handleSave = () => {
    // In a real app, this would save the data
    openModal('profile-updated', `/${locale}/settings?tab=profile`)
  }

  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
  ]

  const timezoneOptions = [
    { value: 'gmt+1', label: 'GMT+1 WAT' },
    { value: 'gmt+0', label: 'GMT+0 GMT' },
    { value: 'gmt+2', label: 'GMT+2 CAT' },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jemimah"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#0F5132] rounded-full flex items-center justify-center">
            <Camera className="w-4 h-4 text-white" />
          </button>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mt-4">{fullName}</h3>
        <p className="text-sm text-gray-600">{location}</p>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your first name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5132] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5132] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5132] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5132] focus:border-transparent"
          />
        </div>
      </div>

      {/* Language & Region */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Language & Region</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <Select
              value={language}
              onChange={setLanguage}
              options={languageOptions.map((opt) => ({ value: opt.value, label: opt.label }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <Select
              value={timezone}
              onChange={setTimezone}
              options={timezoneOptions.map((opt) => ({ value: opt.value, label: opt.label }))}
            />
          </div>
        </div>
      </div>

      {/* Identification */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Identification</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valid ID (NIN/Passport)
            </label>
            <p className="text-sm text-gray-500 mb-2">Upload your NIN, pass, license</p>
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Upload className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">Upload File</span>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Valid certificate</label>
            <p className="text-sm text-gray-500 mb-2">Upload your business</p>
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Upload className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">Upload File</span>
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <button
          onClick={handleSave}
          className="bg-[#0F5132] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0d4228] transition-colors"
        >
          Save Change
        </button>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isOpen('profile-updated')}
        onClose={closeModal}
        title="Profile Updated"
        message="Your profile setting is successfully updated and saved."
      />
    </div>
  )
}

