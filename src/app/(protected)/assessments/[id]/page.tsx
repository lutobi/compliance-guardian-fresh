'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getAssessment, updateAssessmentControl } from '@/lib/api/assessments'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { formatDate } from '@/lib/utils'
import { ControlsList } from './controls-list'
import { EvidenceList } from './evidence-list'

export default function AssessmentPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState('controls')

  const { data: assessment, isLoading } = useQuery(
    ['assessment', params.id],
    () => getAssessment(params.id as string),
    {
      enabled: !!params.id,
    }
  )

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    )
  }

  if (!assessment) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Assessment not found</p>
      </div>
    )
  }

  const totalControls = assessment.controls?.length || 0
  const implementedControls = assessment.controls?.filter(
    (c) => c.status === 'implemented'
  ).length || 0
  const progress = totalControls > 0 ? (implementedControls / totalControls) * 100 : 0

  const statusColors = {
    planned: 'bg-gray-500',
    in_progress: 'bg-blue-500',
    completed: 'bg-green-500',
    archived: 'bg-gray-300',
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{assessment.name}</CardTitle>
                <CardDescription className="mt-2">
                  {assessment.description}
                </CardDescription>
              </div>
              <Badge variant="secondary" className={statusColors[assessment.status]}>
                {assessment.status.replace('_', ' ')}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Framework</p>
                <p className="font-medium">
                  {assessment.framework.name} v{assessment.framework.version}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium">{formatDate(assessment.start_date)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">End Date</p>
                <p className="font-medium">
                  {assessment.end_date ? formatDate(assessment.end_date) : '-'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Created By</p>
                <p className="font-medium">{assessment.created_by.email}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-500">Overall Progress</p>
                <p className="text-sm font-medium">{Math.round(progress)}%</p>
              </div>
              <Progress value={progress} />
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="controls">Controls</TabsTrigger>
            <TabsTrigger value="evidence">Evidence</TabsTrigger>
          </TabsList>

          <TabsContent value="controls" className="mt-6">
            <ControlsList
              controls={assessment.controls}
              onUpdateControl={(id, data) => updateAssessmentControl(id, data)}
            />
          </TabsContent>

          <TabsContent value="evidence" className="mt-6">
            <EvidenceList controls={assessment.controls} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
