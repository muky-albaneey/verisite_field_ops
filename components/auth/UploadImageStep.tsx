'use client'

import { useState, useRef, useEffect } from 'react'
import { Camera } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useParams } from 'next/navigation'
import Button from '@/components/ui/Button'

interface UploadImageStepProps {
  initialState?: 'empty' | 'selected' | 'loading'
}

export default function UploadImageStep({ initialState = 'empty' }: UploadImageStepProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams()
  const locale = params.locale as string || 'en'

  const state = searchParams.get('state') || initialState
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Initialize state if coming from query param
  useEffect(() => {
    if (state === 'loading') {
      setIsLoading(true)
    }
  }, [state])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageData = reader.result as string
        setSelectedImage(imageData)
        router.push(`/${locale}/auth/signup/otp?state=selected`)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleDone = async () => {
    if (!selectedImage) return

    setIsLoading(true)
    router.push(`/${locale}/auth/signup/otp?state=loading`)

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 900))

    router.push(`/${locale}/auth/reset-password?from=signup`)
  }

  const hasImage = !!selectedImage

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
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Upload Image</h1>

        {/* Upload Area */}
        <div className="mb-6">
          {selectedImage ? (
            <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-200">
              <img
                src={selectedImage}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
              <button
                onClick={handleUploadClick}
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
              >
                <Camera className="w-8 h-8 text-white" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleUploadClick}
              className="w-48 h-48 mx-auto rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <Camera className="w-16 h-16 text-gray-400 mb-4" />
              <span className="text-sm text-gray-500">Upload now</span>
            </button>
          )}
        </div>

        {/* Helper Text */}
        <p className="text-gray-600 mb-2">Take a clear selfie</p>
        <p className="text-sm text-gray-500">Drag file or browse here</p>
      </div>

      {/* Done Button */}
      <Button
        onClick={handleDone}
        isLoading={isLoading || state === 'loading'}
        disabled={!hasImage || isLoading}
        className="w-full"
      >
        Done
      </Button>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  )
}
