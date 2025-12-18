'use client'

import { useState } from 'react'
import { Notification } from '@/lib/fieldOps/mockNotifications'
import NotificationItem from './NotificationItem'
import EmptyState from '@/components/ui/EmptyState'

interface NotificationsListProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
}

export default function NotificationsList({ notifications, onMarkAsRead }: NotificationsListProps) {
  if (notifications.length === 0) {
    return (
      <EmptyState
        title="No notification yet"
        description="You have no new notifications at the moment."
      />
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="divide-y divide-gray-200">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkAsRead={onMarkAsRead}
          />
        ))}
      </div>
    </div>
  )
}

