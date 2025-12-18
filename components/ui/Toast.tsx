'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ToastProps {
  show: boolean
  onClose: () => void
  title: string
  message: string
  duration?: number
}

export default function Toast({ show, onClose, title, message, duration = 4000 }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [show, duration, onClose])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed top-4 right-4 z-50 bg-green-50 border-2 border-green-600 rounded-lg shadow-lg p-4 max-w-sm"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">{title}</p>
              <p className="text-sm text-gray-600 mt-1">{message}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

