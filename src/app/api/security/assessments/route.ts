import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { AssessmentStatus, AssessmentType } from '@/types/security'

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const searchParams = new URL(request.url).searchParams
  const status = searchParams.get('status')
  const type = searchParams.get('type')

  try {
    let query = supabase
      .from('security_assessments')
      .select('*')

    if (status) {
      query = query.eq('status', status)
    }

    if (type) {
      query = query.eq('type', type)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching security assessments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch security assessments' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const body = await request.json()
    console.log('Received assessment data:', body)

    // Validate required fields
    const requiredFields = ['name', 'description', 'type', 'status', 'start_date']
    const missingFields = requiredFields.filter(field => !body[field])
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields)
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Validate type
    if (!Object.values(AssessmentType).includes(body.type)) {
      console.error('Invalid assessment type:', body.type)
      return NextResponse.json(
        { error: `Invalid assessment type. Must be one of: ${Object.values(AssessmentType).join(', ')}` },
        { status: 400 }
      )
    }

    // Validate status
    if (!Object.values(AssessmentStatus).includes(body.status)) {
      console.error('Invalid assessment status:', body.status)
      return NextResponse.json(
        { error: `Invalid assessment status. Must be one of: ${Object.values(AssessmentStatus).join(', ')}` },
        { status: 400 }
      )
    }

    // Ensure arrays are properly formatted
    const formattedData = {
      ...body,
      scope: Array.isArray(body.scope) ? body.scope : [],
      methodology: Array.isArray(body.methodology) ? body.methodology : [],
      assigned_to: Array.isArray(body.assigned_to) ? body.assigned_to : []
    }

    const { data, error } = await supabase
      .from('security_assessments')
      .insert(formattedData)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    console.log('Successfully created assessment:', data)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating security assessment:', error)
    return NextResponse.json(
      { error: 'Failed to create security assessment' },
      { status: 500 }
    )
  }
}
