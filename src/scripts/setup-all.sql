-- Enable uuid-ossp extension
create extension if not exists "uuid-ossp";

-- Create exec_sql function
create or replace function exec_sql(query text) returns void as $$
begin
  execute query;
end;
$$ language plpgsql;

-- Drop existing tables if they exist
drop table if exists public.evidence;
drop table if exists public.assessment_controls;
drop table if exists public.assessments;
drop table if exists public.controls;
drop table if exists public.frameworks;

-- Create frameworks table
create table public.frameworks (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    version text not null,
    description text,
    is_default boolean default false,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Create controls table
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

-- Create assessments table
create table public.assessments (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    description text,
    framework_id uuid references frameworks(id) on delete cascade,
    start_date timestamptz not null default now(),
    end_date timestamptz,
    status text not null default 'in_progress',
    created_by uuid references auth.users(id),
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    constraint valid_status check (status in ('planned', 'in_progress', 'completed', 'archived'))
);

-- Create assessment_controls table for tracking control status
create table public.assessment_controls (
    id uuid default uuid_generate_v4() primary key,
    assessment_id uuid references assessments(id) on delete cascade,
    control_id uuid references controls(id) on delete cascade,
    status text not null default 'not_started',
    notes text,
    assigned_to uuid references auth.users(id),
    due_date timestamptz,
    completed_at timestamptz,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    constraint valid_status check (status in ('not_started', 'in_progress', 'implemented', 'not_applicable', 'not_compliant'))
);

-- Create evidence table
create table public.evidence (
    id uuid default uuid_generate_v4() primary key,
    assessment_control_id uuid references assessment_controls(id) on delete cascade,
    title text not null,
    description text,
    file_url text,
    file_type text,
    uploaded_by uuid references auth.users(id),
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.frameworks enable row level security;
alter table public.controls enable row level security;
alter table public.assessments enable row level security;
alter table public.assessment_controls enable row level security;
alter table public.evidence enable row level security;

-- Create policies for frameworks
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

-- Create policies for controls
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

-- Create policies for assessments
create policy "Enable read access for authenticated users"
    on public.assessments for select
    using (auth.role() = 'authenticated');

create policy "Enable insert for authenticated users"
    on public.assessments for insert
    with check (auth.uid() = created_by);

create policy "Enable update for assessment creator"
    on public.assessments for update
    using (auth.uid() = created_by)
    with check (auth.uid() = created_by);

-- Create policies for assessment_controls
create policy "Enable read access for assessment members"
    on public.assessment_controls for select
    using (
        exists (
            select 1 from assessments a
            where a.id = assessment_id
            and (a.created_by = auth.uid() or assessment_controls.assigned_to = auth.uid())
        )
    );

create policy "Enable insert for assessment creator"
    on public.assessment_controls for insert
    with check (
        exists (
            select 1 from assessments a
            where a.id = assessment_id
            and a.created_by = auth.uid()
        )
    );

create policy "Enable update for assigned users"
    on public.assessment_controls for update
    using (auth.uid() = assigned_to or auth.uid() = (select created_by from assessments where id = assessment_id))
    with check (auth.uid() = assigned_to or auth.uid() = (select created_by from assessments where id = assessment_id));

-- Create policies for evidence
create policy "Enable read access for assessment members"
    on public.evidence for select
    using (
        exists (
            select 1 from assessment_controls ac
            join assessments a on ac.assessment_id = a.id
            where ac.id = evidence.assessment_control_id
            and (a.created_by = auth.uid() or ac.assigned_to = auth.uid())
        )
    );

create policy "Enable insert for assigned users"
    on public.evidence for insert
    with check (
        exists (
            select 1 from assessment_controls ac
            join assessments a on ac.assessment_id = a.id
            where ac.id = assessment_control_id
            and (ac.assigned_to = auth.uid() or a.created_by = auth.uid())
        )
    );

create policy "Enable update for evidence creator"
    on public.evidence for update
    using (uploaded_by = auth.uid())
    with check (uploaded_by = auth.uid());

-- Create indexes
create index if not exists idx_frameworks_name on public.frameworks(name);
create index if not exists idx_controls_framework_id on public.controls(framework_id);
create index if not exists idx_controls_parent_id on public.controls(parent_control_id);
create index if not exists idx_controls_control_id on public.controls(control_id);
create index if not exists idx_assessments_framework_id on public.assessments(framework_id);
create index if not exists idx_assessments_created_by on public.assessments(created_by);
create index if not exists idx_assessment_controls_assessment_id on public.assessment_controls(assessment_id);
create index if not exists idx_assessment_controls_control_id on public.assessment_controls(control_id);
create index if not exists idx_assessment_controls_assigned_to on public.assessment_controls(assigned_to);
create index if not exists idx_evidence_assessment_control_id on public.evidence(assessment_control_id);
create index if not exists idx_evidence_uploaded_by on public.evidence(uploaded_by);
