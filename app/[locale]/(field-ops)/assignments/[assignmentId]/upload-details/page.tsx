'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { getAssignmentById, getUploadedReport, type UploadedReport } from '@/lib/fieldOps/mock'
import Breadcrumb from '@/components/ui/Breadcrumb'
import MediaUploader from '@/components/field-ops/MediaUploader'
import DocumentsUploader from '@/components/field-ops/DocumentsUploader'
import CommentsForm from '@/components/field-ops/CommentsForm'
import ProgressBar from '@/components/ui/ProgressBar'
import Select from '@/components/ui/Select'
import Modal from '@/components/ui/Modal'
import SuccessModal from '@/components/ui/SuccessModal'
import { CheckCircle2 } from 'lucide-react'
import { notFound } from 'next/navigation'

const statusOptions = [
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
]

export default function UploadDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const locale = params.locale as string || 'en'
  const assignmentId = params.assignmentId as string
  const state = searchParams.get('state') || 'uploaded'

  const assignment = getAssignmentById(assignmentId)
  const initialReport = getUploadedReport()

  if (!assignment) {
    notFound()
  }

  const [report, setReport] = useState<UploadedReport>(initialReport)
  const [status, setStatus] = useState('ongoing')
  const [uploading, setUploading] = useState(state === 'uploading')

  useEffect(() => {
    if (state === 'uploading') {
      setUploading(true)
    } else if (state === 'uploaded') {
      setUploading(false)
    } else if (state === 'success') {
      // Modal will be shown via SuccessModal component
    }
  }, [state])

  const handlePreview = () => {
    router.push(`/${locale}/assignments/${assignmentId}/upload-details/preview`)
  }

  const handleGoBack = () => {
    router.push(`/${locale}/assignments/${assignmentId}`)
  }

  // Convert report data to MediaFile format
  const images = report.images.map((img) => ({
    url: img.url,
    name: img.name,
    size: img.size,
  }))

  const videos = report.videos.map((vid) => ({
    url: vid.url,
    name: vid.name,
    size: vid.size,
  }))

  // Show empty arrays when uploading state
  const imageFiles = uploading && state === 'uploading' ? [] : images
  const videoFiles = uploading && state === 'uploading' ? [] : videos

  const getStatusIndicator = (statusValue: string) => {
    switch (statusValue) {
      case 'ongoing':
        return <span className="text-xs text-yellow-600">Ongoing</span>
      case 'pending':
        return <span className="text-xs text-red-600">Pending</span>
      case 'completed':
        return <span className="text-xs text-green-600">Completed</span>
      default:
        return null
    }
  }

  // If state is success, show modal overlay
  if (state === 'success') {
    return (
      <>
        <div className="space-y-6 opacity-50 pointer-events-none">
          {/* Render the normal page content but dimmed */}
          <Breadcrumb
            locale={locale}
            items={[
              { label: 'Assignment', href: '/assignments' },
              { label: assignment.projectName, href: `/assignments/${assignmentId}` },
              { label: 'Upload details' },
            ]}
          />
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Media</h1>
              <p className="text-gray-600">
                Attach verified images and footage for the Foundation Stage milestone.
              </p>
            </div>
          </div>
        </div>

        <SuccessModal
          isOpen={true}
          onClose={handleGoBack}
          title="Request sent!"
          message="Report submitted for Foundation is successfully sent for validation. Your report is ready for review shortly."
          buttonLabel="Go back"
        />
      </>
    )
  }

  return (
    <div className="space-y-6 max-w-7xl">
      <Breadcrumb
        locale={locale}
        items={[
          { label: 'Assignment', href: '/assignments' },
          { label: assignment.projectName, href: `/assignments/${assignmentId}` },
          { label: 'Upload details' },
        ]}
      />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Media</h1>
          <p className="text-gray-600">
            Attach verified images and footage for the Foundation Stage milestone.
          </p>
        </div>
        <button
          onClick={handlePreview}
          className="bg-[#0F5132] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0d4228] transition-colors text-sm"
        >
          Preview Details
        </button>
      </div>

      {/* Desktop: 2-column, Mobile: 1-column */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
        {/* Left Column - Media */}
        <div className="space-y-6">
          <MediaUploader
            type="image"
            label="Image"
            minCount={5}
            files={imageFiles}
            onChange={(files) => {
              setReport({
                ...report,
                images: files.map((f) => ({ url: f.url, name: f.name, size: f.size })),
              })
            }}
            uploading={uploading && state === 'uploading'}
          />

          <MediaUploader
            type="video"
            label="Video"
            minCount={5}
            files={videoFiles}
            onChange={(files) => {
              setReport({
                ...report,
                videos: files.map((f) => ({ url: f.url, name: f.name, size: f.size })),
              })
            }}
            uploading={uploading && state === 'uploading'}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <DocumentsUploader
            documents={report.documents}
            onChange={(docs) => setReport({ ...report, documents: docs })}
          />

          {/* Progress */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Progress</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <ProgressBar progress={85} showLabel={false} />
              </div>
              <span className="text-sm font-medium text-gray-900">85%</span>
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              {getStatusIndicator(status)}
            </div>
            <Select value={status} onChange={setStatus} options={statusOptions} />
          </div>

          <CommentsForm
            comments={report.comments}
            onChange={(comments) => setReport({ ...report, comments })}
          />
        </div>
      </div>
    </div>
  )
}
