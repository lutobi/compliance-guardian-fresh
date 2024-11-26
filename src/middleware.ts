import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req: request, res })

    // Refresh session if expired
    await supabase.auth.getSession()

    // Skip middleware for root path and marketing pages
    if (request.nextUrl.pathname === '/') {
      return res
    }

    // Only protect specific routes
    const protectedPaths = ['/dashboard', '/organizations', '/frameworks', '/security', '/assessments']
    const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))

    if (!isProtectedPath) {
      return res
    }

    // Check authentication for protected routes
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session && isProtectedPath) {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }

    // Only apply rate limiting to API routes
    if (request.nextUrl.pathname.startsWith('/api')) {
      // Rate limiting for API routes
      const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
      const key = `rate_limit:${ip}`

      // Call the rate limit function
      const { error: rateError } = await supabase.rpc('increment_rate_limit', {
        key_param: key,
      })

      if (rateError) {
        console.error('Rate limit error:', rateError)
        return res
      }

      // Get current count
      const { data: limitData } = await supabase
        .from('rate_limit')
        .select('count')
        .eq('key', key)
        .single()

      if (limitData?.count > 1000) { // 1000 requests per hour
        return new NextResponse(
          JSON.stringify({
            error: 'Too many requests',
            message: 'Please try again later',
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': '3600',
            },
          }
        )
      }
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
