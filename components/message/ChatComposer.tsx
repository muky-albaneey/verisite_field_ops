'use client'

import { useState, useRef } from 'react'
import { Paperclip, Mic, Camera, Send } from 'lucide-react'

interface ChatComposerProps {
  onSend: (message: string) => void
  onSendVoice?: (audioBlob: Blob) => void
}

export default function ChatComposer({ onSend, onSendVoice }: ChatComposerProps) {
  const [message, setMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim())
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        if (onSendVoice && audioBlob.size > 0) {
          onSendVoice(audioBlob)
        }
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Microphone access denied. Please allow microphone access to record voice notes.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      setRecordingTime(0)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="border-t border-gray-200 p-4">
      {isRecording && (
        <div className="mb-2 flex items-center justify-between bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-red-700 font-medium">
              Recording... {formatTime(recordingTime)}
            </span>
          </div>
          <button
            onClick={stopRecording}
            className="text-sm text-red-700 hover:text-red-900 font-medium"
          >
            Stop
          </button>
        </div>
      )}
      
      <div className="flex items-center gap-2">
        <button 
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => {
            // File attachment functionality
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = '*/*'
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0]
              if (file) {
                // Handle file attachment
                console.log('File selected:', file.name)
              }
            }
            input.click()
          }}
        >
          <Paperclip className="w-5 h-5" />
        </button>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Write your message"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5132] focus:border-transparent text-sm"
        />
        
        <button 
          className={`p-2 transition-colors ${
            isRecording 
              ? 'text-red-500 hover:text-red-700' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={isRecording ? stopRecording : startRecording}
          title="Voice note"
        >
          <Mic className="w-5 h-5" />
        </button>
        
        <button 
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => {
            // Camera functionality
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = 'image/*,video/*'
            input.capture = 'environment'
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0]
              if (file) {
                // Handle camera capture
                console.log('File captured:', file.name)
              }
            }
            input.click()
          }}
        >
          <Camera className="w-5 h-5" />
        </button>
        
        <button
          onClick={handleSend}
          disabled={(!message.trim() && !isRecording) || isRecording}
          className="bg-[#0F5132] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0d4228] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>Send</span>
        </button>
      </div>
    </div>
  )
}
