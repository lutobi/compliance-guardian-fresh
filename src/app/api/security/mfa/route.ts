import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { mfaUtils, auditUtils } from '@/utils/security'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Get MFA status for current user
 * GET /api/security/mfa
 */
export async function GET(request: NextRequest) {
  try {
    // Get user session
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get MFA status
    const status = await mfaUtils.getStatus(session.user.id)
    return NextResponse.json({ data: status })
  } catch (error) {
    console.error('Error getting MFA status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Enable MFA for current user
 * POST /api/security/mfa/enable
 */
export async function POST(request: NextRequest) {
  try {
    // Get user session
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Enable MFA
    const mfa = await mfaUtils.enable(session.user.id)

    // Log the event
    await auditUtils.log({
      userId: session.user.id,
      eventType: 'MFA_ENABLE',
      eventData: { success: true },
      ipAddress: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent')
    })

    return NextResponse.json({ data: mfa })
  } catch (error) {
    console.error('Error enabling MFA:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Disable MFA for current user
 * DELETE /api/security/mfa
 */
export async function DELETE(request: NextRequest) {
  try {
    // Get user session
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Disable MFA
    await mfaUtils.disable(session.user.id)

    // Log the event
    await auditUtils.log({
      userId: session.user.id,
      eventType: 'MFA_DISABLE',
      eventData: { success: true },
      ipAddress: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent')
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error disabling MFA:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
