'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useFramework } from '@/hooks/useFramework'
import { Icons } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { downloadAsJson, downloadAsCsv, generateProgressReport } from '@/utils/export'
import { Control } from '@/types/framework'
import { type ControlStatusType } from '@/components/framework/ControlStatus'
import dynamic from 'next/dynamic'

const FrameworkDashboard = dynamic(
  () => import('@/components/framework/FrameworkDashboard').then(mod => mod.default),
  { 
    ssr: false,
    loading: () => <div>Loading dashboard...</div>
  }
)

const ControlItem = dynamic(
  () => import('@/components/framework/ControlItem').then(mod => mod.default),
  { 
    ssr: false,
    loading: () => <div>Loading control...</div>
  }
)

export default function FrameworkClient() {
  const router = useRouter()
  const params = useParams()
  const slug = typeof params?.slug === 'string' ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : ''
  const { framework, isLoading, error } = useFramework(slug)
  const [subControlStatuses, setSubControlStatuses] = useState<SubControlStatus>({})
  const [expandedControls, setExpandedControls] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (slug) {
      const savedState = loadFromLocalStorage(slug)
      if (savedState) {
        setSubControlStatuses(savedState)
      }
    }
  }, [slug])

  useEffect(() => {
    if (slug && Object.keys(subControlStatuses).length > 0) {
      saveToLocalStorage(slug, subControlStatuses)
    }
  }, [subControlStatuses, slug])

  const toggleControl = (controlId: string) => {
    setExpandedControls(prev => {
      const newSet = new Set(prev)
      if (newSet.has(controlId)) {
        newSet.delete(controlId)
      } else {
        newSet.add(controlId)
      }
      return newSet
    })
  }

  const updateControlStatus = (controlId: string, status: ControlStatusType, evidence: string[] = []) => {
    setSubControlStatuses(prev => ({
      ...prev,
      [controlId]: {
        status,
        evidence,
        lastUpdated: new Date().toISOString()
      }
    }))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icons.spinner className="h-8 w-8 animate-spin text-text-secondary" />
      </div>
    )
  }

  if (error || !framework) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Icons.warning className="h-12 w-12 text-rose-500" />
        <h1 className="text-xl font-semibold text-text">Framework Not Found</h1>
        <p className="text-text-secondary">The framework you're looking for doesn't exist or there was an error loading it.</p>
        <Button onClick={() => router.push('/frameworks')}>
          Go Back to Frameworks
        </Button>
      </div>
    )
  }

  const handleExport = async (format: 'json' | 'csv' | 'report') => {
    const data = {
      framework,
      statuses: subControlStatuses,
      exportDate: new Date().toISOString()
    }

    switch (format) {
      case 'json':
        await downloadAsJson(data, `${framework.name}-export`)
        break
      case 'csv':
        await downloadAsCsv(data, `${framework.name}-export`)
        break
      case 'report':
        await generateProgressReport(data, `${framework.name}-report`)
        break
    }
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-text">{framework.name}</h1>
            <p className="text-text-secondary mt-1">{framework.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => handleExport('json')}>
              <Icons.download className="h-4 w-4 mr-2" />
              Export JSON
            </Button>
            <Button variant="outline" onClick={() => handleExport('csv')}>
              <Icons.download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={() => handleExport('report')}>
              <Icons.download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
        <FrameworkDashboard framework={framework} statuses={subControlStatuses} />
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {framework.controls.map(control => (
          <ControlItem
            key={control.id}
            control={control}
            expanded={expandedControls.has(control.id)}
            onToggle={() => toggleControl(control.id)}
            status={subControlStatuses[control.id]?.status}
            evidence={subControlStatuses[control.id]?.evidence || []}
            onStatusChange={(status, evidence) => updateControlStatus(control.id, status, evidence)}
          />
        ))}
      </div>
    </div>
  )
}

// Helper functions
function getAllSubControls(controls: Control[]): Control[] {
  return controls.reduce((acc: Control[], control) => {
    const subControls = control.subControls || control.children || control.controls
    if (!subControls) {
      return [...acc, control]
    }
    return [...acc, ...getAllSubControls(subControls)]
  }, [])
}

function calculateCompletionPercentage(subControlStatuses: SubControlStatus, totalControls: number): number {
  if (totalControls === 0) return 0
  
  const completedControls = Object.values(subControlStatuses).filter(
    status => status.status === 'completed'
  ).length
  const inProgressControls = Object.values(subControlStatuses).filter(
    status => status.status === 'in_progress'
  ).length
  
  // Calculate weighted percentage: completed = 100%, in_progress = 50%
  const weightedProgress = (completedControls * 100 + inProgressControls * 50) / totalControls
  
  return Math.round(weightedProgress)
}

function saveToLocalStorage(slug: string, state: SubControlStatus) {
  try {
    localStorage.setItem(`framework-${slug}`, JSON.stringify(state))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

function loadFromLocalStorage(slug: string): SubControlStatus | null {
  try {
    const saved = localStorage.getItem(`framework-${slug}`)
    return saved ? JSON.parse(saved) : null
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return null
  }
}
