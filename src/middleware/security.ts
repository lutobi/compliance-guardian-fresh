import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { rateLimitUtils, auditUtils } from '../utils/security'
import { AuditEventType } from '../types/security'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Rate limit configuration
const RATE_LIMIT = {
  window: 60 * 1000, // 1 minute in milliseconds
  max: 100 // maximum requests per window
}

// Paths that don't require rate limiting
const EXEMPT_PATHS = [
  '/_next',
  '/static',
  '/api/health'
]

/**
 * Middleware to handle rate limiting and audit logging
 */
export async function middleware(request: NextRequest) {
  // Skip rate limiting for exempt paths
  if (EXEMPT_PATHS.some(path => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next()
  }

  try {
    // Get user session
    const { data: { session } } = await supabase.auth.getSession()
    const userId = session?.user?.id

    // Create rate limit key based on IP or user ID
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const rateKey = userId ? `user_${userId}` : `ip_${ip}`

    // Check rate limit
    const isLimited = await rateLimitUtils.isRateLimited(
      rateKey,
      RATE_LIMIT.max,
      RATE_LIMIT.window
    )

    if (isLimited) {
      // Log rate limit event
      await auditUtils.log({
        userId,
        eventType: 'SECURITY_ALERT' as AuditEventType,
        eventData: {
          type: 'RATE_LIMIT_EXCEEDED',
          path: request.nextUrl.pathname,
          ip
        },
        ipAddress: ip,
        userAgent: request.headers.get('user-agent')
      })

      // Return rate limit response
      return new NextResponse(
        JSON.stringify({
          error: 'Too many requests',
          retryAfter: RATE_LIMIT.window / 1000
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': (RATE_LIMIT.window / 1000).toString()
          }
        }
      )
    }

    // Increment rate limit counter
    await rateLimitUtils.increment(rateKey)

    // Log API access for authenticated users
    if (userId) {
      await auditUtils.log({
        userId,
        eventType: 'API_ACCESS' as AuditEventType,
        eventData: {
          method: request.method,
          path: request.nextUrl.pathname,
          query: Object.fromEntries(request.nextUrl.searchParams)
        },
        ipAddress: ip,
        userAgent: request.headers.get('user-agent')
      })
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Security middleware error:', error)
    
    // Log error but allow request to proceed
    return NextResponse.next()
  }
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ]
}
