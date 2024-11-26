import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
      const supabase = createRouteHandlerClient({ cookies })
      await supabase.auth.exchangeCodeForSession(code)
    }

    // Get the intended destination from the URL parameters
    const redirectTo = requestUrl.searchParams.get('next') || '/dashboard'
    return NextResponse.redirect(new URL(redirectTo, requestUrl.origin))
  } catch (error) {
    console.error('Auth callback error:', error)
    // Redirect to sign in page if there's an error
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }
}
