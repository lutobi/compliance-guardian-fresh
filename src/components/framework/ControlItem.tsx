'use client'

import { ChevronDownIcon, ChevronRightIcon, PaperClipIcon } from '@heroicons/react/24/outline'
import { useState, useMemo } from 'react'
import { Control } from '@/types/framework'
import ControlStatus, { ControlStatusType } from './ControlStatus'
import ProgressCircle from './ProgressCircle'
import EvidenceDialog from './EvidenceDialog'

interface SubControlStatus {
  [key: string]: {
    status: ControlStatusType;
    evidence: string[];
    lastUpdated?: string;
  }
}

interface ControlItemProps {
  control: Control
  subControlStatuses?: SubControlStatus
  onSubControlStatusChange?: (controlId: string, status: ControlStatusType) => void
  onSubControlEvidenceChange?: (controlId: string, evidence: string[]) => void
}

export default function ControlItem({
  control,
  subControlStatuses = {}, 
  onSubControlStatusChange = () => {}, 
  onSubControlEvidenceChange = () => {} 
}: ControlItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEvidenceDialogOpen, setIsEvidenceDialogOpen] = useState(false)
  const [activeSubControlId, setActiveSubControlId] = useState<string | null>(null)

  const subControls = useMemo(() => {
    if (!control) return []
    
    const rawControls = control.subControls || control.children || control.controls || []
    return rawControls.map(sc => ({
      ...sc,
      id: sc.id || `${control.id || 'control'}.${sc.name || sc.title || 'unnamed'}`
    }))
  }, [control])

  const displayName = control?.title || control?.name || ''

  const progress = useMemo(() => {
    if (!subControls?.length || !subControlStatuses) return 0
    
    const completedCount = subControls.reduce((count, subControl) => {
      const status = subControlStatuses[subControl.id]?.status
      return status === 'completed' ? count + 1 : count
    }, 0)
    
    return Math.round((completedCount / subControls.length) * 100)
  }, [subControls, subControlStatuses])

  const handleEvidenceClick = (subControlId: string) => {
    setActiveSubControlId(subControlId)
    setIsEvidenceDialogOpen(true)
  }

  const handleStatusChange = (subControlId: string, newStatus: ControlStatusType) => {
    if (onSubControlStatusChange && subControlId) {
      onSubControlStatusChange(subControlId, newStatus)
    }
  }

  const handleEvidenceChange = (subControlId: string, newEvidence: string[]) => {
    if (onSubControlEvidenceChange && subControlId) {
      onSubControlEvidenceChange(subControlId, newEvidence)
      setIsEvidenceDialogOpen(false)
      setActiveSubControlId(null)
    }
  }

  if (!control) return null

  return (
    <div>
      <div className="flex items-center px-4 py-2 hover:bg-surface-hover">
        {subControls.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mr-3 flex h-5 w-5 items-center justify-center rounded"
          >
            {isExpanded ? (
              <ChevronDownIcon className="h-4 w-4 text-text-secondary" />
            ) : (
              <ChevronRightIcon className="h-4 w-4 text-text-secondary" />
            )}
          </button>
        )}
        {control.id && (
          <span className="mr-3 font-mono text-sm text-text-secondary">{control.id}</span>
        )}
        <span className="flex-1 text-sm font-medium">{displayName}</span>
        <div className="flex items-center">
          <ProgressCircle value={progress} size="sm" variant="control" />
          <span className="ml-2 text-xs text-text-secondary">{progress}%</span>
        </div>
      </div>

      {isExpanded && subControls.length > 0 && (
        <div className="border-l border-border ml-6">
          {subControls.map((subControl) => {
            if (!subControl?.id) return null
            const status = subControlStatuses[subControl.id]?.status || 'not_started'
            const evidence = subControlStatuses[subControl.id]?.evidence || []
            
            return (
              <div
                key={subControl.id}
                className="flex items-center px-4 py-2 hover:bg-surface-hover"
              >
                {subControl.id && (
                  <span className="mr-3 font-mono text-sm text-text-secondary">
                    {subControl.id}
                  </span>
                )}
                <span className="flex-1 text-sm font-medium">
                  {subControl.title || subControl.name}
                </span>
                <button
                  onClick={() => handleEvidenceClick(subControl.id)}
                  className="mr-2 flex h-6 w-6 items-center justify-center rounded"
                >
                  <PaperClipIcon className="h-4 w-4 text-text-secondary" />
                  {evidence.length > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
                      {evidence.length}
                    </span>
                  )}
                </button>
                <ControlStatus
                  status={status}
                  onChange={(newStatus) => handleStatusChange(subControl.id, newStatus)}
                />
              </div>
            )
          })}
        </div>
      )}

      {isEvidenceDialogOpen && activeSubControlId && (
        <EvidenceDialog
          isOpen={isEvidenceDialogOpen}
          onClose={() => {
            setIsEvidenceDialogOpen(false)
            setActiveSubControlId(null)
          }}
          evidence={subControlStatuses[activeSubControlId]?.evidence || []}
          onEvidenceChange={(evidence) => handleEvidenceChange(activeSubControlId, evidence)}
        />
      )}
    </div>
  )
}
