-- Create a function to execute SQL statements
create or replace function exec_sql(query text) returns void as $$
begin
  execute query;
end;
$$ language plpgsql security definer;
