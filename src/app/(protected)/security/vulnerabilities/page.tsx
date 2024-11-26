import { Metadata } from 'next'
import { VulnerabilityDashboard } from '@/components/security/vulnerability-management/VulnerabilityDashboard'

export const metadata: Metadata = {
  title: 'Vulnerability Management - Compliance Guardian',
  description: 'Track and manage security vulnerabilities across your infrastructure',
}

export default function VulnerabilityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Vulnerability Management</h1>
        <p className="text-text-secondary mt-2">
          Track, assess, and remediate security vulnerabilities
        </p>
      </div>
      <VulnerabilityDashboard />
    </div>
  )
}
