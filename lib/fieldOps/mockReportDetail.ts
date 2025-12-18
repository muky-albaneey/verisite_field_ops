export interface ReportDetail {
  id: string
  images: string[]
  videos: string[]
  expectedCompletion: string
  status: 'completed' | 'ongoing' | 'pending'
  fieldObservations: Array<{
    text: string
    time: string
  }>
  files: Array<{
    name: string
  }>
}

export function getReportDetail(id: string): ReportDetail {
  // Generate 8 image URLs
  const images = Array.from({ length: 8 }, (_, i) => 
    `https://images.unsplash.com/photo-${1600585154340 + i}?w=200&q=80`
  )

  // Generate 8 video thumbnail URLs
  const videos = Array.from({ length: 8 }, (_, i) => 
    `https://images.unsplash.com/photo-${1600585154340 + i + 100}?w=200&q=80`
  )

  return {
    id,
    images,
    videos,
    expectedCompletion: 'November 5, 2025',
    status: 'completed',
    fieldObservations: [
      {
        text: 'Foundation casting completed, curing in progress. Reinforcements properly aligned.',
        time: '2 Min ago',
      },
      {
        text: 'Minor cracks on west wall due to early curing.',
        time: '1 Min ago',
      },
    ],
    files: [
      {
        name: 'Foundation test results.pdf',
      },
    ],
  }
}

