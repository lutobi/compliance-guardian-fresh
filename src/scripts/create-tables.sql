-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.controls;
DROP TABLE IF EXISTS public.frameworks;

-- Create frameworks table
CREATE TABLE public.frameworks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    version TEXT NOT NULL,
    description TEXT,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create controls table
CREATE TABLE public.controls (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    framework_id UUID REFERENCES public.frameworks(id) ON DELETE CASCADE,
    parent_control_id UUID REFERENCES public.controls(id) ON DELETE CASCADE,
    control_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.frameworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.controls ENABLE ROW LEVEL SECURITY;

-- Create policies for frameworks
CREATE POLICY "Enable read access for all users" ON public.frameworks
    FOR SELECT
    USING (true);

CREATE POLICY "Enable insert for service role" ON public.frameworks
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON public.frameworks
    FOR UPDATE
    USING (true)
    WITH CHECK (true);

-- Create policies for controls
CREATE POLICY "Enable read access for all users" ON public.controls
    FOR SELECT
    USING (true);

CREATE POLICY "Enable insert for service role" ON public.controls
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON public.controls
    FOR UPDATE
    USING (true)
    WITH CHECK (true);

-- Create indexes
CREATE INDEX idx_frameworks_name ON public.frameworks(name);
CREATE INDEX idx_controls_framework_id ON public.controls(framework_id);
CREATE INDEX idx_controls_parent_id ON public.controls(parent_control_id);
CREATE INDEX idx_controls_control_id ON public.controls(control_id);
