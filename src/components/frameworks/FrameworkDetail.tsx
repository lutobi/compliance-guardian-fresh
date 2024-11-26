'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Control, Framework } from '@/types/framework-data.types'

interface FrameworkDetailProps {
  initialFramework: Framework
  initialControls: Control[]
  frameworkId: string
}

export default function FrameworkDetail({ 
  initialFramework, 
  initialControls,
  frameworkId 
}: FrameworkDetailProps) {
  const [framework, setFramework] = useState<Framework>(initialFramework)
  const [controls, setControls] = useState<Control[]>(initialControls)
  const [selectedControlId, setSelectedControlId] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    // Subscribe to real-time updates
    const controlsChannel = supabase
      .channel('controls-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'controls',
          filter: `framework_id=eq.${frameworkId}`
        },
        async (payload) => {
          // Refresh the controls data
          const { data } = await supabase
            .from('controls')
            .select('*')
            .eq('framework_id', frameworkId)
            .order('control_id')
          
          if (data) {
            setControls(data)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(controlsChannel)
    }
  }, [frameworkId, supabase])

  // Group controls by their parent to create a hierarchy
  const controlHierarchy = controls.reduce((acc, control) => {
    if (!control.parent_control_id) {
      if (!acc[control.id]) {
        acc[control.id] = {
          ...control,
          children: []
        }
      }
    } else {
      if (!acc[control.parent_control_id]) {
        acc[control.parent_control_id] = {
          children: []
        }
      }
      acc[control.parent_control_id].children.push(control)
    }
    return acc
  }, {} as Record<string, Control & { children: Control[] }>)

  const selectedControl = controls.find(c => c.id === selectedControlId)

  return (
    <div className="min-h-screen bg-white">
      {/* Framework Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <h1 className="text-2xl font-semibold text-gray-900">{framework.name}</h1>
          <div className="mt-1 flex items-center gap-x-2">
            <span className="text-sm text-gray-500">Version {framework.version}</span>
            <span className="text-sm text-gray-500">•</span>
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              Active
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-600">{framework.description}</p>
        </div>
      </div>

      <div className="flex-1 min-h-[calc(100vh-9rem)]">
        {selectedControl ? (
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedControl.control_id} - {selectedControl.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600">{selectedControl.description}</p>
            </div>

            {/* Status Section */}
            <div className="mt-8 bg-white rounded-lg border border-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Implementation Status
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Track your progress implementing this control.</p>
                </div>
                <div className="mt-5">
                  <div className="rounded-md bg-gray-50 px-6 py-5">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-900">Progress</div>
                      <div className="ml-6 flex items-center">
                        <span className="text-sm font-medium text-gray-900">Not Started</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-2 bg-indigo-600 rounded-full"
                          style={{ width: '0%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Evidence Section */}
            <div className="mt-8 bg-white rounded-lg border border-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Evidence & Documentation
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Upload evidence and documentation for this control.</p>
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Upload Files
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            Select a control to view its details
          </div>
        )}
      </div>
    </div>
  )
}
