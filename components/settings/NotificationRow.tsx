'use client'

import Switch from '@/components/ui/Switch'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface NotificationRowProps {
  title: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
  expandable?: boolean
}

export default function NotificationRow({
  title,
  description,
  checked,
  onChange,
  expandable = false,
}: NotificationRowProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <div className="flex items-center justify-between py-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>
            {expandable && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600"
              >
                {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
        <div className="flex-shrink-0 ml-4">
          <Switch checked={checked} onChange={onChange} />
        </div>
      </div>
      {expandable && isExpanded && (
        <div className="pb-4 pl-4 text-sm text-gray-600">
          <p>Additional settings and preferences can be configured here.</p>
        </div>
      )}
    </div>
  )
}

