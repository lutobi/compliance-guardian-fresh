'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useFramework } from '@/hooks/useFramework'
import ControlItem from '@/components/framework/ControlItem'
import FrameworkDashboard from '@/components/framework/FrameworkDashboard'
import { Icons } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import ProgressCircle from '@/components/framework/ProgressCircle'
import { downloadAsJson, downloadAsCsv, generateProgressReport } from '@/utils/export'
import { Control } from '@/types/framework'
import { ControlStatusType } from '@/components/framework/ControlStatus'

interface SubControlStatus {
  [key: string]: {
    status: ControlStatusType;
    evidence: string[];
    lastUpdated?: string;
  }
}

// Helper function to get all sub-controls recursively
function getAllSubControls(controls: Control[]): Control[] {
  return controls.reduce((acc: Control[], control) => {
    const subControls = control.subControls || control.children || control.controls
    if (!subControls) {
      return [...acc, control]
    }
    return [...acc, ...getAllSubControls(subControls)]
  }, [])
}

// Helper function to calculate completion percentage
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

// Helper function to save state to localStorage
function saveToLocalStorage(slug: string, state: SubControlStatus) {
  try {
    localStorage.setItem(`framework-${slug}`, JSON.stringify(state))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

// Helper function to load state from localStorage
function loadFromLocalStorage(slug: string): SubControlStatus | null {
  try {
    const saved = localStorage.getItem(`framework-${slug}`)
    return saved ? JSON.parse(saved) : null
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return null
  }
}

export default function FrameworkPage() {
  const router = useRouter()
  const { slug } = useParams()
  const { framework, isLoading, error } = useFramework(slug as string)
  const [subControlStatuses, setSubControlStatuses] = useState<SubControlStatus>({})
  const [expandedControls, setExpandedControls] = useState<Set<string>>(new Set())

  // Load saved state on initial mount
  useEffect(() => {
    if (slug) {
      const savedState = loadFromLocalStorage(slug as string)
      if (savedState) {
        setSubControlStatuses(savedState)
      }
    }
  }, [slug])

  // Save state whenever it changes
  useEffect(() => {
    if (slug && Object.keys(subControlStatuses).length > 0) {
      saveToLocalStorage(slug as string, subControlStatuses)
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

  const handleSubControlStatusChange = (controlId: string, status: ControlStatusType) => {
    setSubControlStatuses(prev => ({
      ...prev,
      [controlId]: {
        status,
        evidence: prev[controlId]?.evidence || [],
        lastUpdated: new Date().toISOString()
      }
    }))
  }

  const handleSubControlEvidenceChange = (controlId: string, evidence: string[]) => {
    setSubControlStatuses(prev => ({
      ...prev,
      [controlId]: {
        status: prev[controlId]?.status || 'not_started',
        evidence,
        lastUpdated: new Date().toISOString()
      }
    }))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-pulse text-text-secondary">Loading framework...</div>
      </div>
    )
  }

  if (error || !framework) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-rose-500">Error loading framework</div>
      </div>
    )
  }

  // Get all subcontrols for accurate counting
  const allSubControls = getAllSubControls(framework.controls)
  const totalSubControls = allSubControls.length
  const completionPercentage = calculateCompletionPercentage(subControlStatuses, totalSubControls)

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-4">
          <Button
            variant="ghost"
            className="mb-4 -ml-2 text-text-secondary hover:text-text"
            onClick={() => router.push('/frameworks')}
          >
            <Icons.chevronLeft className="h-4 w-4 mr-1.5" />
            Back to Frameworks
          </Button>

          <div className="bg-surface rounded-xl p-6 shadow-sm border border-border">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-semibold text-text">{framework.name}</h1>
                <p className="mt-2 text-text-secondary">{framework.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-text-secondary">
                  <div className="flex items-center gap-2">
                    <Icons.checkCircle className="h-4 w-4" />
                    <span>{totalSubControls} Controls</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icons.timer className="h-4 w-4" />
                    <span>Last updated {new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <ProgressCircle 
                  value={completionPercentage} 
                  size="lg" 
                  variant="overview" 
                  completedCount={Object.values(subControlStatuses).filter(s => s.status === 'completed').length}
                  inProgressCount={Object.values(subControlStatuses).filter(s => s.status === 'in_progress').length}
                  totalCount={totalSubControls}
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="outline"
                  className="flex items-center gap-1.5"
                  onClick={() => downloadAsJson(framework, subControlStatuses)}
                >
                  <Icons.cloudDownload className="h-4 w-4" />
                  Export JSON
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-1.5"
                  onClick={() => downloadAsCsv(framework, subControlStatuses)}
                >
                  <Icons.fileText className="h-4 w-4" />
                  Export CSV
                </Button>
                <Button
                  variant="default"
                  className="flex items-center gap-1.5"
                  onClick={() => generateProgressReport(framework, subControlStatuses)}
                >
                  <Icons.fileCheck className="h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Framework Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-surface rounded-xl p-6 shadow-sm border border-border">
              <h2 className="text-lg font-medium text-text mb-4">Progress Overview</h2>
              <FrameworkDashboard framework={framework} statuses={subControlStatuses} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-surface rounded-xl p-6 shadow-sm border border-border">
              <h2 className="text-lg font-medium text-text mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Total Controls</span>
                  <span className="font-medium">{totalSubControls}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Completed</span>
                  <span className="font-medium text-emerald-500">
                    {Object.values(subControlStatuses).filter(s => s.status === 'completed').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">In Progress</span>
                  <span className="font-medium text-amber-500">
                    {Object.values(subControlStatuses).filter(s => s.status === 'in_progress').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Not Started</span>
                  <span className="font-medium text-rose-500">
                    {Object.values(subControlStatuses).filter(s => s.status === 'not_started').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-2">
          {framework.controls.map((control) => (
            <ControlItem
              key={control.id}
              control={control}
              subControlStatuses={subControlStatuses}
              onSubControlStatusChange={handleSubControlStatusChange}
              onSubControlEvidenceChange={handleSubControlEvidenceChange}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
