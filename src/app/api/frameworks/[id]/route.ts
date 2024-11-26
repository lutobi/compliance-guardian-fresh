import { NextResponse } from 'next/server'
import { defaultFrameworks } from '@/data/frameworks'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Convert the framework name to a slug format for comparison
    const slug = params.id.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    
    // Find the framework by comparing the slugified name
    const framework = defaultFrameworks.find(f => 
      f.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
    )
    
    if (!framework) {
      return new NextResponse(
        JSON.stringify({ error: 'Framework not found' }),
        { status: 404 }
      )
    }

    // Transform the framework data
    const transformedFramework = {
      id: framework.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: framework.name,
      description: framework.description,
      controls: transformControls(framework.controls)
    }

    return NextResponse.json(transformedFramework)
  } catch (error) {
    console.error('Error fetching framework:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    )
  }
}

function transformControls(controls: any[]): any[] {
  return controls.flatMap(section => {
    if (!section.controls) return []
    
    return section.controls.map(control => {
      if (!control.id) {
        return transformControls(control.controls || [])[0]
      }

      return {
        id: control.id,
        name: control.title,
        description: control.description,
        children: control.subControls ? transformControls([{ controls: control.subControls }]) : undefined
      }
    }).filter(Boolean)
  })
}
