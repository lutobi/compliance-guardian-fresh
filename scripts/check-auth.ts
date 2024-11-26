import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkAuth() {
  try {
    // Try to sign in
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: process.argv[2],
      password: process.argv[3]
    })

    if (signInError) {
      console.error('Sign in error:', signInError.message)
      return
    }

    console.log('Sign in successful!')
    console.log('User:', {
      id: signInData.user?.id,
      email: signInData.user?.email,
      emailConfirmed: signInData.user?.email_confirmed_at ? 'Yes' : 'No',
      lastSignIn: signInData.user?.last_sign_in_at,
      metadata: signInData.user?.user_metadata
    })

    console.log('Session:', {
      accessToken: signInData.session?.access_token ? 'Present' : 'Missing',
      refreshToken: signInData.session?.refresh_token ? 'Present' : 'Missing',
      expiresAt: signInData.session?.expires_at
    })

  } catch (error) {
    console.error('Unexpected error:', error)
  } finally {
    process.exit(0)
  }
}

if (process.argv.length < 4) {
  console.log('Usage: ts-node check-auth.ts <email> <password>')
  process.exit(1)
}

checkAuth()
