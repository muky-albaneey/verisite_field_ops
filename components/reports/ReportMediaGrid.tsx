'use client'

interface ReportMediaGridProps {
  items: string[]
  title: string
  type: 'image' | 'video'
}

export default function ReportMediaGrid({ items, title, type }: ReportMediaGridProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((url, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
            <img
              src={url}
              alt={`${type} ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

