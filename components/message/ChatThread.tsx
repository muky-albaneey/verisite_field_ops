'use client'

import { Phone } from 'lucide-react'
import ChatBubble from './ChatBubble'
import ChatComposer from './ChatComposer'
import { ChatThread as ChatThreadType } from '@/lib/fieldOps/mockMessages'

interface ChatThreadProps {
  thread: ChatThreadType
  onSendMessage: (text: string) => void
  onSendVoice?: (audioBlob: Blob) => void
}

export default function ChatThread({ thread, onSendMessage, onSendVoice }: ChatThreadProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">{thread.projectName}</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 capitalize">{thread.status}</span>
            </div>
          </div>
          <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
            <Phone className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {thread.messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={{
              text: message.text,
              timestamp: message.timestamp,
              avatar: thread.avatar,
              type: message.type,
              audioUrl: message.audioUrl,
              fileName: message.fileName,
            }}
            sender={message.sender}
          />
        ))}
      </div>

      {/* Composer */}
      <ChatComposer onSend={onSendMessage} onSendVoice={onSendVoice} />
    </div>
  )
}

