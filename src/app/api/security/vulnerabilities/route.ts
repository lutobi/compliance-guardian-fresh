import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const json = await request.json()
    const { data, error } = await supabase.rpc('create_vulnerability', {
      p_assessment_id: json.assessmentId,
      p_title: json.title,
      p_description: json.description,
      p_severity: json.severity,
      p_status: json.status,
      p_affected_components: json.affected_components,
      p_proof_of_concept: json.proof_of_concept,
      p_remediation_steps: json.remediation_steps,
      p_cvss_score: json.cvss_score,
      p_cwe_id: json.cwe_id,
      p_assigned_to: json.assigned_to,
      p_remediation_deadline: json.remediation_deadline,
    })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating vulnerability:', error)
    return NextResponse.json(
      { error: 'Failed to create vulnerability' },
      { status: 500 }
    )
  }
}
