'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { formatDate } from '@/lib/utils'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'

interface Control {
  id: string
  control_id: string
  title: string
  description: string
  status: string
  notes: string | null
  assigned_to: { email: string } | null
  due_date: string | null
  completed_at: string | null
  evidence: Evidence[]
}

interface Evidence {
  id: string
  title: string
  file_url: string
  uploaded_by: { email: string }
  created_at: string
}

interface ControlsListProps {
  controls: Control[]
  onUpdateControl: (id: string, data: Partial<Control>) => Promise<void>
}

export function ControlsList({ controls, onUpdateControl }: ControlsListProps) {
  const [editingNotes, setEditingNotes] = useState<string | null>(null)
  const [noteText, setNoteText] = useState('')

  const statusColors = {
    not_started: 'bg-gray-500',
    in_progress: 'bg-blue-500',
    implemented: 'bg-green-500',
    not_applicable: 'bg-gray-300',
    not_compliant: 'bg-red-500',
  }

  const handleStatusChange = async (controlId: string, newStatus: string) => {
    try {
      await onUpdateControl(controlId, {
        status: newStatus,
        completed_at: newStatus === 'implemented' ? new Date().toISOString() : null,
      })
    } catch (error) {
      console.error('Error updating control status:', error)
      // TODO: Show error toast
    }
  }

  const handleSaveNotes = async (controlId: string) => {
    try {
      await onUpdateControl(controlId, { notes: noteText })
      setEditingNotes(null)
    } catch (error) {
      console.error('Error updating control notes:', error)
      // TODO: Show error toast
    }
  }

  const startEditingNotes = (control: Control) => {
    setEditingNotes(control.id)
    setNoteText(control.notes || '')
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Control ID</TableHead>
            <TableHead className="w-[300px]">Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Evidence</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {controls.map((control) => (
            <TableRow key={control.id}>
              <TableCell className="font-medium">{control.control_id}</TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{control.title}</p>
                  <p className="text-sm text-gray-500">{control.description}</p>
                </div>
              </TableCell>
              <TableCell>
                <Select
                  defaultValue={control.status}
                  onValueChange={(value) => handleStatusChange(control.id, value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue>
                      <Badge variant="secondary" className={statusColors[control.status]}>
                        {control.status.replace('_', ' ')}
                      </Badge>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not_started">Not Started</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="implemented">Implemented</SelectItem>
                    <SelectItem value="not_applicable">Not Applicable</SelectItem>
                    <SelectItem value="not_compliant">Not Compliant</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                {editingNotes === control.id ? (
                  <div className="space-y-2">
                    <Textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleSaveNotes(control.id)}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingNotes(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="cursor-pointer hover:bg-gray-50 p-2 rounded"
                    onClick={() => startEditingNotes(control)}
                  >
                    {control.notes || 'Click to add notes...'}
                  </div>
                )}
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  {control.evidence.map((evidence) => (
                    <a
                      key={evidence.id}
                      href={evidence.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-blue-600 hover:underline"
                    >
                      {evidence.title}
                    </a>
                  ))}
                </div>
              </TableCell>
              <TableCell>{formatDate(control.updated_at)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <EllipsisVerticalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => startEditingNotes(control)}>
                      Edit Notes
                    </DropdownMenuItem>
                    <DropdownMenuItem>Upload Evidence</DropdownMenuItem>
                    <DropdownMenuItem>View History</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
