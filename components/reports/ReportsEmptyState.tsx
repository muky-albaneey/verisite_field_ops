'use client'

import { Home } from 'lucide-react'

interface ReportsEmptyStateProps {
  locale: string
}

export default function ReportsEmptyState({ locale }: ReportsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 bg-[#0F5132] rounded-full flex items-center justify-center mb-6">
        <Home className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">Empty Project</h2>
      <p className="text-gray-600 text-center mb-8 max-w-md">
        You don't have any project to work with, you can start accepting project now.
      </p>
      <button className="bg-[#0F5132] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0d4228] transition-colors">
        Accept new project
      </button>
    </div>
  )
}

