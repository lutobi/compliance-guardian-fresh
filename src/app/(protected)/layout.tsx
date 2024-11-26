'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import LoadingState from '@/components/common/LoadingState'
import { Sidebar } from '@/components/sidebar/sidebar'
import { MobileNav } from '@/components/mobile-nav'
import { Icons } from '@/components/ui/icons'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          router.push('/auth/signin')
          return
        }
        setLoading(false)
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/auth/signin')
      }
    }
    checkAuth()
  }, [router, supabase.auth])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingState message="Loading..." />
      </div>
    )
  }

  // Get the current page title from the pathname
  const getPageTitle = () => {
    const path = pathname.split('/')
    const lastSegment = path[path.length - 1]
    return lastSegment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar className="w-64 hidden md:flex" />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="flex items-center gap-4">
              <MobileNav />
              <Link
                href="/"
                className="flex items-center gap-2 font-semibold hidden md:flex"
              >
                <Icons.shield className="h-6 w-6 text-primary" />
                <span>Compliance Guardian</span>
              </Link>
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">
          <div className="container py-6">
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  )
}
