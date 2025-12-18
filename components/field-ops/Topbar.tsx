'use client'

import { Search, Bell, Menu } from 'lucide-react'

interface TopbarProps {
  onMenuToggle: () => void
}

export default function Topbar({ onMenuToggle }: TopbarProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 flex items-center justify-between gap-4">
      {/* Mobile menu button */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>

      {/* Search bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Q Search here..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5132] focus:border-transparent"
          />
        </div>
      </div>

      {/* Right side icons */}
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
          <Bell className="w-5 h-5 text-gray-600" />
          {/* Optional notification badge */}
        </button>
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aishat"
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

