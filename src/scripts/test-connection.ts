import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Required environment variables are not set')
}

console.log('Using Supabase URL:', supabaseUrl)

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function testConnection() {
  try {
    // Try to create a test table directly
    const { error: createError } = await supabase
      .from('frameworks')
      .insert({
        name: 'Test Framework',
        version: '1.0',
        description: 'Test framework for connection verification',
        is_default: false
      })

    if (createError) {
      console.error('Error creating test record:', createError)
      throw createError
    }

    console.log('Successfully connected to database and created test record')

  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

testConnection()
