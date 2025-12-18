'use client'

import { ReactNode } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  rightIcon?: ReactNode
}

export default function Input({ label, error, rightIcon, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      )}
      <div className="relative">
        <input
          {...props}
          className={`
            w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5132] focus:border-transparent transition-colors
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${rightIcon ? 'pr-10' : ''}
            ${className}
          `}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

