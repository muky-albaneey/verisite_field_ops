'use client'

import HelpSupportPanel from '@/components/settings/HelpSupportPanel'

export default function HelpCenterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Help Center</h1>
        <p className="text-gray-600">Get support and find answers to your questions</p>
      </div>

      <HelpSupportPanel />
    </div>
  )
}

