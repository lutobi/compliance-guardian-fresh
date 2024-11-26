import { useState, useEffect } from 'react'
import { Framework } from '@/types/framework'
import { frameworks } from '@/data/frameworks'

export function useFramework(slug: string) {
  const [framework, setFramework] = useState<Framework | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchFramework = async () => {
      try {
        // First try to find the framework directly from the data
        const frameworkData = frameworks.find(f => f.id === slug)
        if (frameworkData) {
          setFramework(frameworkData)
          setError(null)
          return
        }

        // If not found in data, try the API
        const response = await fetch(`/api/frameworks/${slug}`)
        if (!response.ok) {
          throw new Error('Failed to fetch framework')
        }
        const data = await response.json()
        setFramework(data)
        setError(null)
      } catch (err) {
        setError(err as Error)
        console.error('Error fetching framework:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFramework()
  }, [slug])

  return { framework, isLoading, error }
}
