'use client'

import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { ChevronRight, LogOut } from 'lucide-react'

interface MobileSettingsMenuProps {
  onSelect: (tab: string) => void
}

const menuItems = [
  { id: 'profile', label: 'Profile' },
  { id: 'security', label: 'Security' },
  { id: 'faq', label: "FAQ's" },
  { id: 'notifications', label: 'Notifications' },
  { id: 'help-support', label: 'Help & Support' },
  { id: 'terms', label: 'Terms and condition' },
]

export default function MobileSettingsMenu({ onSelect }: MobileSettingsMenuProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {menuItems.map((item, index) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={`
            w-full flex items-center justify-between px-4 py-4 text-left hover:bg-gray-50 transition-colors
            ${index !== menuItems.length - 1 ? 'border-b border-gray-200' : ''}
          `}
        >
          <span className="text-gray-900 font-medium">{item.label}</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      ))}
      <button
        onClick={() => {
          // Handle logout
        }}
        className="w-full flex items-center justify-between px-4 py-4 text-left hover:bg-gray-50 transition-colors border-t border-gray-200"
      >
        <span className="text-red-600 font-medium">Logout</span>
        <LogOut className="w-5 h-5 text-red-600" />
      </button>
    </div>
  )
}

