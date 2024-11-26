'use client'

import { useEffect, useState } from 'react'

interface ProgressCircleProps {
  value: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'control' | 'overview'
  completedCount?: number
  inProgressCount?: number
  totalCount?: number
}

export default function ProgressCircle({ 
  value, 
  size = 'md', 
  variant = 'control',
  completedCount = 0,
  inProgressCount = 0,
  totalCount = 0
}: ProgressCircleProps) {
  const [animatedValue, setAnimatedValue] = useState(0)
  const normalizedValue = Math.min(Math.max(value, 0), 100)
  
  // Adjusted sizes for better proportions
  const sizeMap = {
    sm: { radius: 6, stroke: 1.5, box: 16 },
    md: { radius: 12, stroke: 2, box: 28 },
    lg: { radius: 32, stroke: 4, box: 80 }
  }
  
  const { radius, stroke: strokeWidth, box: boxSize } = sizeMap[size]
  const viewBoxSize = boxSize
  const circumference = 2 * Math.PI * radius

  // Calculate percentages for overview variant
  const completedPercentage = totalCount ? Math.round((completedCount / totalCount) * 100) : 0
  const inProgressPercentage = totalCount ? Math.round((inProgressCount / totalCount) * 100) : 0
  const notStartedPercentage = 100 - completedPercentage - inProgressPercentage
  
  const completedOffset = circumference - (completedPercentage / 100) * circumference
  const inProgressOffset = circumference - ((completedPercentage + inProgressPercentage) / 100) * circumference

  useEffect(() => {
    setAnimatedValue(normalizedValue)
  }, [normalizedValue])

  if (variant === 'overview' && size === 'lg') {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Percentage labels around the circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-semibold text-emerald-500">
              {Math.round(animatedValue)}%
            </span>
          </div>
          
          {/* SVG for the circle */}
          <svg
            className="transform -rotate-90 w-40 h-40"
            width={viewBoxSize}
            height={viewBoxSize}
            viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          >
            {/* Background track - black */}
            <circle
              className="stroke-gray-900 dark:stroke-gray-700"
              cx={viewBoxSize / 2}
              cy={viewBoxSize / 2}
              r={radius}
              fill="none"
              strokeWidth={strokeWidth}
            />
            
            {/* In progress - blue */}
            <circle
              className="transition-all duration-1000 ease-out stroke-blue-500"
              cx={viewBoxSize / 2}
              cy={viewBoxSize / 2}
              r={radius}
              fill="none"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={inProgressOffset}
              strokeLinecap="round"
              style={{
                transformOrigin: 'center',
                transform: `rotate(${(completedPercentage / 100) * 360}deg)`
              }}
            />
            {/* Completed - green */}
            <circle
              className="transition-all duration-1000 ease-out stroke-emerald-500"
              cx={viewBoxSize / 2}
              cy={viewBoxSize / 2}
              r={radius}
              fill="none"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={completedOffset}
              strokeLinecap="round"
            />
          </svg>

          {/* Percentage labels */}
          <div className="absolute inset-0">
            {/* Completed percentage - top */}
            {completedPercentage > 0 && (
              <div className="absolute w-full text-center -top-1">
                <span className="text-xs font-medium text-emerald-500">
                  {completedPercentage}%
                </span>
              </div>
            )}
            {/* In Progress percentage - right */}
            {inProgressPercentage > 0 && (
              <div className="absolute top-1/2 -translate-y-1/2 -right-4">
                <span className="text-xs font-medium text-blue-500">
                  {inProgressPercentage}%
                </span>
              </div>
            )}
            {/* Not Started percentage - bottom */}
            {notStartedPercentage > 0 && (
              <div className="absolute w-full text-center -bottom-1">
                <span className="text-xs font-medium text-gray-900 dark:text-gray-700">
                  {notStartedPercentage}%
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Legend for large overview */}
        <div className="flex items-center gap-2 text-sm">
          {completedCount > 0 && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-gray-600 dark:text-gray-300">
                {completedCount} Completed
              </span>
            </div>
          )}
          {inProgressCount > 0 && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-gray-600 dark:text-gray-300">
                {inProgressCount} In Progress
              </span>
            </div>
          )}
          {totalCount - completedCount - inProgressCount > 0 && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-gray-900 dark:bg-gray-700" />
              <span className="text-gray-600 dark:text-gray-300">
                {totalCount - completedCount - inProgressCount} Not Started
              </span>
            </div>
          )}
        </div>
      </div>
    )
  }

  // For small/medium control variant
  return (
    <div className="relative inline-flex" style={{ width: boxSize, height: boxSize }}>
      <svg
        width={viewBoxSize}
        height={viewBoxSize}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        className="transform -rotate-90"
      >
        {/* Background track */}
        <circle
          className="stroke-gray-900/10 dark:stroke-gray-700/30"
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          className="transition-all duration-300 stroke-emerald-500"
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (animatedValue / 100) * circumference}
          strokeLinecap="round"
        />
      </svg>
      
      {size !== 'sm' && (
        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
          {Math.round(animatedValue)}%
        </span>
      )}
    </div>
  )
}
