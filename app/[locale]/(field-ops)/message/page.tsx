'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { mockConversations } from '@/lib/fieldOps/mockConversations'
import { getChatThread, addMessage, addVoiceMessage } from '@/lib/fieldOps/mockMessages'
import ConversationList from '@/components/message/ConversationList'
import ChatThread from '@/components/message/ChatThread'
import { ArrowLeft } from 'lucide-react'

export default function MessagePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const locale = params.locale as string || 'en'
  
  const chatParam = searchParams.get('chat')
  const [selectedChat, setSelectedChat] = useState<string | null>(chatParam || 'skyline')
  const [isMobile, setIsMobile] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (chatParam && chatParam !== selectedChat) {
      setSelectedChat(chatParam)
    }
  }, [chatParam])

  const handleSelectConversation = (conversationId: string) => {
    setSelectedChat(conversationId)
    if (isMobile) {
      router.push(`/${locale}/message?chat=${conversationId}`, { scroll: false })
    }
  }

  const handleSendMessage = (text: string) => {
    if (!selectedChat) return

    const now = new Date()
    const timestamp = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

    addMessage(selectedChat, {
      text,
      sender: 'outgoing',
      timestamp,
    })

    // Force re-render
    setRefreshKey(prev => prev + 1)
  }

  const handleSendVoice = (audioBlob: Blob) => {
    if (!selectedChat) return

    addVoiceMessage(selectedChat, audioBlob)

    // Force re-render
    setRefreshKey(prev => prev + 1)
  }

  const handleBack = () => {
    setSelectedChat(null)
    router.push(`/${locale}/message`, { scroll: false })
  }

  // Get fresh thread data on each render to see new messages
  const chatThread = selectedChat ? getChatThread(selectedChat) : null

  // Mobile: Show list or chat view based on selectedChat
  if (isMobile) {
    if (!selectedChat || !chatThread) {
      return (
        <div className="space-y-6 h-full flex flex-col">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Message</h1>
            <p className="text-gray-600">Send am message today</p>
          </div>
          <div className="flex-1 min-h-0">
            <ConversationList
              conversations={mockConversations}
              activeId={selectedChat || undefined}
              onSelect={handleSelectConversation}
            />
          </div>
        </div>
      )
    }

    // Mobile chat view
    return (
      <div className="h-full flex flex-col" key={refreshKey}>
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Message</h1>
          </div>
        </div>
        <div className="flex-1 min-h-0">
          <ChatThread thread={chatThread} onSendMessage={handleSendMessage} onSendVoice={handleSendVoice} />
        </div>
      </div>
    )
  }

  // Desktop: Show both panels
  return (
    <div className="space-y-6 h-full flex flex-col" key={refreshKey}>
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Message</h1>
        <p className="text-gray-600">Send am message today</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 flex-1 min-h-0">
        {/* Left Panel - Conversation List */}
        <ConversationList
          conversations={mockConversations}
          activeId={selectedChat || undefined}
          onSelect={handleSelectConversation}
        />

        {/* Right Panel - Chat Thread */}
        {chatThread ? (
          <ChatThread thread={chatThread} onSendMessage={handleSendMessage} onSendVoice={handleSendVoice} />
        ) : (
          <div className="flex items-center justify-center bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  )
}
