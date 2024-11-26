import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  SecurityAssessment,
  AssessmentType,
  AssessmentStatus,
  CreateAssessmentInput,
} from '@/types/security'

interface UseSecurityAssessmentOptions {
  type?: AssessmentType
  status?: AssessmentStatus
}

export function useSecurityAssessment(options: UseSecurityAssessmentOptions = {}) {
  const queryClient = useQueryClient()
  
  // Fetch assessments
  const {
    data: assessments,
    isLoading: isLoadingAssessments,
    error: assessmentsError,
  } = useQuery<SecurityAssessment[]>({
    queryKey: ['security-assessments', options.type, options.status],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (options.type) params.append('type', options.type)
      if (options.status) params.append('status', options.status)
      
      const response = await fetch(`/api/security/assessments${params.toString() ? `?${params.toString()}` : ''}`)
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to fetch assessments')
      }
      return response.json()
    },
  })

  // Create assessment
  const createAssessment = useMutation({
    mutationFn: async (input: CreateAssessmentInput) => {
      const response = await fetch('/api/security/assessments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...input,
          framework_id: input.framework_id,
          start_date: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create assessment')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['security-assessments'])
    },
  })

  return {
    assessments,
    isLoadingAssessments,
    assessmentsError,
    createAssessment,
  }
}
