-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.rate_limit CASCADE;
DROP TABLE IF EXISTS public.audit_logs CASCADE;
DROP TABLE IF EXISTS public.password_history CASCADE;
DROP TABLE IF EXISTS public.user_mfa CASCADE;

-- Create user_mfa table
CREATE TABLE public.user_mfa (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    secret text NOT NULL,
    enabled boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Verify user_mfa table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'user_mfa';

-- Create password_history table
CREATE TABLE public.password_history (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    password_hash text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Verify password_history table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'password_history';

-- Create audit_logs table
CREATE TABLE public.audit_logs (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    event_type text NOT NULL,
    event_data text NOT NULL,
    ip_address text,
    user_agent text,
    timestamp timestamp with time zone DEFAULT timezone('utc'::text, now()),
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Verify audit_logs table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'audit_logs';

-- Create rate_limit table
CREATE TABLE public.rate_limit (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    key text NOT NULL,
    count integer DEFAULT 1,
    reset_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    UNIQUE(key)
);

-- Verify rate_limit table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'rate_limit';

-- Now create indexes one by one, verifying after each creation

-- Create and verify user_mfa index
CREATE INDEX idx_user_mfa_user_id ON public.user_mfa(user_id);
SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'user_mfa';

-- Create and verify password_history index
CREATE INDEX idx_password_history_user_id ON public.password_history(user_id);
SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'password_history';

-- Create and verify audit_logs indexes one by one
CREATE INDEX idx_audit_logs_user_id ON public.audit_logs(user_id);
SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'audit_logs';

CREATE INDEX idx_audit_logs_event_type ON public.audit_logs(event_type);
SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'audit_logs';

CREATE INDEX idx_audit_logs_timestamp ON public.audit_logs("timestamp");
SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'audit_logs';

-- Create and verify rate_limit indexes
CREATE INDEX idx_rate_limit_key ON public.rate_limit(key);
CREATE INDEX idx_rate_limit_reset_at ON public.rate_limit(reset_at);
SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'rate_limit';
