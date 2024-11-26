import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'

interface DashboardData {
  activeControls: number
  completedControls: number
  criticalIssues: number
  overallProgress: number
  frameworkProgress: Array<{
    id: string
    name: string
    progress: number
  }>
  upcomingTasks: Array<{
    id: string
    title: string
    status: string
    due_date: string
  }>
}

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        // Get controls data with framework names
        const { data: controls, error: controlsError } = await supabase
          .from('controls')
          .select(`
            id,
            framework_id,
            control_id,
            title,
            status,
            implementation_status,
            frameworks!inner (
              name
            )
          `)

        if (controlsError) {
          throw new Error(`Controls error: ${controlsError.message}`)
        }
        if (!controls) throw new Error('No controls data returned')

        // Get tasks data
        const { data: upcomingTasks, error: tasksError } = await supabase
          .from('tasks')
          .select('*')
          .order('due_date', { ascending: true })
          .limit(5)

        if (tasksError) {
          throw new Error(`Tasks error: ${tasksError.message}`)
        }
        if (!upcomingTasks) throw new Error('No tasks data returned')

        // Calculate statistics
        const activeControls = controls.filter(c => c.status === 'in_progress').length
        const completedControls = controls.filter(c => c.status === 'completed').length
        const criticalIssues = controls.filter(c => c.status === 'failed').length
        const totalControls = controls.length
        const overallProgress = totalControls > 0 
          ? Math.round((completedControls / totalControls) * 100)
          : 0

        // Calculate framework progress
        const frameworksMap = new Map()
        controls.forEach(control => {
          const framework = control.frameworks
          if (!frameworksMap.has(framework.id)) {
            frameworksMap.set(framework.id, {
              id: framework.id,
              name: framework.name,
              totalControls: 0,
              completedControls: 0
            })
          }
          const fw = frameworksMap.get(framework.id)
          fw.totalControls++
          if (control.status === 'completed') {
            fw.completedControls++
          }
        })

        const frameworkProgress = Array.from(frameworksMap.values()).map(fw => ({
          id: fw.id,
          name: fw.name,
          progress: Math.round((fw.completedControls / fw.totalControls) * 100)
        }))

        if (isMounted) {
          setData({
            activeControls,
            completedControls,
            criticalIssues,
            overallProgress,
            frameworkProgress,
            upcomingTasks
          })
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('An unexpected error occurred'))
          setData(null)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [supabase])

  return { data, error, isLoading }
}
