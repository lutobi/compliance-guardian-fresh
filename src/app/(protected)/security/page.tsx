import SecurityDashboard from '@/components/security/SecurityDashboard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security Overview - Compliance Guardian',
  description: 'Monitor and manage your organization\'s security posture',
}

export default function SecurityPage() {
  return (
    <div className="py-6">
      <SecurityDashboard />
    </div>
  )
}
