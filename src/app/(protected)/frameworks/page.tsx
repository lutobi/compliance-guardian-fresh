'use client'

import { useDashboardData } from '@/hooks/useDashboardData'
import Link from 'next/link'
import { Icons } from '@/components/ui/icons'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { defaultFrameworks } from '@/data/frameworks'
import { generateFrameworkSlug } from '@/utils/framework-utils'

function StatCard({ title, value, icon: IconName, trend = null }: any) {
  const displayValue = typeof value === 'number' ? value : value || '0'
  const Icon = Icons[IconName]
  
  return (
    <div className="bg-surface rounded-xl p-6 shadow-sm border border-border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-text">{displayValue}</p>
        </div>
        {Icon && <Icon className="h-8 w-8 text-text-secondary" />}
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <Icons.trendingUp className="h-4 w-4 text-emerald-500 mr-1" />
          <span className="text-emerald-500 font-medium">{trend}</span>
        </div>
      )}
    </div>
  )
}

function ProgressCircle({ value }: { value: number }) {
  const safeValue = isNaN(value) ? 0 : Math.min(Math.max(value, 0), 100)
  const radius = 30
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (safeValue / 100) * circumference

  return (
    <div className="relative inline-flex">
      <svg className="w-16 h-16 transform -rotate-90">
        <circle
          className="text-surface-light"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="32"
          cy="32"
        />
        <circle
          className="text-primary"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="32"
          cy="32"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
        {safeValue}%
      </span>
    </div>
  )
}

function ComplianceOverview({ completedControls, totalControls }: any) {
  const progress = totalControls > 0 ? Math.round((completedControls / totalControls) * 100) : 0

  return (
    <div className="bg-surface rounded-xl p-6 shadow-sm border border-border">
      <h3 className="text-lg font-medium text-text">Overall Compliance</h3>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <ProgressCircle value={progress} />
          <div>
            <div className="text-2xl font-semibold text-text">{progress}%</div>
            <div className="text-sm text-text-secondary">
              {completedControls} of {totalControls} controls
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FrameworksPage() {
  const { data, isLoading } = useDashboardData()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-text mb-2">Frameworks</h1>
          <p className="text-text-secondary">
            Manage and track compliance across multiple security frameworks
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Frameworks"
            value={defaultFrameworks.length}
            icon="book"
          />
          <StatCard
            title="Active Assessments"
            value={data?.activeAssessments || 0}
            icon="clipboard"
          />
          <StatCard
            title="Controls in Scope"
            value={data?.totalControls || 0}
            icon="check"
          />
          <StatCard
            title="Average Compliance"
            value={`${data?.averageCompliance || 0}%`}
            icon="shield"
          />
        </div>

        {/* Frameworks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {defaultFrameworks.map((framework) => {
            const slug = generateFrameworkSlug(framework.name)
            return (
              <Link
                key={framework.name}
                href={`/frameworks/${slug}`}
                className="group"
              >
                <div className="h-full bg-surface rounded-xl p-6 shadow-sm border border-border hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-text group-hover:text-primary transition-colors">
                        {framework.name}
                      </h3>
                      <p className="text-sm text-text-secondary mt-1">
                        {framework.description}
                      </p>
                    </div>
                    <Icons.book className="h-5 w-5 text-text-secondary group-hover:text-primary transition-colors" />
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <div className="flex items-center gap-1.5">
                      <Icons.check className="h-4 w-4" />
                      <span>{framework.controls.length} Controls</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icons.timer className="h-4 w-4" />
                      <span>~{framework.estimatedTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
