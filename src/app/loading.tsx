import { ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8">
      <div className="flex flex-col items-center gap-4">
        <ShieldCheckIcon className="h-12 w-12 text-primary animate-pulse" />
        <div className="text-center">
          <h2 className="text-xl font-semibold text-text">Loading...</h2>
          <p className="mt-1 text-sm text-text-secondary">Please wait while we secure your content.</p>
        </div>
      </div>
    </main>
  )
}
