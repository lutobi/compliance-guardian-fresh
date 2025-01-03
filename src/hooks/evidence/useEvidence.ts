import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { EvidenceService } from '@/services/evidence'
import { Evidence } from '@/types/framework-data.types'

const evidenceService = EvidenceService.getInstance()

export function useEvidence(controlId: string) {
  const queryClient = useQueryClient()
  const queryKey = ['evidence', controlId]

  const { data: evidence, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => evidenceService.getEvidence(controlId),
  })

  const uploadEvidence = useMutation({
    mutationFn: (data: FormData) => evidenceService.uploadEvidence(controlId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  const updateEvidenceStatus = useMutation({
    mutationFn: ({
      evidenceId,
      status,
      reviewNotes,
    }: {
      evidenceId: string
      status: 'pending' | 'approved' | 'rejected'
      reviewNotes?: string
    }) => evidenceService.updateEvidenceStatus(evidenceId, status, reviewNotes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  const deleteEvidence = useMutation({
    mutationFn: (evidenceId: string) => evidenceService.deleteEvidence(evidenceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  return {
    evidence,
    isLoading,
    error,
    uploadEvidence,
    updateEvidenceStatus,
    deleteEvidence,
  }
}
