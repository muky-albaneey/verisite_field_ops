export interface Message {
  id: string
  text: string
  sender: 'incoming' | 'outgoing'
  timestamp: string
  avatar?: string
  type?: 'text' | 'voice' | 'file'
  audioUrl?: string
  fileName?: string
}

export interface ChatThread {
  conversationId: string
  projectName: string
  status: 'online' | 'offline' | 'away'
  avatar: string
  messages: Message[]
}

// Mutable store for messages
const messageStore: Record<string, Message[]> = {
  skyline: [
    {
      id: '1',
      text: "I'm done with project updates, milestone checking, documentation, and answered all the questions about all the construction projects. we will be done in a day.",
      sender: 'incoming',
      timestamp: '12:41 PM',
    },
    {
      id: '2',
      text: "What's the status of Project Alpha?",
      sender: 'outgoing',
      timestamp: '12:42 PM',
    },
    {
      id: '3',
      text: "I'm done with project updates, milestone checking, documentation, and answered all the questions about all the construction projects. we will be done in a day.",
      sender: 'incoming',
      timestamp: '12:43 PM',
    },
    {
      id: '4',
      text: "What's the status of Project Alpha?",
      sender: 'outgoing',
      timestamp: '12:44 PM',
    },
    {
      id: '5',
      text: "I'm done with project updates, milestone checking, documentation, and answered all the questions about all the construction projects. we will be done in a day.",
      sender: 'incoming',
      timestamp: '12:45 PM',
    },
    {
      id: '6',
      text: "What's the status of Project Alpha?",
      sender: 'outgoing',
      timestamp: '12:46 PM',
    },
  ],
}

export function getChatThread(conversationId: string): ChatThread | undefined {
  const messages = messageStore[conversationId]
  if (!messages) return undefined

  return {
    conversationId,
    projectName: 'Skyline tower project',
    status: 'online',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Skyline',
    messages,
  }
}

export function addMessage(conversationId: string, message: Omit<Message, 'id'>): void {
  if (!messageStore[conversationId]) {
    messageStore[conversationId] = []
  }
  
  const newMessage: Message = {
    ...message,
    id: Date.now().toString(),
  }
  
  messageStore[conversationId].push(newMessage)
}

export function addVoiceMessage(conversationId: string, audioBlob: Blob): void {
  const audioUrl = URL.createObjectURL(audioBlob)
  const now = new Date()
  const timestamp = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

  addMessage(conversationId, {
    text: 'Voice message',
    sender: 'outgoing',
    timestamp,
    type: 'voice',
    audioUrl,
  })
}
