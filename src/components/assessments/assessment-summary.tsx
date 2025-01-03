'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { Assessment, AssessmentSummary } from '@/types/assessment.types'
import { BarChart, CheckCircle, Clock, AlertTriangle } from 'lucide-react'

interface AssessmentSummaryProps {
  assessment: Assessment
  summary: AssessmentSummary
}

export function AssessmentSummaryView({ assessment, summary }: AssessmentSummaryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      case 'on_hold':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{assessment.name}</h1>
          <p className="text-gray-500">{assessment.description}</p>
        </div>
        <Badge className={getStatusColor(assessment.status)}>
          {assessment.status.replace('_', ' ')}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <BarChart className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{assessment.progress}%</div>
              <Progress value={assessment.progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Implemented Controls</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.implementedControls}</div>
            <p className="text-xs text-gray-500">
              of {summary.totalControls} controls
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.inProgressControls}</div>
            <p className="text-xs text-gray-500">controls being implemented</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attention Needed</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary.notStartedControls + (summary.overdueControls || 0)}
            </div>
            <p className="text-xs text-gray-500">controls need attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Assessment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Start Date</p>
                <p className="font-medium">{formatDate(assessment.start_date)}</p>
              </div>
              {assessment.end_date && (
                <div>
                  <p className="text-gray-500">End Date</p>
                  <p className="font-medium">{formatDate(assessment.end_date)}</p>
                </div>
              )}
              <div>
                <p className="text-gray-500">Created By</p>
                <p className="font-medium">{assessment.created_by}</p>
              </div>
              <div>
                <p className="text-gray-500">Last Updated</p>
                <p className="font-medium">{formatDate(assessment.updated_at)}</p>
              </div>
            </div>
            {assessment.assigned_to && assessment.assigned_to.length > 0 && (
              <div>
                <p className="text-gray-500">Assigned To</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {assessment.assigned_to.map((assignee) => (
                    <Badge key={assignee} variant="secondary">
                      {assignee}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Evidence Required</p>
                <p className="font-medium">
                  {assessment.settings?.requireEvidence ? 'Yes' : 'No'}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Review Required</p>
                <p className="font-medium">
                  {assessment.settings?.requireReview ? 'Yes' : 'No'}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Auto Calculate Progress</p>
                <p className="font-medium">
                  {assessment.settings?.autoCalculateProgress ? 'Yes' : 'No'}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Notify on Completion</p>
                <p className="font-medium">
                  {assessment.settings?.notifyOnCompletion ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
            {assessment.settings?.reviewers && assessment.settings.reviewers.length > 0 && (
              <div>
                <p className="text-gray-500">Reviewers</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {assessment.settings.reviewers.map((reviewer) => (
                    <Badge key={reviewer} variant="secondary">
                      {reviewer}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
