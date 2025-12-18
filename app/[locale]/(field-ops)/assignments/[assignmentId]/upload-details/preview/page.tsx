'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getAssignmentById, getUploadedReport } from '@/lib/fieldOps/mock'
import Breadcrumb from '@/components/ui/Breadcrumb'
import PreviewReport from '@/components/field-ops/PreviewReport'
import SuccessModal from '@/components/ui/SuccessModal'
import { notFound } from 'next/navigation'

export default function PreviewPage() {
  const params = useParams()
  const router = useRouter()
  const locale = params.locale as string || 'en'
  const assignmentId = params.assignmentId as string

  const assignment = getAssignmentById(assignmentId)
  const report = getUploadedReport()

  const [showSuccessModal, setShowSuccessModal] = useState(false)

  if (!assignment) {
    notFound()
  }

  const handleSubmit = () => {
    setShowSuccessModal(true)
  }

  const handleCancel = () => {
    router.push(`/${locale}/assignments/${assignmentId}/upload-details`)
  }

  const handleGoBack = () => {
    router.push(`/${locale}/assignments/${assignmentId}`)
  }

  return (
    <>
      <div className="space-y-6 max-w-7xl">
        <Breadcrumb
          locale={locale}
          items={[
            { label: 'Assignment', href: '/assignments' },
            { label: assignment.projectName, href: `/assignments/${assignmentId}` },
            { label: 'Upload details', href: `/assignments/${assignmentId}/upload-details` },
            { label: 'Preview' },
          ]}
        />

        {/* Header */}
        <div>
          <p className="text-gray-600 mb-4">Preview your project for more information added.</p>
        </div>

        <PreviewReport report={report} milestone={assignment.milestone} />

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#0F5132] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0d4228] transition-colors"
          >
            Submit Details
          </button>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleGoBack}
        title="Request sent!"
        message={`Report submitted for ${assignment.milestone} is successfully sent for validation. Your report is ready for review shortly.`}
        buttonLabel="Go back"
      />
    </>
  )
}
