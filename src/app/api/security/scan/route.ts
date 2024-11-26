import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { SecurityScanningService, ScanTarget } from '@/services/security/ScanningService'

const scanningService = new SecurityScanningService()

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const body = await request.json()
    const target: ScanTarget = body.target

    // Validate target
    if (!target || !target.type || !target.target) {
      return NextResponse.json(
        { error: 'Invalid target configuration' },
        { status: 400 }
      )
    }

    // Start scan based on target type
    let scanResult
    switch (target.type) {
      case 'web':
        scanResult = await scanningService.scanWeb(target)
        break
      case 'api':
        scanResult = await scanningService.scanAPI(target)
        break
      case 'mobile':
        scanResult = await scanningService.scanMobile(target)
        break
      case 'network':
        scanResult = await scanningService.scanNetwork(target)
        break
      default:
        return NextResponse.json(
          { error: 'Unsupported scan type' },
          { status: 400 }
        )
    }

    // Store scan results in database
    const { data: assessment, error: assessmentError } = await supabase
      .from('security_assessments')
      .insert({
        name: `${target.type.toUpperCase()} Scan - ${new Date().toISOString()}`,
        description: `Automated security scan of ${target.target}`,
        type: 'VULNERABILITY_SCAN',
        status: 'COMPLETED',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        scope: [target.target],
        methodology: [`automated-${target.type}-scan`],
        assigned_to: []
      })
      .select()
      .single()

    if (assessmentError) {
      console.error('Failed to store assessment:', assessmentError)
      return NextResponse.json(
        { error: 'Failed to store assessment results' },
        { status: 500 }
      )
    }

    // Store findings
    const findings = scanResult.findings.map(finding => ({
      assessment_id: assessment.id,
      title: finding.title,
      description: finding.description,
      severity: finding.severity.toUpperCase(),
      status: 'OPEN',
      affected_components: [target.target],
      proof_of_concept: finding.evidence,
      remediation_steps: finding.remediation,
      cvss_score: finding.cvss,
      cwe_id: finding.cwe,
      discovered_at: new Date().toISOString()
    }))

    if (findings.length > 0) {
      const { error: findingsError } = await supabase
        .from('vulnerabilities')
        .insert(findings)

      if (findingsError) {
        console.error('Failed to store findings:', findingsError)
        return NextResponse.json(
          { error: 'Failed to store vulnerability findings' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({
      assessment,
      scanResult
    })
  } catch (error) {
    console.error('Error during security scan:', error)
    return NextResponse.json(
      { error: 'Failed to perform security scan' },
      { status: 500 }
    )
  }
}
