import { useState } from 'react'
import { PlusIcon, CalendarIcon, UserIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { useSecurityAssessment } from '@/hooks/useSecurityAssessment'
import { CreateAssessmentForm } from '@/components/security/CreateAssessmentForm'
import { Button } from '@/components/ui/button'

export default function PenetrationTestingPanel() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const { assessments, isLoadingAssessments } = useSecurityAssessment({
    type: 'PENTEST'
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Penetration Tests</h2>
        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-1.5"
        >
          <PlusIcon className="h-4 w-4" />
          <span>New Test</span>
        </Button>
      </div>

      {/* Content */}
      {isLoadingAssessments ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : !assessments || assessments.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl border">
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-background rounded-full">
              <ShieldCheckIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-foreground">No Penetration Tests</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Start by creating a new penetration test to assess your security posture.
              </p>
            </div>
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-2 flex items-center gap-1.5"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Create Test</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {assessments.map((assessment) => (
            <div key={assessment.id} className="p-4 bg-card rounded-xl border">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-medium text-foreground">{assessment.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{assessment.scope.join(', ')}</p>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{new Date(assessment.start_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <UserIcon className="h-4 w-4" />
                      <span>{assessment.assigned_to.join(', ') || 'Unassigned'}</span>
                    </div>
                  </div>
                </div>
                <span className={`
                  px-2 py-1 text-xs font-medium rounded-full
                  ${assessment.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 
                    assessment.status === 'IN_PROGRESS' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' : 
                    assessment.status === 'CANCELLED' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400' :
                    'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400'}
                `}>
                  {assessment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateAssessmentForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        defaultType="PENTEST"
      />
    </div>
  )
}
