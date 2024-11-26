-- Function to enable uuid-ossp extension
create or replace function enable_uuid_ossp() returns void as $$
begin
  create extension if not exists "uuid-ossp";
end;
$$ language plpgsql security definer;

-- Function to create stored procedures
create or replace function create_procedures() returns void as $$
begin
  -- Create function to create frameworks table
  create or replace function create_frameworks_table(sql text) returns void as $$
  begin
    execute sql;
  end;
  $$ language plpgsql security definer;

  -- Create function to create controls table
  create or replace function create_controls_table(sql text) returns void as $$
  begin
    execute sql;
  end;
  $$ language plpgsql security definer;
end;
$$ language plpgsql security definer;
