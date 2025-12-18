'use client'

import { Home, FileText, Settings, Headphones, LogOut, Menu, Bell, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutButton from './LogoutButton'

interface SidebarProps {
  locale: string
  isOpen: boolean
  onToggle: () => void
}

const navItems = [
  { href: 'dashboard', label: 'Dashboard', icon: Home },
  { href: 'assignments', label: 'Assignments', icon: FileText },
  { href: 'reports', label: 'Reports', icon: FileText },
  { href: 'message', label: 'Message', icon: MessageSquare },
  { href: 'notifications', label: 'Notifications', icon: Bell },
]

export default function Sidebar({ locale, isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname()

  const handleLinkClick = () => {
    // Close sidebar on mobile when link is clicked (only if it's currently open)
    if (isOpen) {
      onToggle()
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:relative lg:z-auto
          w-64 flex flex-col flex-shrink-0
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Verisite</h1>
          <button
            onClick={onToggle}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const fullPath = `/${locale}/${item.href}`
            // Check if pathname starts with fullPath for nested routes
            const isActive = pathname === fullPath || pathname.startsWith(`${fullPath}/`)
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={fullPath}
                onClick={handleLinkClick}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive ? 'bg-[#0F5132] text-white' : 'text-gray-700 hover:bg-gray-100'}
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-gray-200 p-4 space-y-2">
          <Link
            href={`/${locale}/settings`}
            onClick={handleLinkClick}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
              ${pathname.startsWith(`/${locale}/settings`) ? 'bg-[#0F5132] text-white' : 'text-gray-700 hover:bg-gray-100'}
            `}
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </Link>
          <Link
            href={`/${locale}/help`}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Headphones className="w-5 h-5" />
            <span className="font-medium">Help Center</span>
          </Link>
        </div>

        {/* User section */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aishat"
                alt="Aishat"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Aishat</p>
              <p className="text-xs text-gray-500 truncate">Aishat@verisite</p>
            </div>
          </div>
          <LogoutButton locale={locale} />
        </div>
      </aside>
    </>
  )
}

