'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ShieldCheckIcon,
  BugAntIcon,
  ShieldExclamationIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline'

const securityFeatures = [
  {
    name: 'Penetration Testing',
    description: 'Comprehensive security testing across web, API, mobile, and network targets',
    icon: ShieldCheckIcon,
    href: '/security/penetration-testing',
    stats: {
      label: 'Recent Scans',
      value: '24',
      trend: 'up',
    },
  },
  {
    name: 'Vulnerability Management',
    description: 'Track and manage security vulnerabilities across your infrastructure',
    icon: BugAntIcon,
    href: '/security/vulnerabilities',
    stats: {
      label: 'Open Issues',
      value: '12',
      trend: 'down',
    },
  },
  {
    name: 'Security Controls',
    description: 'Implement and monitor security controls and compliance requirements',
    icon: ClipboardDocumentCheckIcon,
    href: '/security/controls',
    stats: {
      label: 'Controls',
      value: '156',
      trend: 'up',
    },
  },
  {
    name: 'Security Audit',
    description: 'Review security configurations and maintain audit trails',
    icon: ShieldExclamationIcon,
    href: '/security/audit',
    stats: {
      label: 'Audit Score',
      value: '94%',
      trend: 'up',
    },
  },
]

export default function SecurityDashboard() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Security Overview</h1>
        <p className="text-text-secondary mt-2">
          Manage and monitor your organization's security posture
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {securityFeatures.map((feature) => (
          <Card key={feature.name} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>{feature.name}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-text-secondary">{feature.stats.label}</p>
                  <p className="text-2xl font-bold">{feature.stats.value}</p>
                </div>
                <Button onClick={() => router.push(feature.href)}>
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Security Events</CardTitle>
            <CardDescription>Last 7 days of security activity</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Add SecurityEventsList component here */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Metrics</CardTitle>
            <CardDescription>Key security performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Add SecurityMetrics component here */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
