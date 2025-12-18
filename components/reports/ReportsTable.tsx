'use client'

import { CheckCircle2, AlertTriangle, Clock, FileText } from 'lucide-react'
import { Report } from '@/lib/fieldOps/mockReports'
import Link from 'next/link'

interface ReportsTableProps {
  reports: Report[]
  locale: string
}

export default function ReportsTable({ reports, locale }: ReportsTableProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />
      case 'flagged':
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case 'under-review':
        return <Clock className="w-4 h-4 text-orange-600" />
      default:
        return null
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approved'
      case 'flagged':
        return 'Flagged'
      case 'under-review':
        return 'Under Review'
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600'
      case 'flagged':
        return 'text-red-600'
      case 'under-review':
        return 'text-orange-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Report ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Milestone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Submitted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {report.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {report.project}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {report.milestone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {report.dateSubmitted}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(report.status)}
                    <span className={`text-sm font-medium ${getStatusColor(report.status)}`}>
                      {getStatusLabel(report.status)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {report.status === 'flagged' ? (
                    <button className="text-red-600 hover:underline font-medium">
                      [Reupload]
                    </button>
                  ) : (
                    <Link
                      href={`/${locale}/reports/${report.id}`}
                      className="text-[#0F5132] hover:underline font-medium"
                    >
                      view
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

