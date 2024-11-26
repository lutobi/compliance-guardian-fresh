import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { auditUtils, mfaUtils, rateLimitUtils } from '@/utils/security'
import { AuditEventType } from '@/types/security'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Get audit logs with optional filters
 * GET /api/security/audit-logs?userId=123&eventType=LOGIN
 */
export async function GET(request: NextRequest) {
  try {
    // Get user session
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const eventType = searchParams.get('eventType') as AuditEventType | null
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100)

    // Get audit logs
    const logs = await auditUtils.getAuditLogs(
      userId || undefined,
      eventType || undefined
    )

    // Basic pagination
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedLogs = logs.slice(start, end)

    return NextResponse.json({
      data: paginatedLogs,
      pagination: {
        total: logs.length,
        page,
        limit,
        totalPages: Math.ceil(logs.length / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching audit logs:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
