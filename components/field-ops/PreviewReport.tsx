'use client'

import { Download } from 'lucide-react'
import ProgressBar from '@/components/ui/ProgressBar'
import { UploadedReport } from '@/lib/fieldOps/mock'

interface PreviewReportProps {
  report: UploadedReport
  milestone: string
}

export default function PreviewReport({ report, milestone }: PreviewReportProps) {
  const comments = [
    { title: 'Foundation carefully considered', body: 'Foundation carefully considered, working in progress. Reinforcements properly aligned.', time: '2 min ago' },
    { title: 'Minor issues fixed', body: 'Minor issues are fixed and ready for early testing.', time: '1 min ago' },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column */}
      <div className="space-y-6">
        {/* Three image upload */}
        {report.images.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Three image upload</h3>
            <div className="grid grid-cols-3 gap-4">
              {report.images.slice(0, 3).map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                  <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Three video upload */}
        {report.videos.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Three video upload</h3>
            <div className="grid grid-cols-3 gap-4">
              {report.videos.slice(0, 3).map((vid, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                  <img src={vid.url} alt={vid.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* File */}
        {report.documents.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">File</h3>
            {report.documents.map((doc, idx) => (
              <a
                key={idx}
                href="#"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{doc.name}</span>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Comments */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Comments</h3>
          <div className="space-y-4">
            {comments.map((comment, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{comment.title}</h4>
                  <span className="text-xs text-gray-500">{comment.time}</span>
                </div>
                <p className="text-sm text-gray-600">{comment.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Progress</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <ProgressBar progress={88} showLabel={false} />
            </div>
            <span className="text-sm font-medium text-gray-900">88%</span>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Status</h3>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
            Ongoing
          </span>
        </div>
      </div>
    </div>
  )
}
