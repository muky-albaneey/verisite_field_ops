'use client'

import { useParams, notFound } from 'next/navigation'
import { getAssignmentById } from '@/lib/fieldOps/mock'
import AssignmentDetail from '@/components/field-ops/AssignmentDetail'
import Breadcrumb from '@/components/ui/Breadcrumb'

export default function AssignmentDetailPage() {
  const params = useParams()
  const locale = params.locale as string || 'en'
  const assignmentId = params.assignmentId as string

  const assignment = getAssignmentById(assignmentId)

  if (!assignment) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <Breadcrumb
        locale={locale}
        items={[
          { label: 'Assignment', href: '/assignments' },
          { label: assignment.projectName },
        ]}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-gray-900">{assignment.projectName}</h1>
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            Active
          </span>
        </div>
      </div>

      {/* Location and Status */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">{assignment.location}, Nigeria</span>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
          {assignment.status}
        </span>
      </div>

      <AssignmentDetail assignment={assignment} locale={locale} />
    </div>
  )
}

