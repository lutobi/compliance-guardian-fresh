import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export type Assessment = {
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

export type AssessmentControl = {
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

export type Evidence = {
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

export async function getAssessments() {
  const { data: assessments, error } = await supabase
    .from('assessments')
    .select(`
      *,
      framework:frameworks (
        id,
        name,
        version
      ),
      created_by:profiles (
        email
      )
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return assessments
}

export async function getAssessment(id: string) {
  const { data: assessment, error } = await supabase
    .from('assessments')
    .select(`
      *,
      framework:frameworks (
        id,
        name,
        version
      ),
      created_by:profiles (
        email
      ),
      controls:assessment_controls (
        id,
        control_id,
        title,
        description,
        status,
        notes,
        assigned_to:profiles (
          email
        ),
        due_date,
        completed_at,
        evidence (
          id,
          title,
          file_url,
          uploaded_by:profiles (
            email
          ),
          created_at
        )
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return assessment
}

export async function createAssessment(data: {
  name: string
  description?: string
  framework_id: string
  status: string
  start_date: string
  end_date?: string
}) {
  const { data: assessment, error } = await supabase
    .from('assessments')
    .insert([
      {
        ...data,
        created_by: supabase.auth.getUser().then((res) => res.data.user?.id),
      },
    ])
    .select()
    .single()

  if (error) throw error
  return assessment
}

export async function updateAssessment(
  id: string,
  data: Partial<Database['public']['Tables']['assessments']['Update']>
) {
  const { data: assessment, error } = await supabase
    .from('assessments')
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return assessment
}

export async function updateAssessmentControl(
  id: string,
  data: Partial<Database['public']['Tables']['assessment_controls']['Update']>
) {
  const { data: control, error } = await supabase
    .from('assessment_controls')
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return control
}

export async function uploadEvidence(formData: FormData) {
  const file = formData.get('file') as File
  const title = formData.get('title') as string
  const controlId = formData.get('controlId') as string

  // Upload file to storage
  const fileExt = file.name.split('.').pop()
  const fileName = `${crypto.randomUUID()}.${fileExt}`
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('evidence')
    .upload(fileName, file)

  if (uploadError) throw uploadError

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('evidence')
    .getPublicUrl(fileName)

  // Create evidence record
  const { data: evidence, error: evidenceError } = await supabase
    .from('evidence')
    .insert([
      {
        title,
        file_url: urlData.publicUrl,
        assessment_control_id: controlId,
        uploaded_by: supabase.auth.getUser().then((res) => res.data.user?.id),
      },
    ])
    .select()
    .single()

  if (evidenceError) throw evidenceError
  return evidence
}

export async function createAssessmentControl(data: Omit<AssessmentControl, 'id' | 'created_at' | 'updated_at'>) {
  const { data: control, error } = await supabase
    .from('assessment_controls')
    .insert(data)
    .select()
    .single()

  if (error) throw error
  return control
}

export async function deleteEvidence(id: string) {
  // Get evidence record
  const { data: evidence, error: fetchError } = await supabase
    .from('evidence')
    .select('file_url')
    .eq('id', id)
    .single()

  if (fetchError) throw fetchError

  // Delete file from storage if it exists
  if (evidence?.file_url) {
    const fileName = evidence.file_url.split('/').pop()
    if (fileName) {
      const { error: deleteFileError } = await supabase.storage
        .from('evidence')
        .remove([fileName])
      if (deleteFileError) throw deleteFileError
    }
  }

  // Delete evidence record
  const { error } = await supabase
    .from('evidence')
    .delete()
    .eq('id', id)

  if (error) throw error
}
