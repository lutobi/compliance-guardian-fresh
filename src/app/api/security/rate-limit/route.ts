import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { rateLimitUtils, auditUtils } from '@/utils/security'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Get current rate limits
 * GET /api/security/rate-limit
 */
export async function GET(request: NextRequest) {
  try {
    // Get user session
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get rate limits from database
    const { data, error } = await supabase
      .from('rate_limit')
      .select()
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error getting rate limits:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Reset rate limit for a specific key
 * DELETE /api/security/rate-limit?key=user_123
 */
export async function DELETE(request: NextRequest) {
  try {
    // Get user session
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get key from query params
    const key = request.nextUrl.searchParams.get('key')
    if (!key) {
      return NextResponse.json(
        { error: 'Key parameter is required' },
        { status: 400 }
      )
    }

    // Delete rate limit entry
    const { error } = await supabase
      .from('rate_limit')
      .delete()
      .eq('key', key)

    if (error) throw error

    // Log the event
    await auditUtils.log({
      userId: session.user.id,
      eventType: 'SECURITY_ALERT',
      eventData: {
        type: 'RATE_LIMIT_RESET',
        key
      },
      ipAddress: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent')
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error resetting rate limit:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
