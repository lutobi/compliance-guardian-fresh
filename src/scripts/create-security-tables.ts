import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { PostgrestError } from '@supabase/supabase-js'

// Load environment variables
dotenv.config()

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function createTable(tableName: string, query: string) {
  try {
    // Check if table exists
    const { error } = await supabase.from(tableName).select('*').limit(1)
    
    if (error && (error as PostgrestError).message.includes('does not exist')) {
      // Create table using Management API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            'Prefer': 'return=minimal'
          },
          body: query
        }
      )

      if (!response.ok) {
        throw new Error(`Failed to create table ${tableName}: ${await response.text()}`)
      }

      console.log(`Created ${tableName} table`)
    }
  } catch (error) {
    console.error(`Error creating ${tableName} table:`, error)
    throw error
  }
}

async function createSecurityTables() {
  try {
    // Create user_mfa table
    await createTable('user_mfa', `
      CREATE TABLE IF NOT EXISTS user_mfa (
        id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
        secret text NOT NULL,
        enabled boolean DEFAULT false,
        created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
        updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
      );
    `)

    // Create password_history table
    await createTable('password_history', `
      CREATE TABLE IF NOT EXISTS password_history (
        id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
        password_hash text NOT NULL,
        created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
      );
    `)

    // Create audit_logs table
    await createTable('audit_logs', `
      CREATE TABLE IF NOT EXISTS audit_logs (
        id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
        event_type text NOT NULL,
        event_data text NOT NULL,
        ip_address text,
        user_agent text,
        timestamp timestamp with time zone DEFAULT timezone('utc'::text, now()),
        created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
      );
    `)

    // Create rate_limit table
    await createTable('rate_limit', `
      CREATE TABLE IF NOT EXISTS rate_limit (
        id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        key text NOT NULL,
        count integer DEFAULT 1,
        reset_at timestamp with time zone NOT NULL,
        created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
        updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
        UNIQUE(key)
      );
    `)

    // Create indexes
    const indexes = [
      'CREATE INDEX IF NOT EXISTS idx_user_mfa_user_id ON user_mfa(user_id);',
      'CREATE INDEX IF NOT EXISTS idx_password_history_user_id ON password_history(user_id);',
      'CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);',
      'CREATE INDEX IF NOT EXISTS idx_audit_logs_event_type ON audit_logs(event_type);',
      'CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON audit_logs(timestamp);',
      'CREATE INDEX IF NOT EXISTS idx_rate_limit_key ON rate_limit(key);',
      'CREATE INDEX IF NOT EXISTS idx_rate_limit_reset_at ON rate_limit(reset_at);'
    ]

    for (const index of indexes) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            'Prefer': 'return=minimal'
          },
          body: index
        }
      )

      if (!response.ok) {
        console.warn(`Warning: Failed to create index: ${await response.text()}`)
      }
    }

    console.log('Successfully created security tables and indexes')
  } catch (error) {
    console.error('Error creating security tables:', error)
    throw error
  }
}

// Run the script
createSecurityTables()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
