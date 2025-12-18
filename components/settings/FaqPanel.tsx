'use client'

import Accordion from '@/components/ui/Accordion'

const faqItems = [
  {
    id: 'money-location',
    question: 'Where does my money go after I pay?',
    answer:
      'Your payment is held securely in escrow until the project milestones are verified and approved. Once approved, the funds are released to the developer. If milestones are not met, you can request a refund through our dispute resolution process.',
  },
  {
    id: 'developer-payment',
    question: 'When does the Developer get paid?',
    answer:
      'Developers receive payment only after completing and delivering agreed-upon milestones. Each milestone must be verified by our field operations team and approved by you before payment is released from escrow.',
  },
  {
    id: 'late-completion',
    question: "What if the Developer doesn't finish on time?",
    answer:
      'If a developer fails to meet project deadlines, you can extend the timeline through mutual agreement or terminate the project. In case of termination, completed work is evaluated, and appropriate refunds are processed based on the work completed and milestones achieved.',
  },
  {
    id: 'currencies',
    question: 'What currencies are supported?',
    answer:
      'Currently, Verisite supports multiple currencies including NGN (Nigerian Naira), USD (US Dollar), GBP (British Pound), and EUR (Euro). Currency support may vary by region. All transactions are processed securely through our payment partners.',
  },
]

export default function FaqPanel() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">FAQ's</h2>
        <p className="text-gray-600">Where to here to answer all your questions.</p>
      </div>

      <Accordion items={faqItems} />

      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-gray-700 mb-4">Got any more questions?</p>
        <button className="px-6 py-3 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors">
          Get in touch
        </button>
      </div>
    </div>
  )
}

