import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data, error } = await supabase.rpc(
      'get_assessment_with_vulnerabilities',
      {
        p_assessment_id: params.id,
      }
    )

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching security assessment:', error)
    return NextResponse.json(
      { error: 'Failed to fetch security assessment' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const json = await request.json()
    const { data, error } = await supabase
      .from('security_assessments')
      .update({
        ...json,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating security assessment:', error)
    return NextResponse.json(
      { error: 'Failed to update security assessment' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { error } = await supabase
      .from('security_assessments')
      .delete()
      .eq('id', params.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting security assessment:', error)
    return NextResponse.json(
      { error: 'Failed to delete security assessment' },
      { status: 500 }
    )
  }
}
