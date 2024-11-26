import { createClient } from '@supabase/supabase-js'
import { defaultFrameworks } from '../data/complete-frameworks'
import { additionalFrameworks } from '../data/additional-frameworks'
import { FrameworkData, ControlData, ControlItemData } from '../types/framework-data.types'
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

async function processControlItems(
  items: ControlItemData[],
  frameworkId: string,
  parentControlId?: string
) {
  for (const item of items) {
    // Insert control
    const { data: controlData, error: controlError } = await supabase
      .from('controls')
      .insert({
        framework_id: frameworkId,
        parent_control_id: parentControlId,
        control_id: item.id,
        title: item.title,
        description: item.description,
      })
      .select()
      .single()

    if (controlError) throw controlError

    console.log(
      `Successfully inserted control: ${item.id} with ID: ${controlData.id}`
    )

    // Process subControls if they exist
    if (item.subControls && item.subControls.length > 0) {
      await processControlItems(item.subControls, frameworkId, controlData.id)
    }

    // Process nested controls if they exist
    if (item.controls && item.controls.length > 0) {
      await processControlItems(item.controls, frameworkId, controlData.id)
    }
  }
}

async function processControls(
  controls: ControlData[],
  frameworkId: string
) {
  for (const control of controls) {
    if (control.controls) {
      await processControlItems(control.controls, frameworkId)
    }
  }
}

async function seedFramework(framework: FrameworkData) {
  console.log(`Processing framework: ${framework.name}`)

  // Check if framework already exists
  const { data: existingFramework, error: checkError } = await supabase
    .from('frameworks')
    .select('id')
    .eq('name', framework.name)
    .eq('version', framework.version)
    .single()

  if (checkError && checkError.code !== 'PGRST116') {
    throw checkError
  }

  if (existingFramework) {
    console.log(`Framework ${framework.name} already exists, skipping...`)
    return
  }

  // Insert framework
  const { data: frameworkData, error: frameworkError } = await supabase
    .from('frameworks')
    .insert({
      name: framework.name,
      version: framework.version,
      description: framework.description,
      is_default: true
    })
    .select()
    .single()

  if (frameworkError) throw frameworkError

  console.log(
    `Successfully inserted framework: ${framework.name} with ID: ${frameworkData.id}`
  )

  // Process all controls
  await processControls(framework.controls, frameworkData.id)
}

export async function seedFrameworks() {
  try {
    console.log('Starting framework seeding...')

    // Process default frameworks
    for (const framework of defaultFrameworks) {
      await seedFramework(framework)
    }

    // Process additional frameworks
    for (const framework of additionalFrameworks) {
      await seedFramework(framework)
    }

    console.log('Framework seeding completed successfully')
  } catch (error) {
    console.error('Error seeding frameworks:', error)
    throw error
  }
}

// Run if called directly
if (require.main === module) {
  seedFrameworks()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Error:', error)
      process.exit(1)
    })
}
