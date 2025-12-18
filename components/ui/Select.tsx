'use client'

import { ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface SelectOption {
  value: string
  label: string
  indicator?: 'green' | 'yellow' | 'red' | 'orange'
}

interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  className?: string
}

export default function Select({ value, onChange, options, placeholder = 'Select...', className = '' }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find((opt) => opt.value === value)

  const getIndicatorColor = (indicator?: string) => {
    switch (indicator) {
      case 'green':
        return 'bg-green-500'
      case 'yellow':
        return 'bg-yellow-500'
      case 'red':
        return 'bg-red-500'
      case 'orange':
        return 'bg-orange-500'
      default:
        return 'bg-gray-400'
    }
  }

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F5132] focus:border-transparent transition-colors"
      >
        <div className="flex items-center gap-2">
          {selectedOption?.indicator && (
            <span className={`w-2 h-2 rounded-full ${getIndicatorColor(selectedOption.indicator)}`} />
          )}
          <span className="text-sm text-gray-900">{selectedOption?.label || placeholder}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-gray-900 hover:bg-gray-100 transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              {option.indicator && (
                <span className={`w-2 h-2 rounded-full ${getIndicatorColor(option.indicator)}`} />
              )}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

