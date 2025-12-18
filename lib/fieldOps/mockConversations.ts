export interface Conversation {
  id: string
  projectName: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread?: number
}

export const mockConversations: Conversation[] = [
  {
    id: 'skyline',
    projectName: 'Skyline tower project',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Skyline',
    lastMessage: 'The foundation inspection is complete. Moving to next phase',
    timestamp: '2 Min ago',
    unread: 3,
  },
  {
    id: 'lekki-duplex',
    projectName: 'Lekki Smart Duplex',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lekki',
    lastMessage: 'Progress update: Foundation stage 85% complete',
    timestamp: '5 Min ago',
  },
  {
    id: 'victoria-gardens',
    projectName: 'Victoria Gardens',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Victoria',
    lastMessage: 'Roofing inspection scheduled for tomorrow',
    timestamp: '10 Min ago',
  },
  {
    id: 'marina-towers',
    projectName: 'Marina Towers',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marina',
    lastMessage: 'Materials delivered and verified',
    timestamp: '15 Min ago',
  },
  {
    id: 'parkview-estate',
    projectName: 'Parkview Estate',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Parkview',
    lastMessage: 'Quality check completed successfully',
    timestamp: '20 Min ago',
  },
  {
    id: 'sunset-villas',
    projectName: 'Sunset Villas',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sunset',
    lastMessage: 'Need clarification on building plans',
    timestamp: '25 Min ago',
  },
  {
    id: 'ocean-breeze',
    projectName: 'Ocean Breeze',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ocean',
    lastMessage: 'Foundation casting in progress',
    timestamp: '30 Min ago',
  },
  {
    id: 'greenwood-homes',
    projectName: 'Greenwood Homes',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Greenwood',
    lastMessage: 'Site visit completed, report submitted',
    timestamp: '1 Hour ago',
  },
  {
    id: 'crystal-park',
    projectName: 'Crystal Park',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Crystal',
    lastMessage: 'Awaiting approval for next phase',
    timestamp: '2 Hours ago',
  },
  {
    id: 'diamond-plaza',
    projectName: 'Diamond Plaza',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diamond',
    lastMessage: 'All inspections passed successfully',
    timestamp: '3 Hours ago',
  },
]

export function getConversationById(id: string): Conversation | undefined {
  return mockConversations.find((conv) => conv.id === id)
}

