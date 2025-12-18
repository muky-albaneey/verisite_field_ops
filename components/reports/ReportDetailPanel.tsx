'use client'

import { CheckCircle2, FileText } from 'lucide-react'
import { ReportDetail } from '@/lib/fieldOps/mockReportDetail'

interface ReportDetailPanelProps {
  detail: ReportDetail
}

export default function ReportDetailPanel({ detail }: ReportDetailPanelProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
      {/* Expected Completion */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <span className="text-sm font-medium text-gray-500">Expected Completion</span>
        <span className="text-sm font-medium text-gray-900">{detail.expectedCompletion}</span>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <span className="text-sm font-medium text-gray-500">Status</span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-900 capitalize">{detail.status}</span>
        </div>
      </div>

      {/* Field Observations - First instance */}
      <div className="pb-4 border-b border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Field Observations</h4>
        <div className="space-y-3">
          {detail.fieldObservations.map((obs, index) => (
            <div key={`first-${index}`} className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between items-start mb-1">
                <p className="text-sm text-gray-700 flex-1">{obs.text}</p>
                <span className="text-xs text-gray-500 ml-2">{obs.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Field Observations - Second instance (duplicated) */}
      <div className="pb-4 border-b border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Field Observations</h4>
        <div className="space-y-3">
          {detail.fieldObservations.map((obs, index) => (
            <div key={`second-${index}`} className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between items-start mb-1">
                <p className="text-sm text-gray-700 flex-1">{obs.text}</p>
                <span className="text-xs text-gray-500 ml-2">{obs.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* File */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">File</h4>
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-900">{detail.files[0]?.name}</span>
        </div>
      </div>
    </div>
  )
}

