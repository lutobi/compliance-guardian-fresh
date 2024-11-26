'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useSecurityAssessment } from '@/hooks/useSecurityAssessment'
import { AssessmentType } from '@/types/security-assessment'
import { useToast } from '@/components/ui/use-toast'

interface CreateAssessmentFormProps {
  isOpen: boolean
  onClose: () => void
  defaultType?: AssessmentType
}

const initialFormState = {
  name: '',
  description: '',
  type: 'VULNERABILITY_SCAN' as AssessmentType,
  scope: [] as string[],
  methodology: [] as string[],
}

export function CreateAssessmentForm({
  isOpen,
  onClose,
  defaultType = 'VULNERABILITY_SCAN'
}: CreateAssessmentFormProps) {
  const { createAssessment } = useSecurityAssessment()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    ...initialFormState,
    type: defaultType,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await createAssessment.mutateAsync({
        ...formData,
        status: 'SCHEDULED',
        startDate: new Date().toISOString(),
        assignedTo: [],
      })
      
      toast({
        title: 'Success',
        description: 'Assessment created successfully',
      })
      
      setFormData({
        ...initialFormState,
        type: defaultType,
      })
      onClose()
    } catch (error) {
      console.error('Error creating assessment:', error)
      toast({
        title: 'Error',
        description: 'Failed to create assessment. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTypeChange = (value: AssessmentType) => {
    setFormData((prev) => ({ ...prev, type: value }))
  }

  const handleScopeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const scope = e.target.value.split(',').map((s) => s.trim())
    setFormData((prev) => ({ ...prev, scope }))
  }

  const handleMethodologyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const methodology = e.target.value.split(',').map((m) => m.trim())
    setFormData((prev) => ({ ...prev, methodology }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Security Assessment</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new security assessment. All fields are required unless marked optional.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={formData.type}
              onValueChange={handleTypeChange}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select assessment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VULNERABILITY_SCAN">Vulnerability Scan</SelectItem>
                <SelectItem value="PENTEST">Penetration Test</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="scope">Scope (comma-separated)</Label>
            <Input
              id="scope"
              name="scope"
              value={formData.scope.join(', ')}
              onChange={handleScopeChange}
              placeholder="api, web-app, mobile-app"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="methodology">Methodology (comma-separated)</Label>
            <Input
              id="methodology"
              name="methodology"
              value={formData.methodology.join(', ')}
              onChange={handleMethodologyChange}
              placeholder="OWASP-Top-10, SANS-Top-25"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Assessment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
