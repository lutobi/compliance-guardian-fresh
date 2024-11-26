'use client'

import { DashboardStats } from '@/hooks/useDashboardData'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

interface FrameworkProgressProps {
  frameworks: DashboardStats['frameworkProgress']
}

export default function FrameworkProgress({ frameworks }: FrameworkProgressProps) {
  const router = useRouter()

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Framework Progress</h3>
          <button
            onClick={() => router.push('/frameworks')}
            className="text-sm text-indigo-600 hover:text-indigo-900"
          >
            View all
          </button>
        </div>
        <div className="space-y-4">
          {frameworks.map((framework) => (
            <div
              key={framework.id}
              className="group cursor-pointer"
              onClick={() => router.push(`/frameworks/${framework.id}`)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-indigo-600">
                    {framework.name}
                  </h4>
                  <ChevronRightIcon className="h-4 w-4 text-gray-400 group-hover:text-indigo-600" />
                </div>
                <span className="text-sm text-gray-600">
                  {framework.implementedControls}/{framework.totalControls} controls
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: `${framework.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
