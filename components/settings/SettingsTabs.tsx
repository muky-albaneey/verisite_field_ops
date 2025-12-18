'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useParams } from 'next/navigation'

export type SettingsTab = 'profile' | 'security' | 'notifications' | 'help-support' | 'terms' | 'faq'

interface SettingsTabsProps {
  activeTab: SettingsTab
}

const tabs: { id: SettingsTab; label: string }[] = [
  { id: 'profile', label: 'Profile' },
  { id: 'security', label: 'Security' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'help-support', label: 'Help and Support' },
  { id: 'terms', label: 'Terms and condition' },
  { id: 'faq', label: 'FAQ' },
]

export default function SettingsTabs({ activeTab }: SettingsTabsProps) {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string || 'en'

  const handleTabClick = (tabId: SettingsTab) => {
    router.push(`/${locale}/settings?tab=${tabId}`)
  }

  return (
    <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4 mb-6">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`
              px-4 py-2 rounded-lg font-medium text-sm transition-colors
              ${
                isActive
                  ? 'bg-[#0F5132] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }
            `}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

