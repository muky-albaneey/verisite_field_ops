'use client'

import { useState } from 'react'
import { Filter, ArrowUpDown, MoreVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Assignment } from '@/lib/fieldOps/mock'

interface AssignmentsTableProps {
  assignments: Assignment[]
  locale: string
}

function StatusBadge({ status }: { status: Assignment['status'] }) {
  const styles = {
    Completed: 'bg-green-100 text-green-800',
    Ongoing: 'bg-yellow-100 text-yellow-800',
    Pending: 'bg-red-100 text-red-800',
  }

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      <span className="w-2 h-2 rounded-full bg-current"></span>
      {status}
    </span>
  )
}

export default function AssignmentsTable({ assignments, locale }: AssignmentsTableProps) {
  const router = useRouter()

  const handleRowClick = (assignmentId: string) => {
    router.push(`/${locale}/assignments/${assignmentId}`)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Assigned Visits</h2>
      </div>

      <div className="p-4 border-b border-gray-200 flex flex-wrap gap-4">
        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
          <Filter className="w-4 h-4" />
          Filter by location
        </button>
        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
          <Filter className="w-4 h-4" />
          Filter by Milestone
        </button>
        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowUpDown className="w-4 h-4" />
          Sort by Status
        </button>
      </div>

      <div className="overflow-x-auto -mx-4 lg:mx-0 px-4 lg:px-0">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  Project
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                </div>
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  Milestone
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                </div>
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  Location
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                </div>
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  Ass Date
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                </div>
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  Due Date
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                </div>
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  Status
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                </div>
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assignments.map((assignment) => (
              <tr
                key={assignment.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleRowClick(assignment.id)}
              >
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {assignment.projectName}
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {assignment.milestone}
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {assignment.location}
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {assignment.assignedDate}
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {assignment.dueDate}
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={assignment.status} />
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                  <button className="p-1 rounded hover:bg-gray-100 transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

