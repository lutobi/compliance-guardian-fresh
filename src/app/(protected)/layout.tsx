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
          router.push(`/auth/signin?next=${pathname}`)
          return
        }
        setLoading(false)
      } catch (error) {
        console.error('Error checking auth:', error)
        router.push('/auth/signin')
      }
    }

    checkAuth()
  }, [pathname, router, supabase.auth])

  if (loading) {
    return <LoadingState />
  }

  return (
    <ErrorBoundary>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <MobileNav />
          <main className="relative flex-1 p-4 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </ErrorBoundary>
  )
}
