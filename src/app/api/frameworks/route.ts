import { NextResponse } from 'next/server'
import { frameworks } from '@/data/frameworks'

export async function GET() {
  try {
    return NextResponse.json(frameworks)
  } catch (error) {
    console.error('Error fetching frameworks:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    )
  }
}
