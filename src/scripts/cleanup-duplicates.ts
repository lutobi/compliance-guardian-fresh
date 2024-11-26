import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing required environment variables')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function cleanupDuplicates() {
  console.log('Checking for duplicate frameworks...')
  
  // First, get all frameworks
  const { data: frameworks, error } = await supabase
    .from('frameworks')
    .select('*')
    .order('created_at', { ascending: true })
  
  if (error) {
    console.error('Error fetching frameworks:', error)
    return
  }

  // Create a map to track duplicates
  const frameworkMap = new Map()
  const duplicateIds = []

  frameworks?.forEach(framework => {
    const key = `${framework.name}-${framework.version}`
    if (frameworkMap.has(key)) {
      // This is a duplicate - keep the older one (first one we saw)
      duplicateIds.push(framework.id)
    } else {
      frameworkMap.set(key, framework)
    }
  })

  if (duplicateIds.length === 0) {
    console.log('No duplicates found!')
    return
  }

  console.log(`Found ${duplicateIds.length} duplicate frameworks. Cleaning up...`)

  // Delete duplicates and their associated controls
  const { error: deleteError } = await supabase
    .from('frameworks')
    .delete()
    .in('id', duplicateIds)

  if (deleteError) {
    console.error('Error deleting duplicates:', deleteError)
    return
  }

  console.log('Successfully cleaned up duplicate frameworks!')
}

cleanupDuplicates()
