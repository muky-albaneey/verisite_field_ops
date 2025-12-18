'use client'

interface BadgePillProps {
  label: string
  active?: boolean
  onClick?: () => void
  count?: number
}

export default function BadgePill({ label, active = false, onClick, count }: BadgePillProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full font-medium text-sm transition-colors
        ${active ? 'bg-[#0F5132] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
      `}
    >
      {label}
      {count !== undefined && count > 0 && (
        <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">{count}</span>
      )}
    </button>
  )
}

