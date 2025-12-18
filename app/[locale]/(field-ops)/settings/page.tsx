'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import SettingsTabs, { type SettingsTab } from '@/components/settings/SettingsTabs'
import MobileSettingsMenu from '@/components/settings/MobileSettingsMenu'
import ProfileForm from '@/components/settings/ProfileForm'
import SecurityForm from '@/components/settings/SecurityForm'
import NotificationsPanel from '@/components/settings/NotificationsPanel'
import HelpSupportPanel from '@/components/settings/HelpSupportPanel'
import TermsPanel from '@/components/settings/TermsPanel'
import FaqPanel from '@/components/settings/FaqPanel'

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string || 'en'

  const tabParam = searchParams.get('tab') as SettingsTab | null
  const [activeTab, setActiveTab] = useState<SettingsTab>(tabParam || 'profile')
  const [showMobileMenu, setShowMobileMenu] = useState(!tabParam)

  useEffect(() => {
    if (tabParam && ['profile', 'security', 'notifications', 'help-support', 'terms', 'faq'].includes(tabParam)) {
      setActiveTab(tabParam)
      setShowMobileMenu(false)
    } else if (!tabParam) {
      setShowMobileMenu(true)
    }
  }, [tabParam])

  const handleTabChange = (tab: SettingsTab) => {
    setActiveTab(tab)
    router.push(`/${locale}/settings?tab=${tab}`, { scroll: false })
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileForm />
      case 'security':
        return <SecurityForm />
      case 'notifications':
        return <NotificationsPanel />
      case 'help-support':
        return <HelpSupportPanel />
      case 'terms':
        return <TermsPanel />
      case 'faq':
        return <FaqPanel />
      default:
        return <ProfileForm />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Capture accurate evidence, build investor trust.</p>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden lg:block">
        <SettingsTabs activeTab={activeTab} />
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        {showMobileMenu ? (
          <MobileSettingsMenu
            onSelect={(tab) => {
              handleTabChange(tab as SettingsTab)
            }}
          />
        ) : (
          <div className="space-y-4">
            {/* Back button */}
            <button
              onClick={() => {
                setShowMobileMenu(true)
                router.push(`/${locale}/settings`)
              }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back</span>
            </button>
            {/* Content */}
            {renderContent()}
          </div>
        )}
      </div>

      {/* Desktop Content */}
      <div className="hidden lg:block">{renderContent()}</div>
    </div>
  )
}

