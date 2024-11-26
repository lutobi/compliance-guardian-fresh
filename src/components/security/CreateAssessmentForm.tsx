'use client'

import { useState, useEffect } from 'react'
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
import { useFrameworks } from '@/hooks/useFrameworks'
import { AssessmentType } from '@/types/security-assessment'
import { useToast } from '@/components/ui/use-toast'

interface CreateAssessmentFormProps {
  isOpen: boolean
  onClose: () => void
  defaultType?: AssessmentType
}

const initialFormState = {
  type: 'PENTEST',
  status: 'SCHEDULED',
  scope: [] as string[],
  methodology: [] as string[],
  assigned_to: [] as string[],
}

export function CreateAssessmentForm({
  isOpen,
  onClose,
  defaultType = 'VULNERABILITY_SCAN'
}: CreateAssessmentFormProps) {
  const { createAssessment } = useSecurityAssessment()
  const { frameworks, isLoading, selectableFrameworks, getFrameworkById } = useFrameworks()
  const { toast } = useToast()
  const [formData, setFormData] = useState<Partial<CreateAssessmentInput>>({
    ...initialFormState,
    type: defaultType,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting form data:', formData)
    
    if (!formData.framework_id) {
      toast({
        title: 'Error',
        description: 'Please select a framework',
        variant: 'destructive',
      })
      return
    }
    
    try {
      const input = {
        name: formData.name || '',
        description: formData.description || '',
        type: formData.type || 'PENTEST',
        status: formData.status || 'SCHEDULED',
        start_date: new Date().toISOString(),
        scope: formData.scope || [],
        methodology: formData.methodology || [],
        assigned_to: formData.assigned_to || [],
        framework_id: formData.framework_id,
      }
      
      console.log('Creating assessment with:', input)
      await createAssessment.mutateAsync(input)
      
      toast({
        title: 'Success',
        description: 'Assessment created successfully',
      })
      onClose()
    } catch (error) {
      console.error('Error creating assessment:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create assessment',
        variant: 'destructive',
      })
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

  const handleFrameworkChange = (value: string) => {
    console.log('Framework selected:', value)
    const framework = getFrameworkById(value)
    console.log('Found framework:', framework)
    
    if (framework) {
      setFormData((prev) => {
        const newData = { 
          ...prev, 
          framework_id: framework.id, 
          name: prev.name || `${framework.name} Assessment`
        }
        console.log('Updated form data:', newData)
        return newData
      })
    }
  }

  const handleScopeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const scope = e.target.value.split(',').map((s) => s.trim())
    setFormData((prev) => ({ ...prev, scope }))
  }

  const handleMethodologyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const methodology = e.target.value.split(',').map((m) => m.trim())
    setFormData((prev) => ({ ...prev, methodology }))
  }

  useEffect(() => {
    console.log('Current form data:', formData)
  }, [formData])

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
              value={formData.name || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ''}
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
            <Label htmlFor="framework">Framework</Label>
            <Select
              value={formData.framework_id}
              onValueChange={handleFrameworkChange}
              disabled={isLoading}
              required
            >
              <SelectTrigger id="framework" className="w-full">
                <SelectValue placeholder={isLoading ? "Loading frameworks..." : "Select a framework"} />
              </SelectTrigger>
              <SelectContent>
                {selectableFrameworks?.map((framework) => (
                  <SelectItem
                    key={framework.value}
                    value={framework.value}
                    className="flex flex-col items-start py-2"
                  >
                    <span className="font-medium">{framework.label}</span>
                    <span className="text-xs text-muted-foreground">{framework.description}</span>
                  </SelectItem>
                ))}
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
