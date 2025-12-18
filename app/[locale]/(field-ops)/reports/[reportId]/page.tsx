'use client'

import { useParams, notFound } from 'next/navigation'
import { getReportById } from '@/lib/fieldOps/mockReports'
import { getReportDetail } from '@/lib/fieldOps/mockReportDetail'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ReportMediaGrid from '@/components/reports/ReportMediaGrid'
import ReportDetailPanel from '@/components/reports/ReportDetailPanel'
import { ArrowLeft, FileText } from 'lucide-react'
import Link from 'next/link'

export default function ReportDetailPage() {
  const params = useParams()
  const locale = params.locale as string || 'en'
  const reportId = params.reportId as string

  const report = getReportById(reportId)
  const detail = getReportDetail(reportId)

  if (!report) {
    notFound()
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb - Desktop */}
      <div className="hidden md:block">
        <Breadcrumb
          locale={locale}
          items={[
            { label: 'Reports', href: '/reports' },
            { label: 'Views' },
          ]}
        />
      </div>

      {/* Mobile back button */}
      <div className="md:hidden">
        <Link
          href={`/${locale}/reports`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Views</span>
        </Link>
      </div>

      {/* Success message */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-800 font-medium">Report uploaded was successfully</p>
      </div>

      {/* Desktop: 2-column layout */}
      <div className="hidden md:grid md:grid-cols-2 gap-6">
        {/* Left Column - Media */}
        <div className="space-y-6">
          <ReportMediaGrid
            items={detail.images}
            title={`Image(${detail.images.length})`}
            type="image"
          />
          <ReportMediaGrid
            items={detail.videos}
            title={`Video(${detail.videos.length})`}
            type="video"
          />
        </div>

        {/* Right Column - Details */}
        <div>
          <ReportDetailPanel detail={detail} />
        </div>
      </div>

      {/* Mobile: Stacked layout */}
      <div className="md:hidden space-y-6">
        <ReportMediaGrid
          items={detail.images}
          title={`Image(${detail.images.length})`}
          type="image"
        />
        <ReportMediaGrid
          items={detail.videos}
          title={`Video(${detail.videos.length})`}
          type="video"
        />
        
        {/* Expected Completion + Status - Mobile */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <span className="text-sm font-medium text-gray-500">Expected Completion</span>
            <span className="text-sm font-medium text-gray-900">{detail.expectedCompletion}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Status</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900 capitalize">{detail.status}</span>
            </div>
          </div>
        </div>

        {/* Field Observations - Mobile */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
          {/* First instance */}
          <div className="pb-4 border-b border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Field Observations</h4>
            <div className="space-y-3">
              {detail.fieldObservations.map((obs, index) => (
                <div key={`mobile-first-${index}`} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm text-gray-700 flex-1">{obs.text}</p>
                    <span className="text-xs text-gray-500 ml-2">{obs.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Second instance (duplicated) */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Field Observations</h4>
            <div className="space-y-3">
              {detail.fieldObservations.map((obs, index) => (
                <div key={`mobile-second-${index}`} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm text-gray-700 flex-1">{obs.text}</p>
                    <span className="text-xs text-gray-500 ml-2">{obs.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* File - Mobile */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">File</h4>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-900">{detail.files[0]?.name}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

