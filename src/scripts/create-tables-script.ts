import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing required environment variables. Please check your .env.local file.')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createTables() {
  console.log('Creating database tables...')
  
  try {
    // Read the SQL file
    const sqlPath = path.resolve(__dirname, 'create-tables.sql')
    const sql = fs.readFileSync(sqlPath, 'utf8')

    // Execute the SQL using the REST API
    const { data, error } = await supabase.from('_sql').select('*').execute(sql)
    
    if (error) {
      console.error('Error executing SQL:', error)
      throw error
    }

    console.log('Database tables created successfully')
    return data
  } catch (error) {
    console.error('Error creating tables:', error)
    throw error
  }
}

createTables().catch(console.error)
