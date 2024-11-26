-- Function to safely increment rate limit count and check limits
CREATE OR REPLACE FUNCTION public.increment_rate_limit(
    key_param text,
    max_requests integer DEFAULT 100,  -- Default max requests per window
    window_seconds integer DEFAULT 3600  -- Default window of 1 hour in seconds
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    current_record public.rate_limit;
    remaining integer;
    is_exceeded boolean;
    reset_time timestamptz;
BEGIN
    -- Get current rate limit record with FOR UPDATE to prevent race conditions
    SELECT * INTO current_record
    FROM public.rate_limit
    WHERE key = key_param
    FOR UPDATE;

    -- Check if we need to reset an expired rate limit
    IF FOUND AND current_record.reset_at <= timezone('utc'::text, now()) THEN
        -- Reset expired rate limit
        UPDATE public.rate_limit
        SET count = 1,
            reset_at = timezone('utc'::text, now() + (window_seconds || ' seconds')::interval),
            updated_at = timezone('utc'::text, now())
        WHERE key = key_param
        RETURNING * INTO current_record;
    ELSIF FOUND THEN
        -- Record exists and is not expired, increment count
        UPDATE public.rate_limit
        SET count = count + 1,
            updated_at = timezone('utc'::text, now())
        WHERE key = key_param
        RETURNING * INTO current_record;
    ELSE
        -- Record doesn't exist, insert new one
        INSERT INTO public.rate_limit (
            key,
            count,
            reset_at
        )
        VALUES (
            key_param,
            1,
            timezone('utc'::text, now() + (window_seconds || ' seconds')::interval)
        )
        RETURNING * INTO current_record;
    END IF;

    -- Calculate remaining requests and whether limit is exceeded
    remaining := GREATEST(max_requests - current_record.count, 0);
    is_exceeded := current_record.count > max_requests;
    reset_time := current_record.reset_at;

    -- Return JSON with rate limit information
    RETURN json_build_object(
        'limit', max_requests,
        'remaining', remaining,
        'reset', extract(epoch from reset_time),
        'exceeded', is_exceeded
    );
END;
$$;

-- Function to check current rate limit status without incrementing
CREATE OR REPLACE FUNCTION public.check_rate_limit(
    key_param text,
    max_requests integer DEFAULT 100
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    current_record public.rate_limit;
    remaining integer;
    is_exceeded boolean;
BEGIN
    -- Get current rate limit record
    SELECT *
    INTO current_record
    FROM public.rate_limit
    WHERE key = key_param;

    IF FOUND AND current_record.reset_at > timezone('utc'::text, now()) THEN
        -- Calculate remaining requests and whether limit is exceeded
        remaining := GREATEST(max_requests - current_record.count, 0);
        is_exceeded := current_record.count > max_requests;
        
        RETURN json_build_object(
            'limit', max_requests,
            'remaining', remaining,
            'reset', extract(epoch from current_record.reset_at),
            'exceeded', is_exceeded
        );
    ELSE
        -- No record or expired record
        RETURN json_build_object(
            'limit', max_requests,
            'remaining', max_requests,
            'reset', extract(epoch from timezone('utc'::text, now() + interval '1 hour')),
            'exceeded', false
        );
    END IF;
END;
$$;

-- Function to cleanup expired rate limits
CREATE OR REPLACE FUNCTION public.cleanup_rate_limits()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    deleted_count integer;
BEGIN
    DELETE FROM public.rate_limit
    WHERE reset_at <= timezone('utc'::text, now())
    RETURNING count(*) INTO deleted_count;

    RETURN deleted_count;
END;
$$;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.increment_rate_limit(text, integer, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(text, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.cleanup_rate_limits() TO authenticated;

-- Create a trigger to automatically cleanup expired rate limits
CREATE OR REPLACE FUNCTION public.trigger_cleanup_rate_limits()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Only run cleanup occasionally to prevent performance impact
    IF (random() < 0.1) THEN  -- 10% chance to run cleanup
        PERFORM cleanup_rate_limits();
    END IF;
    RETURN NEW;
END;
$$;

CREATE TRIGGER rate_limit_cleanup_trigger
    AFTER INSERT OR UPDATE ON public.rate_limit
    FOR EACH STATEMENT
    EXECUTE FUNCTION public.trigger_cleanup_rate_limits();

-- Test the functions
DO $$
DECLARE
    result json;
BEGIN
    -- Clean up any existing test data
    DELETE FROM public.rate_limit WHERE key = 'test_function_key';
    
    -- Test 1: First call should create new record
    result := increment_rate_limit('test_function_key', 5, 3600);
    ASSERT (result->>'remaining')::integer = 4,
        'First call should have 4 remaining requests';
    
    -- Test 2: Second call should increment existing record
    result := increment_rate_limit('test_function_key', 5, 3600);
    ASSERT (result->>'remaining')::integer = 3,
        'Second call should have 3 remaining requests';
    
    -- Test 3: Check rate limit without incrementing
    result := check_rate_limit('test_function_key', 5);
    ASSERT (result->>'remaining')::integer = 3,
        'Check should show 3 remaining requests';
    
    -- Test 4: Exceed the limit
    PERFORM increment_rate_limit('test_function_key', 5, 3600);
    PERFORM increment_rate_limit('test_function_key', 5, 3600);
    result := increment_rate_limit('test_function_key', 5, 3600);
    ASSERT (result->>'exceeded')::boolean = true,
        'Rate limit should be exceeded';
    
    -- Clean up test data
    DELETE FROM public.rate_limit WHERE key = 'test_function_key';
END;
$$;
