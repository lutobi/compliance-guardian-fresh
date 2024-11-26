export type AssessmentStatus = 'not_started' | 'in_progress' | 'completed' | 'overdue'

export interface Assessment {
  id: string
  name: string
  description?: string
  framework_id: string
  organization_id: string
  status: AssessmentStatus
  due_date?: string
  assigned_to?: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface AssessmentEvidence {
  id: string
  assessment_id: string
  control_id: string
  file_url: string
  file_name: string
  file_type: string
  uploaded_by: string
  uploaded_at: string
}

export interface AssessmentComment {
  id: string
  assessment_id: string
  control_id: string
  content: string
  created_by: string
  created_at: string
  updated_at: string
}
