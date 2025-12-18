'use client'

import { CheckCircle2, X } from 'lucide-react'
import Modal from './Modal'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  buttonLabel?: string
}

export default function SuccessModal({
  isOpen,
  onClose,
  title,
  message,
  buttonLabel = 'Done',
}: SuccessModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false}>
      <div className="p-8 text-center relative">
        {/* Close X button - top left */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-[#0F5132] rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>

        {/* Message */}
        <p className="text-gray-600 mb-6">{message}</p>

        {/* Button */}
        <button
          onClick={onClose}
          className="bg-[#0F5132] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#0d4228] transition-colors"
        >
          {buttonLabel}
        </button>
      </div>
    </Modal>
  )
}

