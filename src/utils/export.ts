import { Framework } from '@/types/framework'

interface ProgressExport {
  frameworkName: string
  frameworkId: string
  timestamp: string
  metrics: {
    overallProgress: number
    completedControls: number
    inProgressControls: number
    failedControls: number
    totalEvidence: number
    controlsWithEvidence: number
    missingEvidence: number
  }
  controls: {
    id: string
    name: string
    status: string
    evidence: string[]
    lastUpdated?: string
  }[]
}

export function generateProgressReport(
  framework: Framework,
  metrics: any,
  statuses: Record<string, 'completed' | 'failed' | 'pending'>,
  evidence: Record<string, string[]>
): ProgressExport {
  return {
    frameworkName: framework.name,
    frameworkId: framework.id,
    timestamp: new Date().toISOString(),
    metrics,
    controls: framework.controls.map(control => ({
      id: control.id,
      name: control.name,
      status: statuses[control.id] || 'pending',
      evidence: evidence[control.id] || [],
      lastUpdated: control.lastUpdated
    }))
  }
}

export function downloadAsJson(data: any, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function downloadAsCsv(data: ProgressExport) {
  const headers = [
    'Control ID',
    'Control Name',
    'Status',
    'Evidence Count',
    'Last Updated'
  ]

  const rows = data.controls.map(control => [
    control.id,
    control.name,
    control.status,
    control.evidence.length.toString(),
    control.lastUpdated || 'N/A'
  ])

  const csvContent = [
    `Framework: ${data.frameworkName}`,
    `Generated: ${new Date(data.timestamp).toLocaleString()}`,
    `Overall Progress: ${data.metrics.overallProgress}%`,
    '',
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${data.frameworkName.toLowerCase().replace(/\s+/g, '-')}-progress-${new Date().toISOString().split('T')[0]}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
