'use client'

import { ExclamationTriangleIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline'

interface CriticalIssuesProps {
  criticalCount: number
  totalControls: number
}

export default function CriticalIssues({ criticalCount, totalControls }: CriticalIssuesProps) {
  const percentage = ((criticalCount / totalControls) * 100).toFixed(1)
  const severity = criticalCount > 5 ? 'high' : criticalCount > 2 ? 'medium' : 'low'

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Critical Issues</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            severity === 'high' ? 'bg-red-50 text-red-700' :
            severity === 'medium' ? 'bg-yellow-50 text-yellow-700' :
            'bg-green-50 text-green-700'
          }`}>
            {severity.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ExclamationTriangleIcon className={`h-8 w-8 ${
              severity === 'high' ? 'text-red-500' :
              severity === 'medium' ? 'text-yellow-500' :
              'text-green-500'
            }`} />
            <div>
              <p className="text-2xl font-semibold text-gray-900">{criticalCount}</p>
              <p className="text-sm text-gray-500">Critical Issues</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold text-gray-900">{percentage}%</p>
            <p className="text-sm text-gray-500">of Controls</p>
          </div>
        </div>

        {criticalCount > 0 && (
          <div className="mt-6">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <ShieldExclamationIcon className="h-5 w-5 text-red-500" />
              <span>Immediate attention required for {criticalCount} control{criticalCount !== 1 ? 's' : ''}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
