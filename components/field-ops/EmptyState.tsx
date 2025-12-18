'use client'

import { Home, CheckCircle2 } from 'lucide-react'

interface EmptyStateProps {
  showCta?: boolean
  onCtaClick?: () => void
}

export default function EmptyState({ showCta = false, onCtaClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative mb-6">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
          <Home className="w-12 h-12 text-gray-400" />
        </div>
        {showCta && (
          <div className="absolute -bottom-2 -right-2 bg-green-600 rounded-full p-2">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
        )}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Empty Project</h3>
      <p className="text-gray-600 text-center max-w-md mb-8">
        You don't have any project to work with, you can start accepting project now.
      </p>
      {showCta && (
        <button
          onClick={onCtaClick}
          className="bg-[#0F5132] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0d4228] transition-colors"
        >
          Accept new project
        </button>
      )}
    </div>
  )
}

