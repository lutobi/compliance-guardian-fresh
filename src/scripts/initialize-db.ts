import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

// Initialize connection details
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Required environment variables are not set')
}

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function checkTablesExist() {
  const tables = ['frameworks', 'controls']
  
  for (const table of tables) {
    const { error } = await supabase.from(table).select('id').limit(1)
    if (error?.code === '42P01') {
      throw new Error(`Table ${table} does not exist. Please run the database-functions.sql script in Supabase SQL Editor first.`)
    }
  }
}

async function main() {
  try {
    console.log('Starting database initialization...')

    // Check if tables exist
    console.log('Checking if tables exist...')
    await checkTablesExist()

    // Run the seed script
    console.log('Running seed script...')
    const { seedFrameworks } = await import('./seed-frameworks')
    await seedFrameworks()

    console.log('Database initialization completed successfully')
  } catch (error) {
    console.error('Error initializing database:', error)
    process.exit(1)
  }
}

main()
