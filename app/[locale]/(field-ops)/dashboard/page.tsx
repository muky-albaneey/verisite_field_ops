'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import KpiCard from '@/components/field-ops/KpiCard'
import EmptyState from '@/components/field-ops/EmptyState'
import AssignedVisitsTable from '@/components/field-ops/AssignedVisitsTable'
import Toast from '@/components/ui/Toast'

type DashboardState = 'pending' | 'verified_toast' | 'verified_empty' | 'has_assignments'

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const stateParam = searchParams.get('state') as DashboardState | null
  const [state, setState] = useState<DashboardState>(stateParam || 'verified_empty')
  const [showToast, setShowToast] = useState(false)

  // Update state when query param changes
  useEffect(() => {
    if (stateParam && ['pending', 'verified_toast', 'verified_empty', 'has_assignments'].includes(stateParam)) {
      setState(stateParam)
    }
  }, [stateParam])

  // Show toast when state is verified_toast
  useEffect(() => {
    if (state === 'verified_toast') {
      setShowToast(true)
    }
  }, [state])

  const getSubtitle = () => {
    switch (state) {
      case 'pending':
        return 'Awaiting for Approval'
      case 'verified_toast':
      case 'verified_empty':
      case 'has_assignments':
        return 'You can now receive assignments, upload reports, and earn rewards for verified inspections.'
      default:
        return ''
    }
  }

  const handleAcceptProject = () => {
    // In a real app, this would navigate or trigger an action
    console.log('Accept project clicked')
  }

  return (
    <div className="space-y-6">
      {/* Toast */}
      {state === 'verified_toast' && (
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          title="Verified"
          message="Your Field Ops account is now verified."
        />
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Welcome, Aisha! 👋
        </h1>
        <p className="text-gray-600">{getSubtitle()}</p>
      </div>

      {/* Content based on state */}
      {state === 'pending' && (
        <EmptyState showCta={false} />
      )}

      {state === 'verified_empty' && (
        <EmptyState showCta={true} onCtaClick={handleAcceptProject} />
      )}

      {state === 'verified_toast' && (
        <EmptyState showCta={true} onCtaClick={handleAcceptProject} />
      )}

      {state === 'has_assignments' && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <KpiCard
              title="Assigned Project"
              value="500"
              change="+6% this week"
              icon={Clock}
              iconColor="bg-blue-500"
            />
            <KpiCard
              title="Ongoing Milestone"
              value="80"
              change="+6% this week"
              icon={CheckCircle2}
              iconColor="bg-green-500"
            />
            <KpiCard
              title="Pending Approvals"
              value="230"
              change="+60% this week"
              icon={AlertCircle}
              iconColor="bg-orange-500"
            />
          </div>

          {/* Assigned Visits Table */}
          <AssignedVisitsTable />
        </>
      )}
    </div>
  )
}

