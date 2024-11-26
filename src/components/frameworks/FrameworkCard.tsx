'use client'

import { Framework } from '@/types/framework-data.types'
import Link from 'next/link'

interface FrameworkCardProps {
  framework: Framework
}

export default function FrameworkCard({ framework }: FrameworkCardProps) {
  return (
    <Link href={`/frameworks/${framework.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 cursor-pointer">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900">{framework.name}</h3>
          <span className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded">
            v{framework.version}
          </span>
        </div>
        <p className="mt-2 text-gray-600">{framework.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-2">
            <span className="px-2 py-1 text-sm bg-gray-100 text-gray-600 rounded">
              Controls
            </span>
          </div>
          <svg
            className="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  )
}
