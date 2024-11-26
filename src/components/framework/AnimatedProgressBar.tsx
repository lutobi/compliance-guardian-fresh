'use client'

import { motion } from 'framer-motion'

interface AnimatedProgressBarProps {
  progress: number
  height?: number
  showPercentage?: boolean
  color?: string
}

export default function AnimatedProgressBar({
  progress,
  height = 24,
  showPercentage = true,
  color = 'var(--color-primary)'
}: AnimatedProgressBarProps) {
  return (
    <div className="w-full">
      <div
        className="relative w-full rounded-full overflow-hidden bg-surface-light"
        style={{ height: `${height}px` }}
      >
        {/* Background stripes animation */}
        <div
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              45deg,
              ${color}22,
              ${color}22 10px,
              ${color}44 10px,
              ${color}44 20px
            )`,
            animation: 'moveStripes 1s linear infinite',
          }}
        />

        {/* Main progress bar */}
        <motion.div
          className="absolute h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, 
              ${color}dd 0%,
              ${color} 50%,
              ${color}dd 100%
            )`,
            boxShadow: `0 0 10px ${color}66`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Shine effect */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
              animation: 'shine 2s linear infinite'
            }}
          />
        </motion.div>

        {/* Percentage text */}
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-end pr-3">
            <motion.span
              className="text-sm font-semibold text-white drop-shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {progress}%
            </motion.span>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes moveStripes {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 50px 0;
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          20% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 8px ${color}66;
          }
          50% {
            box-shadow: 0 0 16px ${color}88;
          }
          100% {
            box-shadow: 0 0 8px ${color}66;
          }
        }
      `}</style>
    </div>
  )
}
