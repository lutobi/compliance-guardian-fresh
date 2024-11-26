import { Metadata } from 'next'
import { SecurityControlsDashboard } from '@/components/security/controls/SecurityControlsDashboard'

export const metadata: Metadata = {
  title: 'Security Controls - Compliance Guardian',
  description: 'Implement and monitor security controls and compliance requirements',
}

export default function SecurityControlsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Security Controls</h1>
        <p className="text-text-secondary mt-2">
          Manage and monitor security controls implementation
        </p>
      </div>
      <SecurityControlsDashboard />
    </div>
  )
}
