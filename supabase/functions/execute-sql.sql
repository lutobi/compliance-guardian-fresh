-- Create a function to execute SQL statements
create or replace function execute_sql(query text)
returns json
language plpgsql
security definer
as $$
begin
  execute query;
  return json_build_object('success', true);
exception when others then
  return json_build_object(
    'success', false,
    'error', SQLERRM,
    'detail', SQLSTATE
  );
end;
$$;
