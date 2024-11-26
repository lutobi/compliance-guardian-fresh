-- Insert a default framework
INSERT INTO public.frameworks (name, version, description, is_default)
VALUES (
  'NIST SP 800-53',
  'Revision 5',
  'Security and Privacy Controls for Information Systems and Organizations',
  true
);

-- Get the framework ID
DO $$ 
DECLARE
  framework_id uuid;
BEGIN
  SELECT id INTO framework_id FROM public.frameworks WHERE name = 'NIST SP 800-53' LIMIT 1;

  -- Insert some basic controls
  INSERT INTO public.controls (framework_id, control_id, title, description)
  VALUES
    (framework_id, 'AC-1', 'Access Control Policy and Procedures', 'The organization develops, documents, and disseminates an access control policy.'),
    (framework_id, 'AC-2', 'Account Management', 'The organization manages information system accounts.'),
    (framework_id, 'AC-3', 'Access Enforcement', 'The system enforces approved authorizations for logical access.'),
    (framework_id, 'AC-4', 'Information Flow Enforcement', 'The system enforces approved authorizations for controlling information flow.'),
    (framework_id, 'AU-1', 'Audit and Accountability Policy and Procedures', 'The organization develops and maintains an audit and accountability policy.'),
    (framework_id, 'AU-2', 'Audit Events', 'The organization determines that the information system is capable of auditing specific events.'),
    (framework_id, 'CM-1', 'Configuration Management Policy and Procedures', 'The organization develops and maintains configuration management policies.'),
    (framework_id, 'CM-2', 'Baseline Configuration', 'The organization develops and maintains baseline configurations.'),
    (framework_id, 'IA-1', 'Identification and Authentication Policy and Procedures', 'The organization develops and maintains identification and authentication policies.'),
    (framework_id, 'IA-2', 'Identification and Authentication (Organizational Users)', 'The information system uniquely identifies and authenticates organizational users.');
END $$;
