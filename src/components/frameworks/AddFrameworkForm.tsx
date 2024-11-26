'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Modal from '../ui/Modal'
import { AVAILABLE_FRAMEWORKS, Framework } from '@/lib/constants'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface AddFrameworkFormProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function AddFrameworkForm({
  open,
  onClose,
  onSuccess,
}: AddFrameworkFormProps) {
  const [selectedFrameworkId, setSelectedFrameworkId] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()
  const queryClient = useQueryClient()

  const selectedFramework = AVAILABLE_FRAMEWORKS.find(
    (f) => f.id === selectedFrameworkId
  )

  const createFramework = useMutation({
    mutationFn: async () => {
      if (!selectedFramework) throw new Error('Please select a framework')

      // Start a transaction
      const { data: framework, error: frameworkError } = await supabase
        .from('frameworks')
        .insert([
          {
            name: selectedFramework.name,
            version: selectedFramework.version,
            description: description || selectedFramework.description,
          },
        ])
        .select()
        .single()

      if (frameworkError) throw frameworkError
      if (!framework) throw new Error('Failed to create framework')

      // Insert controls for the framework
      for (const control of selectedFramework.controls) {
        const { data: createdControl, error: controlError } = await supabase
          .from('controls')
          .insert([
            {
              framework_id: framework.id,
              control_id: control.id,
              name: control.name,
              description: control.description,
            },
          ])
          .select()
          .single()

        if (controlError) throw controlError
        if (!createdControl) throw new Error('Failed to create control')

        // Insert subcontrols for each control
        const subcontrolsToInsert = control.subcontrols.map((subcontrol) => ({
          control_id: createdControl.id,
          subcontrol_id: subcontrol.id,
          name: subcontrol.name,
          description: subcontrol.description,
        }))

        const { error: subcontrolError } = await supabase
          .from('subcontrols')
          .insert(subcontrolsToInsert)

        if (subcontrolError) throw subcontrolError
      }

      return framework
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['frameworks'] })
      onSuccess()
      onClose()
      setSelectedFrameworkId('')
      setDescription('')
    },
    onError: (err) => {
      console.error('Error creating framework:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    createFramework.mutate()
  }

  return (
    <Modal open={open} onClose={onClose} title="Add Compliance Framework">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error creating framework
                </h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label
            htmlFor="framework"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Framework
          </label>
          <Select
            value={selectedFrameworkId}
            onValueChange={setSelectedFrameworkId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available Frameworks</SelectLabel>
                {AVAILABLE_FRAMEWORKS.map((framework) => (
                  <SelectItem key={framework.id} value={framework.id}>
                    {framework.name} ({framework.version})
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {selectedFramework && (
            <div className="space-y-3">
              <p className="mt-1 text-sm text-gray-500">
                {selectedFramework.description}
              </p>
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-blue-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      Included Controls
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <ul className="list-disc pl-5 space-y-1">
                        {selectedFramework.controls.map((control) => (
                          <li key={control.id}>
                            {control.name} ({control.subcontrols.length} subcontrols)
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Custom Description (Optional)
          </label>
          <div className="mt-2">
            <textarea
              id="description"
              name="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Leave blank to use the default description"
            />
          </div>
        </div>

        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
          <button
            type="submit"
            disabled={createFramework.isPending || !selectedFrameworkId}
            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createFramework.isPending ? 'Creating...' : 'Create'}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={createFramework.isPending}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  )
}
