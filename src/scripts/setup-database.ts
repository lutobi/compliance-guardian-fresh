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

console.log('Using Supabase URL:', supabaseUrl)

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function setup() {
  try {
    // Enable uuid-ossp extension
    console.log('Enabling uuid-ossp extension...')
    const { error: extensionError } = await supabase.rpc('enable_uuid_ossp')
    if (extensionError) {
      console.error('Error enabling uuid-ossp extension:', extensionError)
      throw extensionError
    }

    // Create stored procedures
    console.log('Creating stored procedures...')
    const { error: proceduresError } = await supabase.rpc('create_procedures')
    if (proceduresError) {
      console.error('Error creating stored procedures:', proceduresError)
      throw proceduresError
    }

    // Drop existing tables
    console.log('Dropping existing tables...')
    await supabase.from('controls').delete().neq('id', 'dummy')
    await supabase.from('frameworks').delete().neq('id', 'dummy')

    // Create frameworks table
    console.log('Creating frameworks table...')
    const { error: frameworksError } = await supabase
      .from('frameworks')
      .insert({
        id: '00000000-0000-0000-0000-000000000000',
        name: 'dummy',
        version: '0.0',
        description: 'dummy framework',
        is_default: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

    if (frameworksError) {
      // If error is not about table already existing, throw it
      if (!frameworksError.message.includes('does not exist')) {
        throw frameworksError
      }

      // Create the table
      const { error } = await supabase.rpc('create_frameworks_table', {
        sql: `
          create table public.frameworks (
            id uuid default uuid_generate_v4() primary key,
            name text not null,
            version text not null,
            description text,
            is_default boolean default false,
            created_at timestamptz default now(),
            updated_at timestamptz default now()
          );

          -- Enable RLS
          alter table public.frameworks enable row level security;

          -- Create policies
          create policy "Enable read access for all users"
            on public.frameworks for select
            using (true);

          create policy "Enable insert for service role"
            on public.frameworks for insert
            with check (true);

          create policy "Enable update for service role"
            on public.frameworks for update
            using (true)
            with check (true);

          -- Create index
          create index if not exists idx_frameworks_name on public.frameworks(name);
        `
      })

      if (error) {
        console.error('Error creating frameworks table:', error)
        throw error
      }
    }

    // Create controls table
    console.log('Creating controls table...')
    const { error: controlsError } = await supabase
      .from('controls')
      .insert({
        id: '00000000-0000-0000-0000-000000000000',
        framework_id: '00000000-0000-0000-0000-000000000000',
        control_id: 'dummy',
        title: 'dummy control',
        description: 'dummy control',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

    if (controlsError) {
      // If error is not about table already existing, throw it
      if (!controlsError.message.includes('does not exist')) {
        throw controlsError
      }

      // Create the table
      const { error } = await supabase.rpc('create_controls_table', {
        sql: `
          create table public.controls (
            id uuid default uuid_generate_v4() primary key,
            framework_id uuid references frameworks(id) on delete cascade,
            parent_control_id uuid references controls(id) on delete cascade,
            control_id text not null,
            title text not null,
            description text,
            created_at timestamptz default now(),
            updated_at timestamptz default now()
          );

          -- Enable RLS
          alter table public.controls enable row level security;

          -- Create policies
          create policy "Enable read access for all users"
            on public.controls for select
            using (true);

          create policy "Enable insert for service role"
            on public.controls for insert
            with check (true);

          create policy "Enable update for service role"
            on public.controls for update
            using (true)
            with check (true);

          -- Create indexes
          create index if not exists idx_controls_framework_id on public.controls(framework_id);
          create index if not exists idx_controls_parent_id on public.controls(parent_control_id);
          create index if not exists idx_controls_control_id on public.controls(control_id);
        `
      })

      if (error) {
        console.error('Error creating controls table:', error)
        throw error
      }
    }

    // Clean up dummy data
    await supabase.from('controls').delete().eq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('frameworks').delete().eq('id', '00000000-0000-0000-0000-000000000000')

    console.log('Database setup completed successfully!')
  } catch (error) {
    console.error('Database setup failed:', error)
    process.exit(1)
  }
}

setup()
