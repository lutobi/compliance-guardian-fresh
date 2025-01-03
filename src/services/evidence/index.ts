import { createClient } from '@/lib/supabase/client'
import { Evidence } from '@/types/framework-data.types'

export class EvidenceService {
  private static instance: EvidenceService
  private supabase = createClient()

  private constructor() {}

  public static getInstance(): EvidenceService {
    if (!EvidenceService.instance) {
      EvidenceService.instance = new EvidenceService()
    }
    return EvidenceService.instance
  }

  async uploadEvidence(controlId: string, data: FormData): Promise<Evidence> {
    const file = data.get('file') as File
    const title = data.get('title') as string
    const description = data.get('description') as string

    // Upload file to Supabase Storage
    const fileExt = file.name.split('.').pop()
    const fileName = `${controlId}/${Date.now()}.${fileExt}`
    const { data: uploadData, error: uploadError } = await this.supabase.storage
      .from('evidence')
      .upload(fileName, file)

    if (uploadError) {
      console.error('Error uploading file:', uploadError)
      throw new Error('Failed to upload file')
    }

    // Get the public URL for the uploaded file
    const { data: { publicUrl } } = this.supabase.storage
      .from('evidence')
      .getPublicUrl(fileName)

    // Create evidence record in the database
    const { data: evidence, error: dbError } = await this.supabase
      .from('evidence')
      .insert({
        control_id: controlId,
        title,
        description,
        file_url: publicUrl,
        file_type: fileExt,
        status: 'pending',
        metadata: {
          original_name: file.name,
          size: file.size,
          type: file.type
        }
      })
      .select()
      .single()

    if (dbError) {
      console.error('Error creating evidence record:', dbError)
      // Clean up the uploaded file if database insert fails
      await this.supabase.storage
        .from('evidence')
        .remove([fileName])
      throw new Error('Failed to create evidence record')
    }

    return evidence
  }

  async updateEvidenceStatus(
    evidenceId: string,
    status: 'pending' | 'approved' | 'rejected',
    reviewNotes?: string
  ): Promise<Evidence> {
    const { data: evidence, error } = await this.supabase
      .from('evidence')
      .update({
        status,
        review_notes: reviewNotes,
        reviewed_by: (await this.supabase.auth.getUser()).data.user?.id,
        review_date: new Date().toISOString()
      })
      .eq('id', evidenceId)
      .select()
      .single()

    if (error) {
      console.error('Error updating evidence status:', error)
      throw new Error('Failed to update evidence status')
    }

    return evidence
  }

  async deleteEvidence(evidenceId: string): Promise<void> {
    // First get the evidence record to get the file path
    const { data: evidence, error: fetchError } = await this.supabase
      .from('evidence')
      .select('file_url')
      .eq('id', evidenceId)
      .single()

    if (fetchError) {
      console.error('Error fetching evidence:', fetchError)
      throw new Error('Failed to fetch evidence')
    }

    // Extract the file path from the URL
    const fileUrl = new URL(evidence.file_url)
    const filePath = fileUrl.pathname.split('/').pop()

    if (filePath) {
      // Delete the file from storage
      const { error: storageError } = await this.supabase.storage
        .from('evidence')
        .remove([filePath])

      if (storageError) {
        console.error('Error deleting file:', storageError)
        throw new Error('Failed to delete file')
      }
    }

    // Delete the evidence record
    const { error: dbError } = await this.supabase
      .from('evidence')
      .delete()
      .eq('id', evidenceId)

    if (dbError) {
      console.error('Error deleting evidence record:', dbError)
      throw new Error('Failed to delete evidence record')
    }
  }

  async getEvidence(controlId: string): Promise<Evidence[]> {
    const { data: evidence, error } = await this.supabase
      .from('evidence')
      .select('*')
      .eq('control_id', controlId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching evidence:', error)
      throw new Error('Failed to fetch evidence')
    }

    return evidence
  }
}
