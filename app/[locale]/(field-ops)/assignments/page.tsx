'use client'

import { useParams } from 'next/navigation'
import { mockAssignments } from '@/lib/fieldOps/mock'
import AssignmentsTable from '@/components/field-ops/AssignmentsTable'

export default function AssignmentsPage() {
  const params = useParams()
  const locale = params.locale as string || 'en'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Assignment</h1>
          <p className="text-gray-600">Capture accurate evidence build investor trust.</p>
        </div>
        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
          Active
        </span>
      </div>

      {/* Assignments Table */}
      <AssignmentsTable assignments={mockAssignments} locale={locale} />
    </div>
  )
}

