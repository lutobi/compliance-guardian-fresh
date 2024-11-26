'use client'

import { DashboardStats } from '@/hooks/useDashboardData'
import { CalendarIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'

interface UpcomingTasksProps {
  tasks: DashboardStats['upcomingTasks']
}

const priorityColors = {
  low: 'bg-blue-50 text-blue-700',
  medium: 'bg-yellow-50 text-yellow-700',
  high: 'bg-red-50 text-red-700',
}

export default function UpcomingTasks({ tasks }: UpcomingTasksProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Upcoming Tasks</h3>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex-shrink-0">
                <ExclamationCircleIcon className={`h-6 w-6 ${
                  task.priority === 'high' ? 'text-red-500' :
                  task.priority === 'medium' ? 'text-yellow-500' :
                  'text-blue-500'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {task.title}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {task.framework} - {task.control}
                </p>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>Due {format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
