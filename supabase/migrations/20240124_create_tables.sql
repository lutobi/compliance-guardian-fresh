-- Create frameworks table
CREATE TABLE IF NOT EXISTS public.frameworks (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    version text,
    description text,
    is_default boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create controls table
CREATE TABLE IF NOT EXISTS public.controls (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    framework_id uuid REFERENCES public.frameworks(id),
    control_id text NOT NULL,
    title text NOT NULL,
    description text,
    status text CHECK (status IN ('not_started', 'in_progress', 'completed', 'failed')) DEFAULT 'not_started',
    implementation_status text CHECK (implementation_status IN ('not_implemented', 'partially_implemented', 'implemented')) DEFAULT 'not_implemented',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create subcontrols table
CREATE TABLE IF NOT EXISTS public.subcontrols (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    control_id uuid REFERENCES public.controls(id),
    title text NOT NULL,
    description text,
    status text CHECK (status IN ('not_started', 'in_progress', 'completed', 'failed')) DEFAULT 'not_started',
    evidence jsonb DEFAULT '[]'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create audit_logs table
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    type text NOT NULL CHECK (type IN ('update', 'issue', 'complete', 'evidence', 'review')),
    framework_id uuid REFERENCES public.frameworks(id),
    control_id uuid REFERENCES public.controls(id),
    user_id uuid,
    details text,
    created_at timestamptz DEFAULT now()
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    description text,
    due_date timestamptz NOT NULL,
    priority text CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
    framework_id uuid REFERENCES public.frameworks(id),
    control_id uuid REFERENCES public.controls(id),
    assigned_to uuid,
    status text CHECK (status IN ('pending', 'in_progress', 'completed', 'overdue')) DEFAULT 'pending',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create RLS policies
ALTER TABLE public.frameworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.controls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcontrols ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON public.frameworks
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON public.controls
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON public.subcontrols
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON public.audit_logs
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON public.tasks
    FOR SELECT USING (true);
