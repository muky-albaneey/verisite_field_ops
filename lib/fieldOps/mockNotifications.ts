export interface Notification {
  id: string
  title: string
  message: string
  timestamp: string
  isRead: boolean
  type: 'user' | 'payment' | 'order' | 'milestone' | 'message'
  avatar?: string
}

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New User Registration',
    message: 'A new user has registered to the system',
    timestamp: '2m',
    isRead: false,
    type: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
  },
  {
    id: '2',
    title: 'Payment Received',
    message: 'A new payment has been made',
    timestamp: '15m',
    isRead: false,
    type: 'payment',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=payment1',
  },
  {
    id: '3',
    title: 'New Order',
    message: 'A new order has been placed',
    timestamp: '1h',
    isRead: true,
    type: 'order',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=order1',
  },
  {
    id: '4',
    title: 'Milestone Completed',
    message: 'Foundation milestone has been completed and verified',
    timestamp: '2h',
    isRead: false,
    type: 'milestone',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=milestone1',
  },
  {
    id: '5',
    title: 'New Message',
    message: 'You have a new message from the developer',
    timestamp: 'Yesterday',
    isRead: true,
    type: 'message',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=message1',
  },
  {
    id: '6',
    title: 'Payment Released',
    message: 'Payment for milestone has been released',
    timestamp: '2 days ago',
    isRead: true,
    type: 'payment',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=payment2',
  },
]

export function getUnreadNotifications(): Notification[] {
  return mockNotifications.filter((n) => !n.isRead)
}

export function getAllNotifications(): Notification[] {
  return mockNotifications
}

