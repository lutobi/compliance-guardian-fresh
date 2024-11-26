-- Add status columns to controls table
ALTER TABLE public.controls
ADD COLUMN IF NOT EXISTS status text CHECK (status IN ('not_started', 'in_progress', 'completed', 'failed')) DEFAULT 'not_started',
ADD COLUMN IF NOT EXISTS implementation_status text CHECK (implementation_status IN ('not_implemented', 'partially_implemented', 'implemented')) DEFAULT 'not_implemented';

-- Add status and evidence columns to subcontrols table
ALTER TABLE public.subcontrols
ADD COLUMN IF NOT EXISTS status text CHECK (status IN ('not_started', 'in_progress', 'completed', 'failed')) DEFAULT 'not_started',
ADD COLUMN IF NOT EXISTS evidence jsonb DEFAULT '[]'::jsonb;

-- Create audit_logs table for activity tracking
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    type text NOT NULL CHECK (type IN ('update', 'issue', 'complete', 'evidence', 'review')),
    framework_id uuid REFERENCES public.frameworks(id),
    control_id uuid REFERENCES public.controls(id),
    user_id uuid,
    details text,
    created_at timestamptz DEFAULT now()
);

-- Create tasks table for upcoming tasks
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

-- Add some sample data
INSERT INTO public.tasks (title, due_date, priority, framework_id, control_id)
SELECT 
    'Review ' || c.title,
    now() + (random() * interval '30 days'),
    (ARRAY['low', 'medium', 'high'])[floor(random() * 3 + 1)],
    c.framework_id,
    c.id
FROM public.controls c
LIMIT 10;

-- Add some sample audit logs
INSERT INTO public.audit_logs (type, framework_id, control_id, details)
SELECT 
    (ARRAY['update', 'issue', 'complete', 'evidence', 'review'])[floor(random() * 5 + 1)],
    c.framework_id,
    c.id,
    'Automated audit log entry'
FROM public.controls c
LIMIT 20;

-- Update some controls with random statuses
UPDATE public.controls
SET 
    status = (ARRAY['not_started', 'in_progress', 'completed', 'failed'])[floor(random() * 4 + 1)],
    implementation_status = (ARRAY['not_implemented', 'partially_implemented', 'implemented'])[floor(random() * 3 + 1)]
WHERE id IN (
    SELECT id FROM public.controls ORDER BY random() LIMIT (SELECT count(*) / 2 FROM public.controls)
);
