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

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function queryDatabase() {
  try {
    console.log('Querying frameworks...')
    const { data: frameworks, error: frameworkError } = await supabase
      .from('frameworks')
      .select('*')
    
    if (frameworkError) throw frameworkError
    console.log('Frameworks:', JSON.stringify(frameworks, null, 2))

    console.log('\nQuerying controls for first framework...')
    if (frameworks && frameworks.length > 0) {
      const { data: controls, error: controlError } = await supabase
        .from('controls')
        .select('*')
        .eq('framework_id', frameworks[0].id)
      
      if (controlError) throw controlError
      console.log('Controls:', JSON.stringify(controls, null, 2))
    }
  } catch (error) {
    console.error('Error querying database:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  queryDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Error:', error)
      process.exit(1)
    })
}
