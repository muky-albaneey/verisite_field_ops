import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  locale: string
}

export default function Breadcrumb({ items, locale }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
          {item.href ? (
            <Link href={`/${locale}${item.href}`} className="hover:text-gray-900 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className={index === items.length - 1 ? 'text-gray-900 font-medium' : ''}>{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}

