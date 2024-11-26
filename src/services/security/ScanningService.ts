import { spawn } from 'child_process'
import path from 'path'
import fs from 'fs/promises'

export interface ScanTarget {
  type: 'web' | 'api' | 'mobile' | 'network'
  target: string // URL, IP, or app identifier
  options?: {
    auth?: {
      type: 'basic' | 'bearer' | 'apiKey'
      credentials: string
    }
    scope?: string[]
    excludePaths?: string[]
    maxDepth?: number
    rateLimit?: number
  }
}

export interface ScanResult {
  id: string
  timestamp: string
  target: ScanTarget
  findings: {
    id: string
    type: string
    severity: 'critical' | 'high' | 'medium' | 'low' | 'info'
    title: string
    description: string
    evidence?: string
    remediation?: string
    cvss?: number
    cwe?: string
  }[]
  summary: {
    totalVulnerabilities: number
    criticalCount: number
    highCount: number
    mediumCount: number
    lowCount: number
    infoCount: number
  }
  rawOutput: string
}

export class SecurityScanningService {
  private readonly outputDir: string
  private readonly toolsDir: string

  constructor() {
    this.outputDir = path.join(process.cwd(), 'scan-results')
    this.toolsDir = path.join(process.cwd(), 'security-tools')
    this.initializeDirs()
  }

  private async initializeDirs() {
    await fs.mkdir(this.outputDir, { recursive: true })
    await fs.mkdir(this.toolsDir, { recursive: true })
  }

  async scanWeb(target: ScanTarget): Promise<ScanResult> {
    // Use ZAP (OWASP Zed Attack Proxy) for web scanning
    const outputFile = path.join(this.outputDir, `web-scan-${Date.now()}.json`)
    
    return new Promise((resolve, reject) => {
      const zap = spawn('zap-cli', [
        '--zap-path', path.join(this.toolsDir, 'zap'),
        'quick-scan',
        '--self-contained',
        '--spider',
        '--ajax-spider',
        '--recursive',
        target.target,
        '--format', 'json',
        '--output', outputFile
      ])

      let output = ''
      zap.stdout.on('data', (data) => {
        output += data
      })

      zap.stderr.on('data', (data) => {
        console.error(`ZAP Error: ${data}`)
      })

      zap.on('close', async (code) => {
        if (code !== 0) {
          reject(new Error(`ZAP scan failed with code ${code}`))
          return
        }

        try {
          const results = await fs.readFile(outputFile, 'utf-8')
          const parsed = JSON.parse(results)
          resolve(this.formatZAPResults(parsed, target))
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  async scanAPI(target: ScanTarget): Promise<ScanResult> {
    const outputFile = path.join(this.outputDir, `api-scan-${Date.now()}.json`)
    
    return new Promise((resolve, reject) => {
      // Use Dredd for API contract testing
      const dredd = spawn('dredd', [
        target.target, // API specification file (OpenAPI/Swagger)
        '--output', outputFile,
        '--reporter', 'json'
      ])

      let output = ''
      dredd.stdout.on('data', (data) => {
        output += data
      })

      dredd.stderr.on('data', (data) => {
        console.error(`Dredd Error: ${data}`)
      })

      dredd.on('close', async (code) => {
        if (code !== 0) {
          reject(new Error(`API scan failed with code ${code}`))
          return
        }

        try {
          const results = await fs.readFile(outputFile, 'utf-8')
          resolve(this.formatDreddResults(JSON.parse(results), target))
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  async scanMobile(target: ScanTarget): Promise<ScanResult> {
    const outputFile = path.join(this.outputDir, `mobile-scan-${Date.now()}.json`)
    
    return new Promise((resolve, reject) => {
      // Use MobSF for mobile app scanning
      const mobsf = spawn(path.join(this.toolsDir, 'mobsf', 'run.sh'), [
        '--json',
        '--output', outputFile,
        target.target // Path to mobile app binary
      ])

      let output = ''
      mobsf.stdout.on('data', (data) => {
        output += data
      })

      mobsf.stderr.on('data', (data) => {
        console.error(`MobSF Error: ${data}`)
      })

      mobsf.on('close', async (code) => {
        if (code !== 0) {
          reject(new Error(`Mobile scan failed with code ${code}`))
          return
        }

        try {
          const results = await fs.readFile(outputFile, 'utf-8')
          resolve(this.formatMobSFResults(JSON.parse(results), target))
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  async scanNetwork(target: ScanTarget): Promise<ScanResult> {
    // Use nmap for network scanning
    const outputFile = path.join(this.outputDir, `network-scan-${Date.now()}.json`)
    
    return new Promise((resolve, reject) => {
      const nmap = spawn('nmap', [
        '-sV', // Version detection
        '-sC', // Default script scan
        '-oX', outputFile,
        target.target
      ])

      let output = ''
      nmap.stdout.on('data', (data) => {
        output += data
      })

      nmap.stderr.on('data', (data) => {
        console.error(`Nmap Error: ${data}`)
      })

      nmap.on('close', async (code) => {
        if (code !== 0) {
          reject(new Error(`Nmap scan failed with code ${code}`))
          return
        }

        try {
          const results = await fs.readFile(outputFile, 'utf-8')
          resolve(this.formatNmapResults(results, target))
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  private formatZAPResults(results: any, target: ScanTarget): ScanResult {
    // Format ZAP results into standardized ScanResult format
    const findings = results.alerts.map((alert: any) => ({
      id: alert.pluginId,
      type: alert.name,
      severity: this.mapZAPSeverity(alert.risk),
      title: alert.name,
      description: alert.description,
      evidence: alert.evidence,
      remediation: alert.solution,
      cvss: alert.cvssScore,
      cwe: alert.cweid
    }))

    return {
      id: `web-scan-${Date.now()}`,
      timestamp: new Date().toISOString(),
      target,
      findings,
      summary: this.calculateSummary(findings),
      rawOutput: JSON.stringify(results)
    }
  }

  private formatNmapResults(results: string, target: ScanTarget): ScanResult {
    // Format nmap results into standardized ScanResult format
    const findings: ScanResult['findings'] = []
    // Parse XML results and convert to findings
    
    return {
      id: `network-scan-${Date.now()}`,
      timestamp: new Date().toISOString(),
      target,
      findings,
      summary: this.calculateSummary(findings),
      rawOutput: results
    }
  }

  private formatDreddResults(results: any, target: ScanTarget): ScanResult {
    const findings = results.failures.map((failure: any) => ({
      id: `dredd-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'API Contract Violation',
      severity: 'high',
      title: failure.title,
      description: failure.message,
      evidence: JSON.stringify(failure.request),
      remediation: 'Update API implementation to match the specification',
    }))

    return {
      id: `api-scan-${Date.now()}`,
      timestamp: new Date().toISOString(),
      target,
      findings,
      summary: this.calculateSummary(findings),
      rawOutput: JSON.stringify(results)
    }
  }

  private formatMobSFResults(results: any, target: ScanTarget): ScanResult {
    const findings = []
    
    // Process security findings
    if (results.security_analysis) {
      for (const category in results.security_analysis) {
        const issues = results.security_analysis[category]
        issues.forEach((issue: any) => {
          findings.push({
            id: `mobsf-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type: category,
            severity: this.mapMobSFSeverity(issue.severity),
            title: issue.title,
            description: issue.description,
            evidence: issue.evidence,
            remediation: issue.remediation,
            cvss: issue.cvss,
            cwe: issue.cwe
          })
        })
      }
    }

    return {
      id: `mobile-scan-${Date.now()}`,
      timestamp: new Date().toISOString(),
      target,
      findings,
      summary: this.calculateSummary(findings),
      rawOutput: JSON.stringify(results)
    }
  }

  private mapZAPSeverity(risk: string): ScanResult['findings'][0]['severity'] {
    switch (risk.toLowerCase()) {
      case 'high': return 'high'
      case 'medium': return 'medium'
      case 'low': return 'low'
      case 'informational': return 'info'
      default: return 'info'
    }
  }

  private mapMobSFSeverity(severity: string): ScanResult['findings'][0]['severity'] {
    switch (severity.toLowerCase()) {
      case 'critical': return 'critical'
      case 'high': return 'high'
      case 'medium': return 'medium'
      case 'low': return 'low'
      case 'info': return 'info'
      default: return 'info'
    }
  }

  private calculateSummary(findings: ScanResult['findings']) {
    return {
      totalVulnerabilities: findings.length,
      criticalCount: findings.filter(f => f.severity === 'critical').length,
      highCount: findings.filter(f => f.severity === 'high').length,
      mediumCount: findings.filter(f => f.severity === 'medium').length,
      lowCount: findings.filter(f => f.severity === 'low').length,
      infoCount: findings.filter(f => f.severity === 'info').length
    }
  }
}
