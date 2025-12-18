'use client'

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  className?: string
}

export default function Switch({ checked, onChange, label, className = '' }: SwitchProps) {
  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      {label && <span className="mr-3 text-sm text-gray-700">{label}</span>}
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={`block w-14 h-8 rounded-full transition-colors ${
            checked ? 'bg-[#0F5132]' : 'bg-gray-300'
          }`}
        />
        <div
          className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
            checked ? 'transform translate-x-6' : ''
          }`}
        />
      </div>
    </label>
  )
}

