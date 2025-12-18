'use client'

import { Check } from 'lucide-react'

interface PasswordRulesProps {
  password: string
}

interface Rule {
  label: string
  met: boolean
}

export default function PasswordRules({ password }: PasswordRulesProps) {
  const rules: Rule[] = [
    {
      label: 'At least 8 characters',
      met: password.length >= 8,
    },
    {
      label: 'At least one uppercase letter',
      met: /[A-Z]/.test(password),
    },
    {
      label: 'At least one number',
      met: /[0-9]/.test(password),
    },
    {
      label: 'At least one symbol',
      met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ]

  return (
    <div className="space-y-2 mt-4">
      {rules.map((rule, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className={`
              w-5 h-5 rounded flex items-center justify-center transition-colors
              ${rule.met ? 'bg-green-500' : 'bg-gray-200'}
            `}
          >
            {rule.met && <Check className="w-3 h-3 text-white" />}
          </div>
          <span className={`text-sm ${rule.met ? 'text-gray-900' : 'text-gray-500'}`}>
            {rule.label}
          </span>
        </div>
      ))}
    </div>
  )
}

