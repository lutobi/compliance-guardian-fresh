import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds
const MAX_REQUESTS = 1000 // Maximum requests per window

export async function rateLimitMiddleware(req: NextRequest) {
  try {
    // Create a Supabase client
    const supabase = createMiddlewareClient({ req, res: NextResponse.next() })
    
    // Get client IP
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown'
    const key = `rate_limit:${ip}`

    // Call the rate limit function
    const { data, error } = await supabase.rpc('increment_rate_limit', {
      key_param: key,
    })

    if (error) {
      console.error('Rate limit error:', error)
      // Continue even if rate limiting fails
      return NextResponse.next()
    }

    // Get current count
    const { data: limitData } = await supabase
      .from('rate_limit')
      .select('count')
      .eq('key', key)
      .single()

    if (limitData && limitData.count > MAX_REQUESTS) {
      return new NextResponse(
        JSON.stringify({
          error: 'Too many requests',
          message: 'Please try again later',
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    }

    return NextResponse.next()
  } catch (err) {
    console.error('Rate limit middleware error:', err)
    // Continue even if rate limiting fails
    return NextResponse.next()
  }
}
