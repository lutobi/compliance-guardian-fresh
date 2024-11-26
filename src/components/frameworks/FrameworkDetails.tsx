import { useState } from 'react'
import { Framework, Control } from '@/types/database.types'

interface FrameworkDetailsProps {
  framework: Framework
  controls: Control[]
}

export default function FrameworkDetails({ framework, controls }: FrameworkDetailsProps) {
  const [expandedControls, setExpandedControls] = useState<string[]>([])

  const toggleControl = (controlId: string) => {
    setExpandedControls(prev =>
      prev.includes(controlId)
        ? prev.filter(id => id !== controlId)
        : [...prev, controlId]
    )
  }

  // Group controls by their parent
  const controlGroups = controls.reduce((acc, control) => {
    if (!control.parent_control_id) {
      if (!acc[control.id]) {
        acc[control.id] = {
          control,
          subControls: []
        }
      } else {
        acc[control.id].control = control
      }
    } else {
      if (!acc[control.parent_control_id]) {
        acc[control.parent_control_id] = {
          subControls: [control]
        }
      } else {
        acc[control.parent_control_id].subControls.push(control)
      }
    }
    return acc
  }, {} as Record<string, { control?: Control; subControls: Control[] }>)

  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {framework.name}
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>{framework.description}</p>
          </div>
          <div className="mt-3 text-sm">
            <span className="font-medium text-gray-900">Version:</span>{' '}
            <span className="text-gray-500">{framework.version}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {Object.values(controlGroups).map(({ control, subControls }) => {
          if (!control) return null
          const isExpanded = expandedControls.includes(control.id)

          return (
            <div key={control.id} className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <button
                  onClick={() => toggleControl(control.id)}
                  className="flex w-full items-start justify-between text-left"
                >
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-gray-900">
                      {control.control_id} - {control.title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {control.description}
                    </p>
                  </div>
                  <span className="ml-6 flex h-7 items-center">
                    <svg
                      className={`h-6 w-6 transform ${
                        isExpanded ? 'rotate-180' : ''
                      } text-gray-500`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>

                {isExpanded && subControls.length > 0 && (
                  <div className="mt-4 space-y-4 border-t border-gray-200 pt-4">
                    {subControls.map(subControl => (
                      <div
                        key={subControl.id}
                        className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                      >
                        <h5 className="text-sm font-medium text-gray-900">
                          {subControl.control_id} - {subControl.title}
                        </h5>
                        <p className="mt-1 text-sm text-gray-500">
                          {subControl.description}
                        </p>
                        <div className="mt-3">
                          <select
                            className="block w-full rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                            defaultValue="not_started"
                          >
                            <option value="not_started">Not Started</option>
                            <option value="in_progress">In Progress</option>
                            <option value="compliant">Compliant</option>
                            <option value="non_compliant">Non-Compliant</option>
                            <option value="not_applicable">Not Applicable</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
