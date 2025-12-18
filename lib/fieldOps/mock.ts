export interface Assignment {
  id: string
  projectName: string
  milestone: string
  location: string
  assignedDate: string
  dueDate: string
  status: 'Completed' | 'Ongoing' | 'Pending'
  progressPercent: number
  coverImage: string
  imageThumbnails: string[]
  videoThumbnails: string[]
  developerName: string
  description: string
}

export interface UploadedReport {
  images: { url: string; name: string; size: number }[]
  videos: { url: string; name: string; size: number }[]
  documents: { name: string; size: number; url: string }[]
  comments: { title: string; body: string }[]
  progressPercent: number
  status: 'Ongoing' | 'Pending' | 'Completed'
  fieldObservations: string[]
  materialsNotes: string[]
}

export const mockAssignments: Assignment[] = [
  {
    id: '1',
    projectName: 'Lekki Smart Duplex',
    milestone: 'Foundation',
    location: 'Lagos',
    assignedDate: 'Oct 30,2025',
    dueDate: 'Oct 30',
    status: 'Ongoing',
    progressPercent: 65,
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    imageThumbnails: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200',
      'https://images.unsplash.com/photo-1600566753376-8c8b8b8b8b8b?w=200',
      'https://images.unsplash.com/photo-1600585153087-0b8c0b8b8b8b?w=200',
    ],
    videoThumbnails: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200',
      'https://images.unsplash.com/photo-1600566753376-8c8b8b8b8b8b?w=200',
    ],
    developerName: 'Buildmax',
    description: 'This is a modern residential development project located in the heart of Lekki, Lagos. The project features state-of-the-art duplex designs with premium finishes and modern amenities. The development aims to provide comfortable and luxurious living spaces for families seeking quality housing in a prime location.',
  },
  {
    id: '2',
    projectName: 'Lekki Smart Duplex',
    milestone: 'Foundation',
    location: 'Lagos',
    assignedDate: 'Oct 30,2025',
    dueDate: 'Oct 30',
    status: 'Completed',
    progressPercent: 100,
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    imageThumbnails: [],
    videoThumbnails: [],
    developerName: 'Buildmax',
    description: 'Modern residential development project.',
  },
  {
    id: '3',
    projectName: 'Lekki Smart Duplex',
    milestone: 'Foundation',
    location: 'Lagos',
    assignedDate: 'Oct 30,2025',
    dueDate: 'Oct 30',
    status: 'Pending',
    progressPercent: 0,
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    imageThumbnails: [],
    videoThumbnails: [],
    developerName: 'Buildmax',
    description: 'Modern residential development project.',
  },
  {
    id: '4',
    projectName: 'Lekki Smart Duplex',
    milestone: 'Foundation',
    location: 'Lagos',
    assignedDate: 'Oct 30,2025',
    dueDate: 'Oct 30',
    status: 'Completed',
    progressPercent: 100,
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    imageThumbnails: [],
    videoThumbnails: [],
    developerName: 'Buildmax',
    description: 'Modern residential development project.',
  },
  {
    id: '5',
    projectName: 'Lekki Smart Duplex',
    milestone: 'Foundation',
    location: 'Lagos',
    assignedDate: 'Oct 30,2025',
    dueDate: 'Oct 30',
    status: 'Ongoing',
    progressPercent: 45,
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    imageThumbnails: [],
    videoThumbnails: [],
    developerName: 'Buildmax',
    description: 'Modern residential development project.',
  },
  {
    id: '6',
    projectName: 'Lekki Smart Duplex',
    milestone: 'Foundation',
    location: 'Lagos',
    assignedDate: 'Oct 30,2025',
    dueDate: 'Oct 30',
    status: 'Pending',
    progressPercent: 0,
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    imageThumbnails: [],
    videoThumbnails: [],
    developerName: 'Buildmax',
    description: 'Modern residential development project.',
  },
  {
    id: '7',
    projectName: 'Lekki Smart Duplex',
    milestone: 'Foundation',
    location: 'Lagos',
    assignedDate: 'Oct 30,2025',
    dueDate: 'Oct 30',
    status: 'Completed',
    progressPercent: 100,
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    imageThumbnails: [],
    videoThumbnails: [],
    developerName: 'Buildmax',
    description: 'Modern residential development project.',
  },
]

export const mockUploadedReport: UploadedReport = {
  images: [
    { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400', name: 'image1.jpg', size: 305 },
    { url: 'https://images.unsplash.com/photo-1600566753376-8c8b8b8b8b8b?w=400', name: 'image2.jpg', size: 270 },
    { url: 'https://images.unsplash.com/photo-1600585153087-0b8c0b8b8b8b?w=400', name: 'image3.jpg', size: 100 },
  ],
  videos: [
    { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400', name: 'video1.mp4', size: 305 },
    { url: 'https://images.unsplash.com/photo-1600566753376-8c8b8b8b8b8b?w=400', name: 'video2.mp4', size: 270 },
    { url: 'https://images.unsplash.com/photo-1600585153087-0b8c0b8b8b8b?w=400', name: 'video3.mp4', size: 100 },
  ],
  documents: [
    { name: 'Foundation test results.pdf', size: 1500, url: '#' },
  ],
  comments: [
    { title: 'Foundation casting completed', body: 'Foundation casting completed, waiting for approval.' },
    { title: 'Other comments', body: 'Other creative project two different for to call by.' },
  ],
  progressPercent: 85,
  status: 'Ongoing',
  fieldObservations: ['Foundation casting completed, waiting for approval.'],
  materialsNotes: [],
}

export function getAssignmentById(id: string): Assignment | undefined {
  return mockAssignments.find((a) => a.id === id)
}

export function getUploadedReport(): UploadedReport {
  return mockUploadedReport
}

