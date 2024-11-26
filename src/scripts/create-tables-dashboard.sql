-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create a function to execute SQL statements
create or replace function exec_sql(query text) returns void as $$
begin
  execute query;
end;
$$ language plpgsql security definer;

-- Drop existing tables if they exist
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

-- Enable Row Level Security
alter table public.frameworks enable row level security;
alter table public.controls enable row level security;

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

-- Create indexes
create index if not exists idx_frameworks_name on public.frameworks(name);
create index if not exists idx_controls_framework_id on public.controls(framework_id);
create index if not exists idx_controls_parent_id on public.controls(parent_control_id);
create index if not exists idx_controls_control_id on public.controls(control_id);
