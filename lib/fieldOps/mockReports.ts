export interface Report {
  id: string
  project: string
  milestone: string
  dateSubmitted: string
  status: 'approved' | 'flagged' | 'under-review'
}

export const mockReports: Report[] = [
  {
    id: 'FD-201',
    project: 'Lekki Smart Duplex',
    milestone: 'Foundation',
    dateSubmitted: 'Oct 30, 2023',
    status: 'approved',
  },
  {
    id: 'FD-202',
    project: 'Lekki Smart Duplex',
    milestone: 'Roofing',
    dateSubmitted: 'Nov 5, 2023',
    status: 'flagged',
  },
  {
    id: 'FD-203',
    project: 'Lekki Smart Duplex',
    milestone: 'Building',
    dateSubmitted: 'Nov 10, 2023',
    status: 'under-review',
  },
  {
    id: 'FD-204',
    project: 'Lekki Smart Duplex',
    milestone: 'Finishing',
    dateSubmitted: 'Nov 15, 2023',
    status: 'approved',
  },
]

export function getReportById(id: string): Report | undefined {
  return mockReports.find((report) => report.id === id)
}

