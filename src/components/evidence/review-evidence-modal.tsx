'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Evidence } from '@/types/framework-data.types'

interface ReviewEvidenceModalProps {
  evidence: Evidence
  isOpen: boolean
  onClose: () => void
  onUpdateStatus: (params: {
    evidenceId: string
    status: 'pending' | 'approved' | 'rejected'
    reviewNotes?: string
  }) => Promise<void>
}

export function ReviewEvidenceModal({
  evidence,
  isOpen,
  onClose,
  onUpdateStatus,
}: ReviewEvidenceModalProps) {
  const { toast } = useToast()
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>(
    evidence.status
  )
  const [reviewNotes, setReviewNotes] = useState(evidence.review_notes || '')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsSubmitting(true)
      await onUpdateStatus({
        evidenceId: evidence.id,
        status,
        reviewNotes,
      })
      toast({
        title: 'Evidence review updated',
        description: 'The evidence status has been updated successfully.',
      })
      onClose()
    } catch (error) {
      console.error('Failed to update evidence status:', error)
      toast({
        variant: 'destructive',
        title: 'Error updating evidence status',
        description: 'There was a problem updating the evidence status. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review Evidence</DialogTitle>
          <DialogDescription>
            Review and update the status of the evidence submission.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Evidence Details</Label>
            <div className="rounded-md bg-gray-50 p-3">
              <p className="font-medium">{evidence.title}</p>
              <p className="text-sm text-gray-600">{evidence.description}</p>
              <a
                href={evidence.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-sm text-blue-600 hover:text-blue-800"
              >
                View Evidence File
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={status}
              onValueChange={(value) =>
                setStatus(value as 'pending' | 'approved' | 'rejected')
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Review Notes</Label>
            <Textarea
              id="notes"
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              placeholder="Add any notes about your review decision..."
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Status'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
