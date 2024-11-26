-- Create implementation_status table
create table if not exists public.implementation_status (
    id uuid default uuid_generate_v4() primary key,
    control_id uuid references controls(id) on delete cascade,
    status text not null check (status in ('not_started', 'in_progress', 'implemented', 'not_applicable')),
    progress integer not null check (progress >= 0 and progress <= 100),
    notes text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Create evidence table
create table if not exists public.evidence (
    id uuid default uuid_generate_v4() primary key,
    control_id uuid references controls(id) on delete cascade,
    title text not null,
    description text,
    file_url text not null,
    file_type text not null,
    uploaded_by uuid references auth.users(id) on delete set null,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Enable RLS
alter table public.implementation_status enable row level security;
alter table public.evidence enable row level security;

-- Create policies for implementation_status
create policy "Enable read access for all users"
    on public.implementation_status for select
    using (true);

create policy "Enable insert for authenticated users"
    on public.implementation_status for insert
    with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users"
    on public.implementation_status for update
    using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

-- Create policies for evidence
create policy "Enable read access for all users"
    on public.evidence for select
    using (true);

create policy "Enable insert for authenticated users"
    on public.evidence for insert
    with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users"
    on public.evidence for update
    using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

-- Create indexes
create index if not exists idx_implementation_status_control_id on public.implementation_status(control_id);
create index if not exists idx_evidence_control_id on public.evidence(control_id);
create index if not exists idx_evidence_uploaded_by on public.evidence(uploaded_by);
