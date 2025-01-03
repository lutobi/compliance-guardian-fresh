'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

const evidenceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  file: z.instanceof(File).refine((file) => file.size <= 10 * 1024 * 1024, {
    message: 'File size must be less than 10MB',
  }),
})

type EvidenceFormData = z.infer<typeof evidenceSchema>

interface UploadEvidenceModalProps {
  controlId: string
  isOpen: boolean
  onClose: () => void
  onUpload: (controlId: string, data: FormData) => Promise<void>
}

export function UploadEvidenceModal({
  controlId,
  isOpen,
  onClose,
  onUpload,
}: UploadEvidenceModalProps) {
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EvidenceFormData>({
    resolver: zodResolver(evidenceSchema),
  })

  const onSubmit = async (data: EvidenceFormData) => {
    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('description', data.description)
      formData.append('file', data.file)

      await onUpload(controlId, formData)
      
      toast({
        title: 'Evidence uploaded successfully',
        description: 'Your evidence has been uploaded and is now pending review.',
      })
      
      reset()
      onClose()
    } catch (error) {
      console.error('Failed to upload evidence:', error)
      toast({
        variant: 'destructive',
        title: 'Error uploading evidence',
        description: 'There was a problem uploading your evidence. Please try again.',
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Evidence</DialogTitle>
          <DialogDescription>
            Upload evidence to support the implementation of this control.
            Supported file types: PDF, DOC, DOCX, XLS, XLSX, PNG, JPG, JPEG.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Evidence title"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Describe what this evidence demonstrates..."
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">File</Label>
            <Input
              id="file"
              type="file"
              {...register('file')}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
            />
            {errors.file && (
              <p className="text-sm text-red-500">{errors.file.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Upload Evidence'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
