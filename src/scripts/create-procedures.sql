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
