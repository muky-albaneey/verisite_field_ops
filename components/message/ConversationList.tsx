'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import ConversationItem from './ConversationItem'
import { Conversation } from '@/lib/fieldOps/mockConversations'

interface ConversationListProps {
  conversations: Conversation[]
  activeId?: string
  onSelect: (conversationId: string) => void
}

export default function ConversationList({ conversations, activeId, onSelect }: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredConversations = conversations.filter((conv) =>
    conv.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="bg-white rounded-xl border border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Message ({conversations.length})</h2>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5132] focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => (
          <div key={conversation.id} className="border-b border-gray-100 last:border-b-0">
            <ConversationItem
              conversation={conversation}
              isActive={activeId === conversation.id}
              onClick={() => onSelect(conversation.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

