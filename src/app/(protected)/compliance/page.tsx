import { Metadata } from 'next'
import { ComplianceOverviewDashboard } from '@/components/compliance/ComplianceOverviewDashboard'

export const metadata: Metadata = {
  title: 'Compliance Overview | Compliance Guardian',
  description: 'View and manage your compliance status across all frameworks.',
}

export default function CompliancePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Compliance Overview</h2>
      </div>
      <ComplianceOverviewDashboard />
    </div>
  )
}
