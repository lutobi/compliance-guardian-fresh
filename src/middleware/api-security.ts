import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { RateLimiter } from '@/utils/security'

// Create a global rate limiter instance
const apiRateLimiter = new RateLimiter(100, 60000) // 100 requests per minute

// Security headers
const securityHeaders = {
  'Content-Security-Policy': 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self' data:; " +
    "connect-src 'self' https://*.supabase.co",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
}

// CORS configuration
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400'
}

export async function apiSecurityMiddleware(
  request: NextRequest,
  response: NextResponse
) {
  // Get client IP
  const clientIp = request.ip || 'unknown'
  const rateLimitKey = `${clientIp}:${request.nextUrl.pathname}`

  // Check rate limit
  if (apiRateLimiter.isRateLimited(rateLimitKey)) {
    return new NextResponse(
      JSON.stringify({ error: 'Too many requests' }),
      { 
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
          ...securityHeaders
        }
      }
    )
  }

  // Validate request
  if (!isValidRequest(request)) {
    return new NextResponse(
      JSON.stringify({ error: 'Invalid request' }),
      { 
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
          ...securityHeaders
        }
      }
    )
  }

  // Add security headers to response
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Add CORS headers to response
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

function isValidRequest(request: NextRequest): boolean {
  // Check content type for POST/PUT requests
  if (['POST', 'PUT'].includes(request.method)) {
    const contentType = request.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      return false
    }
  }

  // Check request size (10MB limit)
  const contentLength = parseInt(request.headers.get('content-length') || '0')
  if (contentLength > 10 * 1024 * 1024) {
    return false
  }

  // Check for required headers
  if (!request.headers.get('user-agent')) {
    return false
  }

  return true
}
