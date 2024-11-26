export type SecuritySeverity = 'critical' | 'high' | 'medium' | 'low' | 'info'

export type AssessmentStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
export type AssessmentType = 'PENTEST' | 'VULNERABILITY_SCAN'

export interface SecurityAssessment {
  id: string
  name: string
  description: string
  type: AssessmentType
  status: AssessmentStatus
  start_date: string
  end_date?: string
  scope: string[]
  methodology: string[]
  assigned_to: string[]
  created_at: string
  updated_at: string
}

export interface SecurityFinding {
  id: string
  title: string
  description: string
  severity: SecuritySeverity
  cvss?: number
  remediation?: string
  affectedAssets: string[]
  discoveredAt: string
  status: 'open' | 'in-progress' | 'resolved' | 'accepted'
}

export interface VulnerabilityAssessment {
  id: string
  name: string
  target: {
    hosts: string[]
    scope: string
  }
  schedule: {
    frequency: 'once' | 'daily' | 'weekly' | 'monthly' | 'quarterly'
    lastRun?: string
    nextRun?: string
  }
  status: AssessmentStatus
  findings: SecurityFinding[]
  tools: string[]
  relatedControls: string[]
}

export interface SecurityTestingState {
  securityAssessments: SecurityAssessment[]
  vulnerabilityAssessments: VulnerabilityAssessment[]
  findings: SecurityFinding[]
}

// Database Types
export type AuditEventType = 
  | 'LOGIN'
  | 'LOGOUT'
  | 'PASSWORD_CHANGE'
  | 'MFA_ENABLE'
  | 'MFA_DISABLE'
  | 'ASSESSMENT_CREATE'
  | 'ASSESSMENT_UPDATE'
  | 'ASSESSMENT_DELETE'
  | 'FINDING_CREATE'
  | 'FINDING_UPDATE'
  | 'FINDING_DELETE'

export interface AuditLog {
  id: string
  user_id: string
  event_type: AuditEventType
  event_data: Record<string, any>
  ip_address: string
  user_agent: string
  created_at: string
}

export interface MFAStatus {
  enabled: boolean
  last_verified?: string
  backup_codes?: string[]
}

export interface RateLimit {
  key: string
  count: number
  last_reset: string
  window_start: string
  window_end: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface SecurityError {
  code: string
  message: string
  details?: Record<string, any>
}
