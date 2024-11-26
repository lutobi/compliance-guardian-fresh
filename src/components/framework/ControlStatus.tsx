'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

export type ControlStatusType = 'not_started' | 'in_progress' | 'completed' | 'not_applicable'

const statusConfig = {
  not_started: { 
    label: 'Not Started', 
    color: 'bg-gray-100 text-gray-900',
    darkColor: 'dark:bg-gray-800 dark:text-gray-100'
  },
  in_progress: { 
    label: 'In Progress', 
    color: 'bg-blue-100 text-blue-900',
    darkColor: 'dark:bg-blue-900 dark:text-blue-100'
  },
  completed: { 
    label: 'Completed', 
    color: 'bg-emerald-100 text-emerald-900',
    darkColor: 'dark:bg-emerald-900 dark:text-emerald-100'
  },
  not_applicable: { 
    label: 'Not Applicable', 
    color: 'bg-gray-100 text-gray-900',
    darkColor: 'dark:bg-gray-800 dark:text-gray-100'
  },
} as const

interface ControlStatusProps {
  status: ControlStatusType
  onChange: (status: ControlStatusType) => void
}

export default function ControlStatus({ status = 'not_started', onChange }: ControlStatusProps) {
  const validStatus = Object.keys(statusConfig).includes(status) ? status : 'not_started'
  const currentStatus = statusConfig[validStatus as keyof typeof statusConfig]

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${currentStatus.color} ${currentStatus.darkColor} hover:opacity-90 transition-opacity`}
        >
          {currentStatus.label}
          <ChevronDownIcon className="h-3.5 w-3.5" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-50 min-w-[140px] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-1"
          sideOffset={4}
          align="end"
          alignOffset={-5}
        >
          {(Object.entries(statusConfig) as [ControlStatusType, typeof statusConfig[keyof typeof statusConfig]][]).map(([key, config]) => (
            <DropdownMenu.Item
              key={key}
              onClick={() => onChange(key)}
              className={`relative flex items-center gap-2 px-2 py-1.5 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 outline-none cursor-pointer rounded ${status === key ? 'bg-gray-50 dark:bg-gray-700' : ''}`}
            >
              <span className={`w-2 h-2 rounded-full ${config.color.split(' ')[0]}`} />
              {config.label}
              {status === key && (
                <CheckIcon className="h-4 w-4 ml-auto text-blue-600 dark:text-blue-400" />
              )}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
