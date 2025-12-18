'use client'

import { Filter, ArrowUpDown, MoreVertical } from 'lucide-react'
import { useState } from 'react'

interface VisitRow {
  project: string
  milestone: string
  location: string
  assDate: string
  dueDate: string
  status: 'completed' | 'ongoing' | 'pending'
}

const sampleData: VisitRow[] = [
  { project: 'Lekki Smart Duplex', milestone: 'Foundation', location: 'Lagos', assDate: 'Oct 30,2025', dueDate: 'Oct 30', status: 'completed' },
  { project: 'Lekki Smart Duplex', milestone: 'Foundation', location: 'Lagos', assDate: 'Oct 30,2025', dueDate: 'Oct 30', status: 'completed' },
  { project: 'Lekki Smart Duplex', milestone: 'Foundation', location: 'Lagos', assDate: 'Oct 30,2025', dueDate: 'Oct 30', status: 'ongoing' },
  { project: 'Lekki Smart Duplex', milestone: 'Foundation', location: 'Lagos', assDate: 'Oct 30,2025', dueDate: 'Oct 30', status: 'pending' },
  { project: 'Lekki Smart Duplex', milestone: 'Foundation', location: 'Lagos', assDate: 'Oct 30,2025', dueDate: 'Oct 30', status: 'completed' },
  { project: 'Lekki Smart Duplex', milestone: 'Foundation', location: 'Lagos', assDate: 'Oct 30,2025', dueDate: 'Oct 30', status: 'pending' },
  { project: 'Lekki Smart Duplex', milestone: 'Foundation', location: 'Lagos', assDate: 'Oct 30,2025', dueDate: 'Oct 30', status: 'completed' },
]

function StatusBadge({ status }: { status: VisitRow['status'] }) {
  const styles = {
    completed: 'bg-green-100 text-green-800',
    ongoing: 'bg-yellow-100 text-yellow-800',
    pending: 'bg-red-100 text-red-800',
  }

  const labels = {
    completed: 'Completed',
    ongoing: 'Ongoing',
    pending: 'Pending',
  }

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      <span className="w-2 h-2 rounded-full bg-current"></span>
      {labels[status]}
    </span>
  )
}

export default function AssignedVisitsTable() {
  const [visits] = useState<VisitRow[]>(sampleData)

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
            {visits.map((visit, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {visit.project}
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {visit.milestone}
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {visit.location}
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {visit.assDate}
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {visit.dueDate}
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={visit.status} />
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
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

