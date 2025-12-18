'use client'

import { useState } from 'react'
import NotificationRow from './NotificationRow'
import Switch from '@/components/ui/Switch'

export default function NotificationsPanel() {
  const [notifications, setNotifications] = useState({
    milestoneApprovals: true,
    themeToggle: true,
    newMessages: true,
    payments: true,
    weeklyReports: true,
  })

  const updateNotification = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const notificationItems = [
    {
      id: 'milestoneApprovals',
      title: 'Milestone Approvals',
      description: 'Get notified when a milestone is verified, approved, or rejected.',
      expandable: true,
    },
    {
      id: 'themeToggle',
      title: 'Theme Toggle',
      description: 'Switch between light and dark mode for a comfortable viewing experience.',
      expandable: true,
    },
    {
      id: 'newMessages',
      title: 'New Messages',
      description: 'Get notified when you receive a new chat or reply from your developer or admin.',
      expandable: false,
    },
    {
      id: 'payments',
      title: 'Payments Notifications',
      description: 'Get alerts when payments are made, released, or received.',
      expandable: false,
    },
    {
      id: 'weeklyReports',
      title: 'Weekly Reports',
      description: 'Receive a summary of your project progress and recent activities every week.',
      expandable: false,
    },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Notification settings</h2>
        <p className="text-gray-600">
          We may still send important notifications about your account outside of your notification system.
        </p>
      </div>

      <div className="space-y-0">
        {notificationItems.map((item) => (
          <NotificationRow
            key={item.id}
            title={item.title}
            description={item.description}
            checked={notifications[item.id as keyof typeof notifications]}
            onChange={(checked) => updateNotification(item.id, checked)}
            expandable={item.expandable}
          />
        ))}
      </div>

      {/* Mobile simple version - show when no items visible */}
      <div className="md:hidden mt-6 space-y-4 border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
            <p className="text-xs text-gray-500 mt-1">Get alerts when payments are made, released, or received.</p>
          </div>
          <Switch
            checked={notifications.payments}
            onChange={(checked) => updateNotification('payments', checked)}
          />
        </div>
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Payments Notifications</h3>
            <p className="text-xs text-gray-500 mt-1">Get alerts when payments are made, released, or received.</p>
          </div>
          <Switch
            checked={notifications.payments}
            onChange={(checked) => updateNotification('payments', checked)}
          />
        </div>
      </div>

      <div className="flex justify-end pt-6 mt-6 border-t border-gray-200">
        <button className="bg-[#0F5132] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0d4228] transition-colors">
          Save Change
        </button>
      </div>
    </div>
  )
}

