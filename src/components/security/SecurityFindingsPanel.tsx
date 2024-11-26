'use client'

import { useState } from 'react'
import { PlusIcon, CalendarIcon, UserIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { SecurityFinding } from '@/types/security'

export default function SecurityFindingsPanel() {
  const [findings, setFindings] = useState<SecurityFinding[]>([])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text">Security Findings</h2>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-text hover:bg-primary/90 transition-colors rounded-lg bg-primary">
          <PlusIcon className="h-4 w-4" />
          <span>New Finding</span>
        </button>
      </div>

      {/* Content */}
      {findings.length === 0 ? (
        <div className="text-center py-12 bg-surface rounded-xl">
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-surface-light rounded-full">
              <ExclamationTriangleIcon className="h-6 w-6 text-text-secondary" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-text">No Security Findings</h3>
              <p className="text-sm text-text-secondary max-w-sm">
                Add security findings from penetration tests and vulnerability assessments.
              </p>
            </div>
            <button className="mt-2 flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-text hover:bg-primary/90 transition-colors rounded-lg bg-primary">
              <PlusIcon className="h-4 w-4" />
              <span>Add Finding</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {findings.map((finding) => (
            <div key={finding.id} className="p-4 bg-surface rounded-xl">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-medium text-text">{finding.title}</h3>
                  <p className="mt-1 text-sm text-text-secondary">{finding.description}</p>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{new Date(finding.discoveredAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                      <UserIcon className="h-4 w-4" />
                      <span>Assets: {finding.affectedAssets.join(', ')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`
                    px-2 py-1 text-xs font-medium rounded-full
                    ${finding.severity === 'critical' ? 'bg-rose-500/10 text-rose-500' : 
                      finding.severity === 'high' ? 'bg-amber-500/10 text-amber-500' : 
                      finding.severity === 'medium' ? 'bg-yellow-500/10 text-yellow-500' :
                      finding.severity === 'low' ? 'bg-emerald-500/10 text-emerald-500' :
                      'bg-gray-500/10 text-gray-500'}
                  `}>
                    {finding.severity}
                  </span>
                  <span className={`
                    px-2 py-1 text-xs font-medium rounded-full
                    ${finding.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-500' : 
                      finding.status === 'in-progress' ? 'bg-amber-500/10 text-amber-500' : 
                      finding.status === 'accepted' ? 'bg-blue-500/10 text-blue-500' :
                      'bg-rose-500/10 text-rose-500'}
                  `}>
                    {finding.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
