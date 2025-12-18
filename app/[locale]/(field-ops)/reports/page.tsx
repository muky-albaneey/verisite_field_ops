'use client'

import { useSearchParams } from 'next/navigation'
import { useParams } from 'next/navigation'
import { mockReports } from '@/lib/fieldOps/mockReports'
import ReportsEmptyState from '@/components/reports/ReportsEmptyState'
import ReportsTable from '@/components/reports/ReportsTable'
import { Filter, SortAsc } from 'lucide-react'

export default function ReportsPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const locale = params.locale as string || 'en'
  const state = searchParams.get('state') || 'list'

  const showEmpty = state === 'empty'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Reports</h1>
        <p className="text-gray-600">Capture accurate evidence  build investor trust.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter by location</span>
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter by Milestone</span>
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <SortAsc className="w-4 h-4" />
          <span>Sort by Status</span>
        </button>
      </div>

      {/* Content */}
      {showEmpty ? (
        <ReportsEmptyState locale={locale} />
      ) : (
        <ReportsTable reports={mockReports} locale={locale} />
      )}
    </div>
  )
}
