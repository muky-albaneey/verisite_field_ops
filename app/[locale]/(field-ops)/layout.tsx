'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/field-ops/Sidebar'
import Topbar from '@/components/field-ops/Topbar'
import { useParams } from 'next/navigation'
import ConfirmModal from '@/components/ui/ConfirmModal'
import { useQueryModal } from '@/hooks/useQueryModal'
import { useAuthStore } from '@/store/authStore'

export default function FieldOpsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const params = useParams()
  const router = useRouter()
  const locale = params.locale as string || 'en'
  const { isOpen, closeModal } = useQueryModal()
  const { isAuthenticated, logout } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/auth/login`)
    }
  }, [isAuthenticated, locale, router])

  const handleLogout = () => {
    logout()
    router.push(`/${locale}/auth/login`)
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar locale={locale} isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        isOpen={isOpen('logout')}
        onClose={closeModal}
        onConfirm={handleLogout}
        title="Do you want to Logout?"
        message="You would need to log your details in to access your account"
        confirmLabel="Logout"
        cancelLabel="Cancel"
        confirmVariant="danger"
      />
    </div>
  )
}
