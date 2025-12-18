'use client'

import { useState, useRef } from 'react'
import { Plus, X, FileText } from 'lucide-react'

interface Document {
  name: string
  size: number
  url?: string
  file?: File
}

interface DocumentsUploaderProps {
  documents: Document[]
  onChange: (documents: Document[]) => void
}

export default function DocumentsUploader({ documents, onChange }: DocumentsUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    if (selectedFiles.length === 0) return

    const newDocuments: Document[] = selectedFiles.map((file) => ({
      name: file.name,
      size: file.size,
      file,
    }))

    onChange([...documents, ...newDocuments])
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemove = (index: number) => {
    const newDocuments = documents.filter((_, i) => i !== index)
    onChange(newDocuments)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Documents</h3>
      
      {documents.length > 0 && (
        <div className="space-y-3 mb-4">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <FileText className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(index)}
                className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => fileInputRef.current?.click()}
        className="inline-flex items-center gap-2 text-sm text-[#0F5132] hover:underline font-medium"
      >
        <Plus className="w-4 h-4" />
        <span>+ Add Another document</span>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.csv,.doc,.docx,.png,.jpg,.jpeg"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  )
}
