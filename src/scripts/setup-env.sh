#!/bin/bash

# Read environment variables from .env.local
if [ -f .env.local ]; then
  export $(cat .env.local | grep -v '^#' | xargs)
  
  # Set Supabase URL and service role key
  export SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
  export SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY
  
  # Run setup script
  ./src/scripts/setup-supabase.sh
else
  echo "Error: .env.local file not found"
  exit 1
fi
