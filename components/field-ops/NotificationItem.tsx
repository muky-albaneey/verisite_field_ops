'use client'

import { Notification } from '@/lib/fieldOps/mockNotifications'

interface NotificationItemProps {
  notification: Notification
  onMarkAsRead?: (id: string) => void
}

export default function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  const handleClick = () => {
    if (!notification.isRead && onMarkAsRead) {
      onMarkAsRead(notification.id)
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`
        flex items-start gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer
        ${!notification.isRead ? 'bg-blue-50/50' : ''}
      `}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {notification.avatar ? (
            <img src={notification.avatar} alt={notification.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-300" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 mb-1">{notification.title}</h4>
            <p className="text-sm text-gray-600">{notification.message}</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {!notification.isRead && (
              <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
            )}
            <span className="text-xs text-gray-500 whitespace-nowrap">{notification.timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

