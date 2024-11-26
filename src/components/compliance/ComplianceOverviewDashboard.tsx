'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ComplianceMonitoringService } from '@/services/compliance/ComplianceMonitoringService'
import { ComplianceFramework } from '@/types/compliance'
import { useEffect, useState } from 'react'

export function ComplianceOverviewDashboard() {
  const [frameworks, setFrameworks] = useState<ComplianceFramework[]>([])
  const monitoringService = ComplianceMonitoringService.getInstance()

  useEffect(() => {
    const loadFrameworks = async () => {
      const frameworkIds = ['iso27001', 'soc2', 'pci-dss', 'hipaa']
      const frameworkData = await Promise.all(
        frameworkIds.map(id => monitoringService.getFrameworkStatus(id))
      )
      setFrameworks(frameworkData)
    }
    loadFrameworks()
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {frameworks.map((framework) => (
        <Card key={framework.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {framework.name}
            </CardTitle>
            <div className={`rounded-full px-2 py-1 text-xs font-semibold ${
              framework.overallStatus === 'Compliant' 
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {framework.overallStatus}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{framework.completionPercentage}%</div>
            <p className="text-xs text-muted-foreground">
              Last updated {new Date(framework.lastUpdated).toLocaleDateString()}
            </p>
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Requirements</h4>
              <div className="space-y-2">
                {framework.requirements.map((req) => (
                  <div key={req.id} className="flex items-center justify-between text-sm">
                    <span>{req.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      req.status === 'Compliant'
                        ? 'bg-green-100 text-green-800'
                        : req.status === 'Partial'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
