'use client'

import { useState } from 'react'
import { Download, Upload, CheckCircle2 } from 'lucide-react'
import { Assignment } from '@/lib/fieldOps/mock'
import ProgressBar from '@/components/ui/ProgressBar'
import Select from '@/components/ui/Select'

interface AssignmentDetailProps {
  assignment: Assignment
  locale: string
}

const milestoneOptions = [
  { value: 'foundation', label: 'Foundation' },
  { value: 'roofing', label: 'Roofing' },
  { value: 'building', label: 'Building' },
  { value: 'finishing', label: 'Finishing' },
  { value: 'plumbing', label: 'Plumbing' },
]

const milestones = [
  { id: 'foundation', name: 'Foundation', date: 'November 3, 2023', status: 'Completed' },
  { id: 'roofing', name: 'Roofing', date: 'November 3, 2023', status: 'Pending' },
  { id: 'building', name: 'Building', date: 'November 3, 2023', status: 'Pending' },
  { id: 'finishing', name: 'Finishing', date: 'November 3, 2023', status: 'Pending' },
  { id: 'plumbing', name: 'Plumbing', date: 'November 3, 2023', status: 'Pending' },
]

const fieldObservations = [
  { text: 'Foundation casting completed, curing in progress. Reinforcements properly aligned.', time: '10 min ago' },
  { text: 'Minor cracks on west wall due to early curing.', time: '1 min ago' },
]

export default function AssignmentDetail({ assignment, locale }: AssignmentDetailProps) {
  const [selectedMilestone, setSelectedMilestone] = useState('foundation')

  return (
    <div className="space-y-6">
      {/* Desktop: 2-column, Mobile: 1-column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Main Image */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="relative w-full h-64 lg:h-96">
              <img
                src={assignment.coverImage}
                alt={assignment.projectName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* About this project */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About this project</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Lekki Villa Phase 1 is a 10-unit smart duplex estate with eco-friendly homes, solar systems, smart locks, and modern design.
            </p>
          </div>

          {/* Developer */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Developer</h3>
            <p className="text-lg font-semibold text-gray-900">BUILDPP LTD.</p>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Progress</h3>
            <ProgressBar progress={85} showLabel />
            <div className="mt-4">
              <a
                href="#"
                className="flex items-center gap-2 text-sm text-[#0F5132] hover:underline"
              >
                <Download className="w-4 h-4" />
                <span>Foundation test results.pdf</span>
              </a>
            </div>
          </div>

          {/* Due Date */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Due</h3>
            <p className="text-lg font-semibold text-gray-900">Oct 15, 2023</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Milestone Dropdown and List */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Milestone</h3>
            <Select
              value={selectedMilestone}
              onChange={setSelectedMilestone}
              options={milestoneOptions.map((opt) => ({ value: opt.value, label: opt.label }))}
            />

            {/* Milestone List */}
            <div className="mt-6 space-y-4">
              {milestones.map((milestone) => (
                <div key={milestone.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center gap-3">
                    {milestone.status === 'Completed' && (
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{milestone.name}</p>
                      <p className="text-xs text-gray-500">{milestone.date}</p>
                    </div>
                  </div>
                  <a
                    href={`/${locale}/assignments/${assignment.id}/upload-details`}
                    className="text-sm text-[#0F5132] hover:underline font-medium"
                  >
                    Upload Report
                  </a>
                </div>
              ))}
            </div>

            {/* Images */}
            {assignment.imageThumbnails.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Images ({assignment.imageThumbnails.length})</h4>
                <div className="grid grid-cols-3 gap-3">
                  {assignment.imageThumbnails.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                      <img src={img} alt={`Image ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Videos */}
            {assignment.videoThumbnails.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Videos ({assignment.videoThumbnails.length})</h4>
                <div className="grid grid-cols-2 gap-3">
                  {assignment.videoThumbnails.map((vid, idx) => (
                    <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                      <img src={vid} alt={`Video ${idx + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Field Observations */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Field Observations</h4>
              <div className="space-y-4">
                {fieldObservations.map((observation, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700 mb-1">{observation.text}</p>
                    <p className="text-xs text-gray-500">{observation.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* File */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">File</h4>
              <a
                href="#"
                className="flex items-center gap-2 text-sm text-[#0F5132] hover:underline"
              >
                <Download className="w-4 h-4" />
                <span>Foundation test results.pdf</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
