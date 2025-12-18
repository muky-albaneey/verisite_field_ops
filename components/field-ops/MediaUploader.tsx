'use client'

import { useState, useRef } from 'react'
import { Plus, Loader2, Camera, Video } from 'lucide-react'

interface MediaFile {
  url: string
  name: string
  size: number
  file?: File
}

interface MediaUploaderProps {
  type: 'image' | 'video'
  label: string
  minCount: number
  files: MediaFile[]
  onChange: (files: MediaFile[]) => void
  uploading?: boolean
}

export default function MediaUploader({ type, label, minCount, files, onChange, uploading = false }: MediaUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    if (selectedFiles.length === 0) return

    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      const newFiles: MediaFile[] = selectedFiles.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        file,
      }))

      onChange([...files, ...newFiles])
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }, 1200)
  }

  const handleRemove = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    onChange(newFiles)
  }

  const handleAddClick = () => {
    fileInputRef.current?.click()
  }

  // Show 3 placeholders by default
  const placeholderCount = 3
  const displayFiles = files.slice(0, placeholderCount)
  const hasMoreFiles = files.length > placeholderCount

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{label}</h3>
        <p className="text-sm text-gray-500">Capture min {minCount} {type === 'image' ? 'photos' : 'Videos'}</p>
      </div>

      {/* Upload area with 3 placeholders/thumbnails */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Show existing files or placeholders */}
        {displayFiles.map((file, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50 group">
            {uploading && index < displayFiles.length && files.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
              </div>
            ) : (
              <>
                {type === 'image' ? (
                  <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                ) : (
                  <>
                    <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>
                  </>
                )}
                <button
                  onClick={() => handleRemove(index)}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  ×
                </button>
              </>
            )}
          </div>
        ))}

        {/* Show empty placeholders if less than 3 files */}
        {displayFiles.length < placeholderCount && !uploading && !isUploading && (
          <>
            {[...Array(placeholderCount - displayFiles.length)].map((_, idx) => (
              <button
                key={`empty-${idx}`}
                onClick={handleAddClick}
                className="aspect-square rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col items-center justify-center"
              >
                {type === 'image' ? (
                  <Camera className="w-6 h-6 text-gray-400 mb-1" />
                ) : (
                  <Video className="w-6 h-6 text-gray-400 mb-1" />
                )}
                <Plus className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </>
        )}

        {/* Show loading placeholder when uploading */}
        {isUploading && displayFiles.length < placeholderCount && (
          <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
          </div>
        )}
      </div>

      {/* Add Another button - centered */}
      <div className="flex justify-center">
        <button
          onClick={handleAddClick}
          className="text-sm text-[#0F5132] hover:underline font-medium"
        >
          + Add Another {type === 'image' ? 'image' : 'video'}
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={type === 'image' ? 'image/*' : 'video/*'}
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  )
}
