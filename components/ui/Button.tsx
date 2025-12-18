'use client'

import { ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  isLoading?: boolean
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
  
  const variantClasses = {
    primary: 'bg-[#0F5132] text-white hover:bg-[#0d4228]',
    secondary: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 bg-white',
  }

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  )
}

