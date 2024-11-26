'use client'

import { useMemo } from 'react'
import { Control } from '@/types/framework'
import { ControlStatusType } from './ControlStatus'
import ProgressCircle from './ProgressCircle'
import TrendChart from './TrendChart'
import AnimatedProgressBar from './AnimatedProgressBar'
import GraduatedCircleProgress from './GraduatedCircleProgress'
import { Icons } from '@/components/ui/icons'

interface SubControlStatus {
  [key: string]: {
    status: ControlStatusType
    evidence: string[]
    lastUpdated?: string
  }
}

interface Framework {
  controls: Control[]
  name: string
  description: string
}

interface FrameworkDashboardProps {
  framework: Framework
  statuses: SubControlStatus
}

export default function FrameworkDashboard({ framework, statuses }: FrameworkDashboardProps) {
  // Calculate statistics
  const stats = useMemo(() => {
    const allSubControls = framework.controls.flatMap(control => {
      const subControls = control.subControls || control.children || control.controls || []
      return subControls
    })

    const totalControls = allSubControls.length
    const completedControls = Object.values(statuses).filter(
      status => status.status === 'completed'
    ).length
    const failedControls = Object.values(statuses).filter(
      status => status.status === 'failed'
    ).length
    const pendingControls = totalControls - completedControls - failedControls

    const completionPercentage = Math.round((completedControls / totalControls) * 100) || 0
    const evidenceCount = Object.values(statuses).reduce(
      (acc, status) => acc + status.evidence.length,
      0
    )

    return {
      totalControls,
      completedControls,
      failedControls,
      pendingControls,
      completionPercentage,
      evidenceCount,
    }
  }, [framework.controls, statuses])

  return (
    <div className="space-y-6">
      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-surface/50 rounded-lg p-4 border border-border/50">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-text-secondary">Total Controls</h3>
            <Icons.fileText className="h-5 w-5 text-text-secondary" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-text">{stats.totalControls}</p>
        </div>

        <div className="bg-surface/50 rounded-lg p-4 border border-border/50">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-text-secondary">Completion Rate</h3>
            <Icons.trendingUp className="h-5 w-5 text-text-secondary" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-text">{stats.completionPercentage}%</p>
        </div>

        <div className="bg-surface/50 rounded-lg p-4 border border-border/50">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-text-secondary">Evidence Items</h3>
            <Icons.clipboard className="h-5 w-5 text-text-secondary" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-text">{stats.evidenceCount}</p>
        </div>
      </div>

      {/* Progress Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface/50 rounded-lg p-4 border border-border/50">
          <h3 className="text-sm font-medium text-text-secondary mb-4">Control Status</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-sm text-text-secondary">Completed ({stats.completedControls})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="text-sm text-text-secondary">Failed ({stats.failedControls})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300" />
                <span className="text-sm text-text-secondary">Pending ({stats.pendingControls})</span>
              </div>
            </div>
            <GraduatedCircleProgress
              value={stats.completionPercentage}
              size={120}
              strokeWidth={12}
              text={`${stats.completionPercentage}%`}
            />
          </div>
        </div>

        <div className="bg-surface/50 rounded-lg p-4 border border-border/50">
          <h3 className="text-sm font-medium text-text-secondary mb-4">Progress Over Time</h3>
          <TrendChart data={[
            { date: '2023-01', value: 20 },
            { date: '2023-02', value: 35 },
            { date: '2023-03', value: 45 },
            { date: '2023-04', value: stats.completionPercentage }
          ]} />
        </div>
      </div>
    </div>
  )
}
