'use client'

import { useState } from 'react'
import { ChevronDown, Plus } from 'lucide-react'

interface AccordionItem {
  id: string
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export default function Accordion({ items, className = '' }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id)
        return (
          <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900 pr-4">{item.question}</span>
              <div className="flex-shrink-0">
                {isOpen ? (
                  <ChevronDown className="w-5 h-5 text-gray-500 rotate-180 transition-transform" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 text-gray-600 border-t border-gray-200">
                <p className="pt-4">{item.answer}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

