import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Table } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { useSecurityAssessment } from '@/hooks/useSecurityAssessment'
import { timeAgo } from '@/utils/date'
import {
  SecurityAssessment,
  AssessmentStatus,
  VulnerabilitySeverity,
} from '@/types/security-assessment'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { ErrorAlert } from '@/components/common/ErrorAlert'
import { CreateAssessmentForm } from '@/components/security/CreateAssessmentForm'

export function SecurityAssessmentDashboard() {
  const [selectedStatus, setSelectedStatus] = useState<AssessmentStatus>()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const {
    assessments,
    isLoadingAssessments,
    assessmentsError,
    generateReport,
  } = useSecurityAssessment({
    status: selectedStatus,
  })

  const getSeverityColor = (severity: VulnerabilitySeverity) => {
    switch (severity) {
      case 'CRITICAL':
        return 'text-red-600'
      case 'HIGH':
        return 'text-orange-600'
      case 'MEDIUM':
        return 'text-yellow-600'
      case 'LOW':
        return 'text-blue-600'
      default:
        return 'text-gray-600'
    }
  }

  const getStatusColor = (status: AssessmentStatus) => {
    switch (status) {
      case 'IN_PROGRESS':
        return 'text-blue-600'
      case 'COMPLETED':
        return 'text-green-600'
      case 'CANCELLED':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Security Assessments</h2>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          New Assessment
        </Button>
      </div>

      <Card>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as AssessmentStatus)}
              className="w-48"
            >
              <option value="">All Status</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </Select>
          </div>

          {isLoadingAssessments ? (
            <LoadingSpinner />
          ) : assessmentsError ? (
            <ErrorAlert error={assessmentsError} />
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>Findings</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assessments?.map((assessment: SecurityAssessment) => {
                  const findingsSummary = assessment.findings.reduce(
                    (acc, finding) => ({
                      ...acc,
                      [finding.severity]: (acc[finding.severity] || 0) + 1,
                    }),
                    {} as Record<VulnerabilitySeverity, number>
                  )

                  return (
                    <tr key={assessment.id}>
                      <td>{assessment.name}</td>
                      <td>{assessment.type}</td>
                      <td>
                        <span className={getStatusColor(assessment.status)}>
                          {assessment.status}
                        </span>
                      </td>
                      <td>{timeAgo(assessment.startDate)}</td>
                      <td>
                        <div className="flex space-x-2">
                          {findingsSummary.CRITICAL && (
                            <span className={getSeverityColor('CRITICAL')}>
                              {findingsSummary.CRITICAL} Critical
                            </span>
                          )}
                          {findingsSummary.HIGH && (
                            <span className={getSeverityColor('HIGH')}>
                              {findingsSummary.HIGH} High
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => generateReport.mutate(assessment.id)}
                            disabled={generateReport.isPending}
                          >
                            Generate Report
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          )}
        </div>
      </Card>

      <CreateAssessmentForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  )
}
