'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import BadgePill from '@/components/ui/BadgePill'
import NotificationsList from '@/components/field-ops/NotificationsList'
import { getAllNotifications, getUnreadNotifications, type Notification } from '@/lib/fieldOps/mockNotifications'

type NotificationTab = 'all' | 'unread'

export default function NotificationsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string || 'en'

  const tabParam = searchParams.get('tab') as NotificationTab | null
  const stateParam = searchParams.get('state')
  
  const [activeTab, setActiveTab] = useState<NotificationTab>(tabParam || 'all')
  const [notifications, setNotifications] = useState<Notification[]>(
    stateParam === 'empty' ? [] : getAllNotifications()
  )

  useEffect(() => {
    if (stateParam === 'empty') {
      setNotifications([])
    } else {
      setNotifications(getAllNotifications())
    }
  }, [stateParam])

  useEffect(() => {
    if (tabParam && ['all', 'unread'].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  const handleTabChange = (tab: NotificationTab) => {
    setActiveTab(tab)
    router.push(`/${locale}/notifications?tab=${tab}`, { scroll: false })
  }

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    )
  }

  const filteredNotifications =
    activeTab === 'unread'
      ? notifications.filter((n) => !n.isRead)
      : notifications

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Notification</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-3">
        <BadgePill
          label="All"
          active={activeTab === 'all'}
          onClick={() => handleTabChange('all')}
          count={activeTab === 'all' ? notifications.length : undefined}
        />
        <BadgePill
          label="Unread"
          active={activeTab === 'unread'}
          onClick={() => handleTabChange('unread')}
          count={activeTab === 'unread' ? unreadCount : undefined}
        />
      </div>

      {/* Notifications List */}
      <NotificationsList
        notifications={filteredNotifications}
        onMarkAsRead={handleMarkAsRead}
      />
    </div>
  )
}

