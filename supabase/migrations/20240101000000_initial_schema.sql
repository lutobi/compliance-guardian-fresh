-- Enable uuid-ossp extension
create extension if not exists "uuid-ossp";

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
create policy "Enable read access for all users"
    on public.assessments for select
    using (true);

create policy "Enable insert for authenticated users"
    on public.assessments for insert
    with check (auth.uid() = created_by);

create policy "Enable update for assessment creators"
    on public.assessments for update
    using (auth.uid() = created_by)
    with check (auth.uid() = created_by);

-- Create policies for assessment_controls
create policy "Enable read access for all users"
    on public.assessment_controls for select
    using (true);

create policy "Enable insert for assessment creators"
    on public.assessment_controls for insert
    with check (auth.uid() = (select created_by from assessments where id = assessment_id));

create policy "Enable update for assigned users"
    on public.assessment_controls for update
    using (auth.uid() = assigned_to or auth.uid() = (select created_by from assessments where id = assessment_id))
    with check (auth.uid() = assigned_to or auth.uid() = (select created_by from assessments where id = assessment_id));

-- Create policies for evidence
create policy "Enable read access for all users"
    on public.evidence for select
    using (true);

create policy "Enable insert for assessment creators and assigned users"
    on public.evidence for insert
    with check (
        auth.uid() = uploaded_by and (
            auth.uid() = (
                select created_by 
                from assessments a 
                join assessment_controls ac on a.id = ac.assessment_id 
                where ac.id = assessment_control_id
            ) or
            auth.uid() = (
                select assigned_to 
                from assessment_controls 
                where id = assessment_control_id
            )
        )
    );

create policy "Enable update for evidence creators"
    on public.evidence for update
    using (auth.uid() = uploaded_by)
    with check (auth.uid() = uploaded_by);

create policy "Enable delete for evidence creators"
    on public.evidence for delete
    using (auth.uid() = uploaded_by);
