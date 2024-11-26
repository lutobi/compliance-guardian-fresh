export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      assessment_controls: {
        Row: {
          id: string
          assessment_id: string
          control_id: string
          status: 'not_started' | 'in_progress' | 'implemented' | 'not_applicable' | 'not_compliant'
          notes: string | null
          assigned_to: string | null
          due_date: string | null
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          assessment_id: string
          control_id: string
          status?: 'not_started' | 'in_progress' | 'implemented' | 'not_applicable' | 'not_compliant'
          notes?: string | null
          assigned_to?: string | null
          due_date?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          assessment_id?: string
          control_id?: string
          status?: 'not_started' | 'in_progress' | 'implemented' | 'not_applicable' | 'not_compliant'
          notes?: string | null
          assigned_to?: string | null
          due_date?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      assessments: {
        Row: {
          id: string
          name: string
          description: string | null
          framework_id: string
          start_date: string
          end_date: string | null
          status: 'planned' | 'in_progress' | 'completed' | 'archived'
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          framework_id: string
          start_date?: string
          end_date?: string | null
          status?: 'planned' | 'in_progress' | 'completed' | 'archived'
          created_by?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          framework_id?: string
          start_date?: string
          end_date?: string | null
          status?: 'planned' | 'in_progress' | 'completed' | 'archived'
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      controls: {
        Row: {
          id: string
          framework_id: string
          parent_control_id: string | null
          control_id: string
          title: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          framework_id: string
          parent_control_id?: string | null
          control_id: string
          title: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          framework_id?: string
          parent_control_id?: string | null
          control_id?: string
          title?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      evidence: {
        Row: {
          id: string
          assessment_control_id: string
          title: string
          description: string | null
          file_url: string | null
          file_type: string | null
          uploaded_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          assessment_control_id: string
          title: string
          description?: string | null
          file_url?: string | null
          file_type?: string | null
          uploaded_by?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          assessment_control_id?: string
          title?: string
          description?: string | null
          file_url?: string | null
          file_type?: string | null
          uploaded_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      frameworks: {
        Row: {
          id: string
          name: string
          version: string
          description: string | null
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          version: string
          description?: string | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          version?: string
          description?: string | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
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
