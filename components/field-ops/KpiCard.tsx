import { LucideIcon } from 'lucide-react'

interface KpiCardProps {
  title: string
  value: string | number
  change: string
  icon: LucideIcon
  iconColor: string
}

export default function KpiCard({ title, value, change, icon: Icon, iconColor }: KpiCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          <p className="text-sm text-green-600">{change}</p>
        </div>
        <div className={`${iconColor} rounded-full p-3 flex-shrink-0`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )
}

