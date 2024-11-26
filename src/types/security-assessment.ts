export type AssessmentType = 'VULNERABILITY_SCAN' | 'PENTEST'
export type AssessmentStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
export type VulnerabilityStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'WONT_FIX'
export type VulnerabilitySeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

export interface SecurityAssessment {
  id: string
  name: string
  description: string
  type: AssessmentType
  status: AssessmentStatus
  start_date: string
  scope: string[]
  methodology: string[]
  assigned_to: string[]
  findings: Vulnerability[]
  created_at: string
  updated_at: string
}

export interface Vulnerability {
  id: string
  assessment_id: string
  title: string
  description: string
  severity: VulnerabilitySeverity
  status: VulnerabilityStatus
  remediation: string
  created_at: string
  updated_at: string
}

export interface RemediationNote {
  id: string
  vulnerabilityId: string
  note: string
  status_change?: VulnerabilityStatus
  created_by: string
  created_at: string
}

export interface AssessmentReport {
  id: string
  assessmentId: string
  executive_summary: string
  methodology_details: string
  findings_summary: {
    critical: number
    high: number
    medium: number
    low: number
    info: number
  }
  risk_rating: number
  recommendations: string[]
  generated_at: string
  generated_by: string
}

export interface ScanConfiguration {
  id: string
  name: string
  description: string
  target_urls: string[]
  excluded_urls?: string[]
  scan_frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY'
  notification_emails: string[]
  last_scan?: string
  next_scan?: string
  created_at: string
  updated_at: string
}
