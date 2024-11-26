'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background">
          <div className="mx-auto max-w-md text-center">
            <h2 className="mb-4 text-2xl font-bold text-text">
              A critical error occurred!
            </h2>
            <p className="mb-8 text-text-secondary">
              {error.message || 'The application encountered a critical error. Please try again.'}
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => reset()}
                variant="default"
              >
                Try again
              </Button>
              <Button
                onClick={() => window.location.href = '/'}
                variant="outline"
              >
                Go home
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
