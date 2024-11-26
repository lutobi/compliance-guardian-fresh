-- Test inserting and querying data from security tables

-- First, create a test user in auth.users
INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    aud,
    role
)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000000',
    'test@example.com',
    'test_encrypted_password',
    now(),
    now(),
    now(),
    'authenticated',
    'authenticated'
);

-- Test user_mfa table
INSERT INTO public.user_mfa (user_id, secret, enabled)
VALUES 
    ('00000000-0000-0000-0000-000000000001', 'test_secret', true);

SELECT * FROM public.user_mfa;

-- Test password_history table
INSERT INTO public.password_history (user_id, password_hash)
VALUES 
    ('00000000-0000-0000-0000-000000000001', 'test_hash');

SELECT * FROM public.password_history;

-- Test audit_logs table
INSERT INTO public.audit_logs (
    user_id, 
    event_type, 
    event_data, 
    ip_address, 
    user_agent
)
VALUES 
    ('00000000-0000-0000-0000-000000000001', 
     'LOGIN', 
     '{"status": "success"}', 
     '127.0.0.1', 
     'Mozilla/5.0');

SELECT * FROM public.audit_logs;

-- Test rate_limit table
INSERT INTO public.rate_limit (
    key, 
    count, 
    reset_at
)
VALUES 
    ('test_key', 1, timezone('utc'::text, now()) + interval '1 hour');

SELECT * FROM public.rate_limit;

-- Test security_assessments table
SELECT create_security_assessment(
    'Test Web Application Assessment',
    'Comprehensive security assessment of the web application',
    'VULNERABILITY_SCAN',
    'SCHEDULED',
    NOW(),
    ARRAY['web-app', 'api'],
    ARRAY['OWASP-Top-10', 'SANS-Top-25'],
    ARRAY['test@example.com']
);

-- Test vulnerabilities table
DO $$
DECLARE
    v_assessment_id UUID;
BEGIN
    SELECT id INTO v_assessment_id FROM security_assessments LIMIT 1;
    
    PERFORM create_vulnerability(
        v_assessment_id,
        'SQL Injection Vulnerability',
        'Found potential SQL injection in login endpoint',
        'HIGH',
        'OPEN',
        ARRAY['api/auth/login'],
        'SELECT * FROM users WHERE username = '' OR ''1''=''1',
        'Use parameterized queries and input validation',
        8.5,
        'CWE-89',
        'test@example.com',
        NOW() + interval '7 days'
    );
END $$;

-- Test scan_configurations table
INSERT INTO scan_configurations (
    name,
    description,
    target_urls,
    excluded_urls,
    scan_frequency,
    notification_emails,
    next_scan
) VALUES (
    'Weekly Web App Scan',
    'Automated weekly security scan of the web application',
    ARRAY['https://app.example.com', 'https://api.example.com'],
    ARRAY['https://app.example.com/health'],
    'WEEKLY',
    ARRAY['security@example.com'],
    NOW() + interval '7 days'
);

-- Test querying assessment with vulnerabilities
DO $$
DECLARE
    v_assessment_id UUID;
BEGIN
    SELECT id INTO v_assessment_id FROM security_assessments LIMIT 1;
    PERFORM get_assessment_with_vulnerabilities(v_assessment_id);
END $$;

-- Test indexes and queries
SELECT * FROM security_assessments WHERE status = 'SCHEDULED';
SELECT * FROM vulnerabilities WHERE severity = 'HIGH';
SELECT * FROM scan_configurations WHERE scan_frequency = 'WEEKLY';

-- Test indexes by running queries that should use them
SELECT * FROM public.audit_logs WHERE event_type = 'LOGIN';
SELECT * FROM public.audit_logs WHERE user_id = '00000000-0000-0000-0000-000000000001';
SELECT * FROM public.rate_limit WHERE key = 'test_key';

-- Clean up test data
DELETE FROM vulnerabilities;
DELETE FROM security_assessments;
DELETE FROM scan_configurations;
DELETE FROM public.rate_limit WHERE key = 'test_key';
DELETE FROM public.audit_logs WHERE user_id = '00000000-0000-0000-0000-000000000001';
DELETE FROM public.password_history WHERE user_id = '00000000-0000-0000-0000-000000000001';
DELETE FROM public.user_mfa WHERE user_id = '00000000-0000-0000-0000-000000000001';
DELETE FROM auth.users WHERE id = '00000000-0000-0000-0000-000000000001';
