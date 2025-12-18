'use client'

import Modal from './Modal'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  confirmVariant?: 'primary' | 'danger'
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmVariant = 'primary',
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false}>
      <div className="p-8">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-3">{title}</h2>

        {/* Message */}
        <p className="text-gray-600 mb-6">{message}</p>

        {/* Buttons - Cancel (red, left), Confirm/Logout (outline, right) */}
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
              confirmVariant === 'danger'
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {cancelLabel}
          </button>
          <button
            onClick={handleConfirm}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
              confirmVariant === 'danger'
                ? 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                : 'bg-[#0F5132] text-white hover:bg-[#0d4228]'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  )
}

