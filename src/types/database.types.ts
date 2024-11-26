export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Organization = {
  id: string
  name: string
  description: string | null
  created_at: string
  updated_at: string
}

export type UserOrganization = {
  user_id: string
  organization_id: string
  role: 'admin' | 'auditor' | 'user'
  created_at: string
}

export type Framework = {
  id: string
  name: string
  version: string | null
  description: string | null
  created_at: string
  updated_at: string
}

export type Control = {
  id: string
  framework_id: string
  control_id: string
  title: string
  description: string | null
  created_at: string
  updated_at: string
}

export type Assessment = {
  id: string
  organization_id: string
  framework_id: string
  name: string
  status: 'planned' | 'in_progress' | 'completed' | 'archived'
  start_date: string | null
  end_date: string | null
  created_at: string
  updated_at: string
}

export type ControlAssessment = {
  id: string
  assessment_id: string
  control_id: string
  status: 'not_started' | 'in_progress' | 'compliant' | 'non_compliant' | 'not_applicable'
  notes: string | null
  created_at: string
  updated_at: string
}

export type Evidence = {
  id: string
  control_assessment_id: string
  title: string
  description: string | null
  file_url: string | null
  file_type: string | null
  uploaded_by: string
  created_at: string
  updated_at: string
}

export type Task = {
  id: string
  control_assessment_id: string
  title: string
  description: string | null
  status: 'open' | 'in_progress' | 'completed' | 'blocked'
  assigned_to: string | null
  due_date: string | null
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: Organization
        Insert: Omit<Organization, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Organization, 'id' | 'created_at' | 'updated_at'>>
      }
      user_organizations: {
        Row: UserOrganization
        Insert: Omit<UserOrganization, 'created_at'>
        Update: Partial<Omit<UserOrganization, 'created_at'>>
      }
      frameworks: {
        Row: Framework
        Insert: Omit<Framework, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Framework, 'id' | 'created_at' | 'updated_at'>>
      }
      controls: {
        Row: Control
        Insert: Omit<Control, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Control, 'id' | 'created_at' | 'updated_at'>>
      }
      assessments: {
        Row: Assessment
        Insert: Omit<Assessment, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Assessment, 'id' | 'created_at' | 'updated_at'>>
      }
      control_assessments: {
        Row: ControlAssessment
        Insert: Omit<ControlAssessment, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<ControlAssessment, 'id' | 'created_at' | 'updated_at'>>
      }
      evidence: {
        Row: Evidence
        Insert: Omit<Evidence, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Evidence, 'id' | 'created_at' | 'updated_at'>>
      }
      tasks: {
        Row: Task
        Insert: Omit<Task, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Task, 'id' | 'created_at' | 'updated_at'>>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
