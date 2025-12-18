'use client'

import { LogOut } from 'lucide-react'
import { useQueryModal } from '@/hooks/useQueryModal'

interface LogoutButtonProps {
  locale: string
}

export default function LogoutButton({ locale }: LogoutButtonProps) {
  const { openModal } = useQueryModal()

  const handleLogoutClick = () => {
    if (typeof window === 'undefined') return
    const currentPath = window.location.pathname
    openModal('logout', currentPath)
  }

  return (
    <button
      onClick={handleLogoutClick}
      className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors w-full"
    >
      <LogOut className="w-5 h-5" />
      <span className="text-sm font-medium">Logout</span>
    </button>
  )
}

