'use client'

import { Component, ReactNode } from 'react'
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  private getErrorDetails() {
    const message = this.state.error?.message || 'An unexpected error occurred'
    
    if (message.startsWith('Database error:')) {
      return {
        title: 'Database Error',
        description: message,
        hint: 'This could be due to a connection issue or the requested resource may not exist.',
        action: 'Try Again'
      }
    }
    
    if (message.includes('Network') || message.includes('fetch')) {
      return {
        title: 'Network Error',
        description: 'Unable to connect to the server',
        hint: 'Please check your internet connection and try again.',
        action: 'Retry Connection'
      }
    }
    
    if (message.includes('Authentication')) {
      return {
        title: 'Authentication Error',
        description: message,
        hint: 'Your session may have expired. Please try signing in again.',
        action: 'Sign In'
      }
    }
    
    return {
      title: 'Unexpected Error',
      description: message,
      hint: 'We\'ve logged this error and will look into it.',
      action: 'Refresh Page'
    }
  }

  render() {
    if (this.state.hasError) {
      const { title, description, hint, action } = this.getErrorDetails()
      
      return (
        <div className="min-h-screen bg-background px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
          <div className="max-w-max mx-auto text-center">
            <main className="sm:flex sm:items-center sm:flex-col">
              <div className="flex justify-center items-center mb-8">
                <div className="rounded-full bg-surface-light p-3">
                  <ExclamationTriangleIcon className="h-10 w-10 text-primary" />
                </div>
              </div>
              
              <div className="mt-4">
                <h1 className="text-4xl font-bold text-text tracking-tight sm:text-5xl">
                  {title}
                </h1>
                <p className="mt-4 text-base text-text-secondary">
                  {description}
                </p>
                {hint && (
                  <p className="mt-2 text-sm text-text-secondary">
                    {hint}
                  </p>
                )}
                <div className="mt-8">
                  <button
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-text bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <ArrowPathIcon className="h-5 w-5 mr-2" />
                    {action}
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
