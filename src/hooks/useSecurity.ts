import { useState, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AuditLog, MFAStatus, RateLimit, AuditEventType, PaginatedResponse } from '@/types/security'

interface UseSecurityOptions {
  userId?: string
  eventType?: AuditEventType
  page?: number
  limit?: number
}

export function useSecurity(options: UseSecurityOptions = {}): {
  auditLogs: PaginatedResponse<AuditLog> | undefined
  mfaStatus: { data: MFAStatus } | undefined
  rateLimits: { data: RateLimit[] } | undefined
  isLoadingAuditLogs: boolean
  isLoadingMFA: boolean
  isLoadingRateLimits: boolean
  auditLogsError: unknown | null
  mfaError: unknown | null
  rateLimitsError: unknown | null
  enableMFA: ReturnType<typeof useMutation>
  disableMFA: ReturnType<typeof useMutation>
  resetRateLimit: ReturnType<typeof useMutation>
  pagination: {
    page: number
    limit: number
    onPageChange: (newPage: number) => void
    onLimitChange: (newLimit: number) => void
  }
} {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(options.page || 1)
  const [limit, setLimit] = useState(options.limit || 50)

  // Fetch audit logs
  const {
    data: auditLogs,
    isLoading: isLoadingAuditLogs,
    error: auditLogsError
  } = useQuery<PaginatedResponse<AuditLog>>({
    queryKey: ['auditLogs', options.userId, options.eventType, page, limit],
    queryFn: async () => {
      const params = new URLSearchParams({
        ...(options.userId && { userId: options.userId }),
        ...(options.eventType && { eventType: options.eventType }),
        page: page.toString(),
        limit: limit.toString()
      })
      const response = await fetch(`/api/security?${params}`)
      if (!response.ok) throw new Error('Failed to fetch audit logs')
      return response.json()
    }
  })

  // Fetch MFA status
  const {
    data: mfaStatus,
    isLoading: isLoadingMFA,
    error: mfaError
  } = useQuery<{ data: MFAStatus }>({
    queryKey: ['mfaStatus'],
    queryFn: async () => {
      const response = await fetch('/api/security/mfa')
      if (!response.ok) throw new Error('Failed to fetch MFA status')
      return response.json()
    }
  })

  // Fetch rate limits
  const {
    data: rateLimits,
    isLoading: isLoadingRateLimits,
    error: rateLimitsError
  } = useQuery<{ data: RateLimit[] }>({
    queryKey: ['rateLimits'],
    queryFn: async () => {
      const response = await fetch('/api/security/rate-limit')
      if (!response.ok) throw new Error('Failed to fetch rate limits')
      return response.json()
    }
  })

  // Enable MFA mutation
  const enableMFA = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/security/mfa', {
        method: 'POST'
      })
      if (!response.ok) throw new Error('Failed to enable MFA')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mfaStatus'] })
    }
  })

  // Disable MFA mutation
  const disableMFA = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/security/mfa', {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to disable MFA')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mfaStatus'] })
    }
  })

  // Reset rate limit mutation
  const resetRateLimit = useMutation({
    mutationFn: async (key: string) => {
      const response = await fetch(`/api/security/rate-limit?key=${key}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to reset rate limit')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rateLimits'] })
    }
  })

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage)
  }, [])

  const handleLimitChange = useCallback((newLimit: number) => {
    setLimit(newLimit)
    setPage(1) // Reset to first page when changing limit
  }, [])

  return {
    auditLogs,
    mfaStatus,
    rateLimits,
    isLoadingAuditLogs,
    isLoadingMFA,
    isLoadingRateLimits,
    auditLogsError,
    mfaError,
    rateLimitsError,
    enableMFA,
    disableMFA,
    resetRateLimit,
    pagination: {
      page,
      limit,
      onPageChange: handlePageChange,
      onLimitChange: handleLimitChange
    }
  }
}
