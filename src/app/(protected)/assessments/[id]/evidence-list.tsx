'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { uploadEvidence } from '@/lib/api/assessments'
import { formatDate } from '@/lib/utils'

interface Evidence {
  id: string
  title: string
  file_url: string
  uploaded_by: { email: string }
  created_at: string
}

interface Control {
  id: string
  control_id: string
  title: string
  evidence: Evidence[]
}

interface EvidenceListProps {
  controls: Control[]
}

export function EvidenceList({ controls }: EvidenceListProps) {
  const params = useParams()
  const queryClient = useQueryClient()
  const [selectedControl, setSelectedControl] = useState('')
  const [title, setTitle] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const uploadMutation = useMutation(
    async () => {
      if (!file || !selectedControl || !title) return

      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', title)
      formData.append('controlId', selectedControl)

      await uploadEvidence(formData)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['assessment', params.id])
        setTitle('')
        setFile(null)
        setSelectedControl('')
      },
    }
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    uploadMutation.mutate()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Evidence</CardTitle>
          <CardDescription>
            Upload evidence files for specific controls in this assessment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Control</label>
                <Select
                  value={selectedControl}
                  onValueChange={setSelectedControl}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a control" />
                  </SelectTrigger>
                  <SelectContent>
                    {controls.map((control) => (
                      <SelectItem key={control.id} value={control.id}>
                        {control.control_id} - {control.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Evidence title"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">File</label>
              <Input type="file" onChange={handleFileChange} />
            </div>
            <Button
              type="submit"
              disabled={!file || !selectedControl || !title || uploadMutation.isLoading}
            >
              {uploadMutation.isLoading ? 'Uploading...' : 'Upload Evidence'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {controls.map((control) => (
          <Card key={control.id}>
            <CardHeader>
              <CardTitle className="text-lg">
                {control.control_id} - {control.title}
              </CardTitle>
              <CardDescription>
                {control.evidence.length} evidence file(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {control.evidence.length > 0 ? (
                <div className="space-y-4">
                  {control.evidence.map((evidence) => (
                    <div
                      key={evidence.id}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div>
                        <h4 className="font-medium">{evidence.title}</h4>
                        <p className="text-sm text-gray-500">
                          Uploaded by {evidence.uploaded_by.email} on{' '}
                          {formatDate(evidence.created_at)}
                        </p>
                      </div>
                      <a
                        href={evidence.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View File
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No evidence files uploaded yet.</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
