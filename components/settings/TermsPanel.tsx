'use client'

export default function TermsPanel() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Terms and Conditions</h2>

      <div className="prose prose-sm max-w-none text-gray-700 space-y-4 mb-8">
        <p>
          By accessing and using Verisite's mobile applications, website, and related services (collectively, "The
          Platform"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please
          do not use The Platform.
        </p>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">1. Definitions</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Client:</strong> An individual or entity seeking construction or development services through The
              Platform.
            </li>
            <li>
              <strong>Developer:</strong> A professional or company providing construction or development services through
              The Platform.
            </li>
            <li>
              <strong>Field Ops:</strong> Field operations personnel responsible for site inspections and verification.
            </li>
            <li>
              <strong>Admin:</strong> Verisite administrators who manage The Platform and oversee transactions.
            </li>
            <li>
              <strong>Escrow:</strong> A secure payment holding service provided through The Platform.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">2. User Eligibility</h3>
          <p>To use The Platform, you must:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Be at least 18 years of age.</li>
            <li>Provide accurate and complete registration information.</li>
            <li>Use The Platform for lawful, professional, and ethical purposes only.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">3. Account Responsibilities</h3>
          <p>You are responsible for:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Maintaining the confidentiality of your account credentials.</li>
            <li>All activities that occur under your account.</li>
            <li>Reporting any unauthorized use of your account immediately.</li>
          </ul>
          <p className="mt-3">
            Verisite reserves the right to suspend or terminate accounts involved in fraud, misrepresentation, or
            violation of these terms.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">4. Project Creation and Engagement</h3>
          <p>When creating or engaging in projects:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>All project details, deliverables, milestones, and payment schedules must be clearly defined.</li>
            <li>Clients must fund projects through escrow before work begins.</li>
            <li>Developers must provide regular updates and meet agreed-upon milestones.</li>
            <li>Field operators must provide accurate and timely inspection reports.</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-200">
        <button className="px-6 py-3 border-2 border-[#0F5132] text-[#0F5132] rounded-lg font-medium hover:bg-gray-50 transition-colors">
          Disagree
        </button>
        <button className="px-6 py-3 bg-[#0F5132] text-white rounded-lg font-medium hover:bg-[#0d4228] transition-colors">
          Accept
        </button>
      </div>
    </div>
  )
}

