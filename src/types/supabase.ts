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
      frameworks: {
        Row: {
          id: string
          name: string
          version: string | null
          description: string | null
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          version?: string | null
          description?: string | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          version?: string | null
          description?: string | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      controls: {
        Row: {
          id: string
          framework_id: string
          control_id: string
          title: string
          description: string | null
          status: 'not_started' | 'in_progress' | 'completed' | 'failed'
          implementation_status: 'not_implemented' | 'partially_implemented' | 'implemented'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          framework_id: string
          control_id: string
          title: string
          description?: string | null
          status?: 'not_started' | 'in_progress' | 'completed' | 'failed'
          implementation_status?: 'not_implemented' | 'partially_implemented' | 'implemented'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          framework_id?: string
          control_id?: string
          title?: string
          description?: string | null
          status?: 'not_started' | 'in_progress' | 'completed' | 'failed'
          implementation_status?: 'not_implemented' | 'partially_implemented' | 'implemented'
          created_at?: string
          updated_at?: string
        }
      }
      subcontrols: {
        Row: {
          id: string
          control_id: string
          title: string
          description: string | null
          status: 'not_started' | 'in_progress' | 'completed' | 'failed'
          evidence: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          control_id: string
          title: string
          description?: string | null
          status?: 'not_started' | 'in_progress' | 'completed' | 'failed'
          evidence?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          control_id?: string
          title?: string
          description?: string | null
          status?: 'not_started' | 'in_progress' | 'completed' | 'failed'
          evidence?: Json
          created_at?: string
          updated_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          type: 'update' | 'issue' | 'complete' | 'evidence' | 'review'
          framework_id: string | null
          control_id: string | null
          user_id: string | null
          details: string | null
          created_at: string
        }
        Insert: {
          id?: string
          type: 'update' | 'issue' | 'complete' | 'evidence' | 'review'
          framework_id?: string | null
          control_id?: string | null
          user_id?: string | null
          details?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          type?: 'update' | 'issue' | 'complete' | 'evidence' | 'review'
          framework_id?: string | null
          control_id?: string | null
          user_id?: string | null
          details?: string | null
          created_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          due_date: string
          priority: 'low' | 'medium' | 'high'
          framework_id: string | null
          control_id: string | null
          assigned_to: string | null
          status: 'pending' | 'in_progress' | 'completed' | 'overdue'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          due_date: string
          priority?: 'low' | 'medium' | 'high'
          framework_id?: string | null
          control_id?: string | null
          assigned_to?: string | null
          status?: 'pending' | 'in_progress' | 'completed' | 'overdue'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          due_date?: string
          priority?: 'low' | 'medium' | 'high'
          framework_id?: string | null
          control_id?: string | null
          assigned_to?: string | null
          status?: 'pending' | 'in_progress' | 'completed' | 'overdue'
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
