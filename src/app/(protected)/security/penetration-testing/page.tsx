'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScanConfigurationForm } from '@/components/security/penetration-testing/ScanConfigurationForm'
import { ScanResultsView } from '@/components/security/penetration-testing/ScanResultsView'
import { ScanHistory } from '@/components/security/penetration-testing/ScanHistory'
import { ScanTarget } from '@/services/security/ScanningService'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function PenetrationTestingPage() {
  const [activeTab, setActiveTab] = useState('new-scan')
  const [selectedScanId, setSelectedScanId] = useState<string | null>(null)
  const queryClient = useQueryClient()
  const supabase = createClientComponentClient()

  // Fetch scan history
  const { data: scanHistory } = useQuery({
    queryKey: ['scanHistory'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('security_assessments')
        .select('*, vulnerabilities(severity)')
        .eq('type', 'VULNERABILITY_SCAN')
        .order('created_at', { ascending: false })

      if (error) throw error

      return data.map((scan: any) => ({
        id: scan.id,
        name: scan.name,
        type: scan.methodology?.[0]?.split('-')[1]?.toUpperCase() || 'UNKNOWN',
        status: scan.status,
        start_date: scan.start_date,
        findings: scan.vulnerabilities?.length || 0,
        critical: scan.vulnerabilities?.filter((v: any) => v.severity === 'CRITICAL').length || 0,
        high: scan.vulnerabilities?.filter((v: any) => v.severity === 'HIGH').length || 0
      }))
    }
  })

  // Fetch selected scan results
  const { data: selectedScan } = useQuery({
    queryKey: ['scanResult', selectedScanId],
    queryFn: async () => {
      if (!selectedScanId) return null

      const { data: assessment, error: assessmentError } = await supabase
        .from('security_assessments')
        .select('*')
        .eq('id', selectedScanId)
        .single()

      if (assessmentError) throw assessmentError

      const { data: findings, error: findingsError } = await supabase
        .from('vulnerabilities')
        .select('*')
        .eq('assessment_id', selectedScanId)

      if (findingsError) throw findingsError

      return {
        id: assessment.id,
        timestamp: assessment.created_at,
        target: {
          type: assessment.methodology[0].split('-')[1],
          target: assessment.scope[0]
        },
        findings: findings.map((finding: any) => ({
          id: finding.id,
          type: finding.type,
          severity: finding.severity.toLowerCase(),
          title: finding.title,
          description: finding.description,
          evidence: finding.proof_of_concept,
          remediation: finding.remediation_steps,
          cvss: finding.cvss_score,
          cwe: finding.cwe_id
        })),
        summary: {
          totalVulnerabilities: findings.length,
          criticalCount: findings.filter((f: any) => f.severity === 'CRITICAL').length,
          highCount: findings.filter((f: any) => f.severity === 'HIGH').length,
          mediumCount: findings.filter((f: any) => f.severity === 'MEDIUM').length,
          lowCount: findings.filter((f: any) => f.severity === 'LOW').length,
          infoCount: findings.filter((f: any) => f.severity === 'INFO').length
        },
        rawOutput: assessment.raw_output
      }
    },
    enabled: !!selectedScanId
  })

  // Start new scan mutation
  const startScan = useMutation({
    mutationFn: async (target: ScanTarget) => {
      const response = await fetch('/api/security/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(target),
      })

      if (!response.ok) {
        throw new Error('Failed to start scan')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['scanHistory'])
      setActiveTab('history')
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Penetration Testing</h1>
        <p className="text-text-secondary mt-2">
          Configure and run security scans across your infrastructure
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="new-scan">New Scan</TabsTrigger>
          <TabsTrigger value="history">Scan History</TabsTrigger>
          {selectedScanId && <TabsTrigger value="results">Scan Results</TabsTrigger>}
        </TabsList>

        <TabsContent value="new-scan" className="space-y-4">
          <ScanConfigurationForm onSubmit={(target) => startScan.mutate(target)} />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <ScanHistory
            scans={scanHistory || []}
            onScanSelect={(scanId) => {
              setSelectedScanId(scanId)
              setActiveTab('results')
            }}
          />
        </TabsContent>

        {selectedScanId && (
          <TabsContent value="results" className="space-y-4">
            <ScanResultsView scan={selectedScan} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
