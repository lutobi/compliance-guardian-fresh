'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface GraduatedCircleProgressProps {
  progress: number
  size?: number
  strokeWidth?: number
  color?: string
}

export default function GraduatedCircleProgress({
  progress,
  size = 200,
  strokeWidth = 12,
  color = 'var(--color-primary)'
}: GraduatedCircleProgressProps) {
  const [isVisible, setIsVisible] = useState(false)
  const center = size / 2
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const graduationCount = 40 // Number of graduation marks
  const graduationLength = 10 // Length of graduation marks

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Create graduation marks
  const graduationMarks = Array.from({ length: graduationCount }).map((_, index) => {
    const angle = (index * 360) / graduationCount
    const rotation = angle - 90 // Start from top
    const isHighlighted = (index / graduationCount) * 100 <= progress

    return (
      <motion.div
        key={index}
        className="absolute"
        style={{
          width: graduationLength,
          height: 2,
          transformOrigin: `${center}px center`,
          left: center - graduationLength / 2,
          top: '50%',
          transform: `rotate(${rotation}deg)`,
          background: isHighlighted ? color : 'var(--color-surface-light)',
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.02 }}
      />
    )
  })

  const progressOffset = ((100 - progress) / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Graduation marks */}
      {graduationMarks}

      {/* SVG circle */}
      <svg
        className="absolute inset-0 transform -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--color-surface-light)"
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: progressOffset }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            filter: `drop-shadow(0 0 6px ${color}66)`,
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          className="text-4xl font-bold"
          style={{ color }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          {progress}%
        </motion.div>
        <motion.div
          className="text-sm text-text-secondary mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Complete
        </motion.div>
      </div>

      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          animation: 'pulse 2s infinite',
        }}
      />

      <style jsx global>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 ${color}22;
          }
          70% {
            box-shadow: 0 0 0 10px ${color}00;
          }
          100% {
            box-shadow: 0 0 0 0 ${color}00;
          }
        }
      `}</style>
    </div>
  )
}
