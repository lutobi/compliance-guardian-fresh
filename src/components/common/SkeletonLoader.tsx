interface SkeletonLoaderProps {
  className?: string
}

export default function SkeletonLoader({ className = '' }: SkeletonLoaderProps) {
  return (
    <div 
      className={`animate-pulse bg-surface-light rounded ${className}`}
      role="status"
      aria-label="Loading..."
    />
  )
}

export function FrameworkSkeleton() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <SkeletonLoader className="h-8 w-48" />
        <SkeletonLoader className="h-8 w-24" />
      </div>

      {/* Controls */}
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4 bg-surface rounded-lg">
            <div className="flex items-start gap-4">
              <SkeletonLoader className="h-5 w-5 rounded-full" />
              <div className="flex-1 space-y-2">
                <SkeletonLoader className="h-5 w-48" />
                <SkeletonLoader className="h-4 w-96" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AssessmentSkeleton() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <SkeletonLoader className="h-8 w-64" />
        <SkeletonLoader className="h-8 w-32" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="p-4 bg-surface rounded-lg">
            <div className="space-y-3">
              <SkeletonLoader className="h-6 w-48" />
              <SkeletonLoader className="h-4 w-full" />
              <div className="flex justify-between items-center pt-2">
                <SkeletonLoader className="h-4 w-24" />
                <SkeletonLoader className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
