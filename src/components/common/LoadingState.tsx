interface LoadingStateProps {
  message?: string
}

export default function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-surface-light rounded-full"></div>
        <div className="w-12 h-12 border-4 border-primary rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
      </div>
      <p className="mt-4 text-sm text-text-secondary">{message}</p>
    </div>
  )
}
