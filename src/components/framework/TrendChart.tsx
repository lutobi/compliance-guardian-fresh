'use client'

import { motion } from 'framer-motion'

interface Point {
  x: number
  y: number
}

interface TrendChartProps {
  data: Array<{ date: string; value: number }>
  height?: number
  color?: string
}

export default function TrendChart({ 
  data, 
  height = 40, 
  color = '#0EA5E9' 
}: TrendChartProps) {
  // Ensure we have valid data
  const validData = data.filter(point => !isNaN(point.value))
  if (validData.length === 0) return null

  // Convert data points to coordinates
  const points: Point[] = validData.map((point, index) => ({
    x: (index / (validData.length - 1)) * 100,
    y: Math.max(0, Math.min(100 - point.value, 100)) // Clamp between 0 and 100
  }))

  // Generate SVG path commands
  const pathCommands = points.reduce((commands, point, index) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`
    }
    const prevPoint = points[index - 1]
    const controlX1 = prevPoint.x + (point.x - prevPoint.x) / 3
    const controlX2 = prevPoint.x + (point.x - prevPoint.x) * 2/3
    return `${commands} C ${controlX1} ${prevPoint.y}, ${controlX2} ${point.y}, ${point.x} ${point.y}`
  }, '')

  const fillPathCommands = `${pathCommands} L ${points[points.length - 1].x} 100 L 0 100 Z`

  return (
    <div style={{ height: `${height}px` }} className="w-full relative">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full"
        style={{ transform: 'scaleY(-1)' }}
      >
        {/* Gradient fill */}
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Fill area */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          d={fillPathCommands}
          fill="url(#gradient)"
        />

        {/* Line */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          d={pathCommands}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Data points */}
        {points.map((point, index) => (
          <motion.circle
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            cx={point.x}
            cy={point.y}
            r="2"
            fill={color}
          />
        ))}
      </svg>
    </div>
  )
}
