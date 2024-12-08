import { supabase } from '@/lib/supabase'

// Mock data for testing
const mockEvidenceCounts: Record<string, number> = {
  'A.5': 3,
  'A.5.1': 2,
  'A.5.2': 5,
  'A.5.3': 1,
  'A.5.4': 4,
  'A.5.5': 2,
  'A.6': 3,
  'A.6.1': 1,
  'A.8': 4,
  'A.8.1': 2,
  'A.11': 3,
  'A.14': 2,
  'A.16': 4,
  'A.18': 1
}

// Return evidence count immediately without async
export function getEvidenceCount(controlId: string): number {
  if (!controlId) return 0
  console.log('Getting evidence count for:', controlId)
  return mockEvidenceCounts[controlId] || 0
}

// Return evidence counts immediately without async
export function getEvidenceCountsForControls(controlIds: string[]): Record<string, number> {
  if (!Array.isArray(controlIds)) return {}
  
  console.log('Getting evidence counts for:', controlIds)
  
  const counts: Record<string, number> = {}
  controlIds.forEach(id => {
    if (id && mockEvidenceCounts[id]) {
      counts[id] = mockEvidenceCounts[id]
    }
  })
  
  console.log('Returning counts:', counts)
  return counts
}
