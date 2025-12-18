'use client'

interface ChatBubbleProps {
  message: {
    text: string
    timestamp: string
    avatar?: string
    type?: 'text' | 'voice' | 'file'
    audioUrl?: string
    fileName?: string
  }
  sender: 'incoming' | 'outgoing'
}

export default function ChatBubble({ message, sender }: ChatBubbleProps) {
  if (sender === 'outgoing') {
    return (
      <div className="flex justify-end mb-4">
        <div className="flex items-end gap-2 max-w-[70%]">
          <div className="flex flex-col items-end">
            <div className="bg-[#0F5132] text-white px-4 py-2 rounded-lg rounded-br-sm">
              {message.type === 'voice' && message.audioUrl ? (
                <audio controls className="w-48">
                  <source src={message.audioUrl} type="audio/webm" />
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <p className="text-sm">{message.text}</p>
              )}
            </div>
            <span className="text-xs text-gray-500 mt-1">{message.timestamp}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-end gap-2 max-w-[70%]">
        {message.avatar && (
          <img
            src={message.avatar}
            alt="Avatar"
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
          />
        )}
        <div className="flex flex-col">
          <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg rounded-bl-sm">
            {message.type === 'voice' && message.audioUrl ? (
              <audio controls className="w-48">
                <source src={message.audioUrl} type="audio/webm" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <p className="text-sm">{message.text}</p>
            )}
          </div>
          <span className="text-xs text-gray-500 mt-1 ml-1">{message.timestamp}</span>
        </div>
      </div>
    </div>
  )
}

