'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PlusIcon } from '@heroicons/react/24/outline'
import { getAssessments } from '@/lib/api/assessments'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { CreateAssessmentDialog } from './create-dialog'
import { useQuery } from '@tanstack/react-query'

export default function AssessmentsPage() {
  const router = useRouter()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const { data: assessments, isLoading } = useQuery({
    queryKey: ['assessments'],
    queryFn: getAssessments
  })

  const statusColors = {
    planned: 'bg-gray-500',
    in_progress: 'bg-blue-500',
    completed: 'bg-green-500',
    archived: 'bg-gray-300'
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Compliance Assessments</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          New Assessment
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Framework</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Created By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assessments?.map((assessment) => (
              <TableRow
                key={assessment.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => router.push(`/assessments/${assessment.id}`)}
              >
                <TableCell className="font-medium">{assessment.name}</TableCell>
                <TableCell>
                  {assessment.framework.name} v{assessment.framework.version}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={statusColors[assessment.status]}>
                    {assessment.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(assessment.start_date)}</TableCell>
                <TableCell>{assessment.end_date ? formatDate(assessment.end_date) : '-'}</TableCell>
                <TableCell>{assessment.created_by.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <CreateAssessmentDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  )
}
