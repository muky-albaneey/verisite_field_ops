'use client'

interface ConversationItemProps {
  conversation: {
    id: string
    projectName: string
    avatar: string
    lastMessage: string
    timestamp: string
    unread?: number
  }
  isActive?: boolean
  onClick: () => void
}

export default function ConversationItem({ conversation, isActive, onClick }: ConversationItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors text-left
        ${isActive ? 'bg-gray-50' : ''}
      `}
    >
      <div className="flex-shrink-0">
        <img
          src={conversation.avatar}
          alt={conversation.projectName}
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-sm font-semibold text-gray-900 truncate">{conversation.projectName}</h3>
          <span className="text-xs text-gray-500 flex-shrink-0">{conversation.timestamp}</span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{conversation.lastMessage}</p>
      </div>
    </button>
  )
}

