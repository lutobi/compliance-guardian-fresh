-- Insert default frameworks
INSERT INTO public.frameworks (name, version, description, is_default)
VALUES 
  (
    'NIST SP 800-53',
    'Revision 5',
    'Security and Privacy Controls for Information Systems and Organizations',
    true
  ),
  (
    'ISO 27001',
    '2022',
    'Information Security Management System (ISMS) standard developed by the International Organization for Standardization',
    false
  ),
  (
    'SOC 2',
    '2017',
    'Trust Services Criteria for Security, Availability, Processing Integrity, Confidentiality, and Privacy',
    false
  ),
  (
    'HIPAA',
    '2013',
    'Health Insurance Portability and Accountability Act Security Rule',
    false
  ),
  (
    'PCI DSS',
    'v4.0',
    'Payment Card Industry Data Security Standard for organizations that handle credit card data',
    false
  ),
  (
    'GDPR',
    '2018',
    'General Data Protection Regulation for protection of personal data and privacy in the EU',
    false
  );

-- Get the framework ID and insert controls
DO $$ 
DECLARE
  nist_framework_id uuid;
  iso_framework_id uuid;
  soc2_framework_id uuid;
  hipaa_framework_id uuid;
  pci_framework_id uuid;
  gdpr_framework_id uuid;
BEGIN
  -- Get framework IDs
  SELECT id INTO nist_framework_id FROM frameworks WHERE name = 'NIST SP 800-53';
  SELECT id INTO iso_framework_id FROM frameworks WHERE name = 'ISO 27001';
  SELECT id INTO soc2_framework_id FROM frameworks WHERE name = 'SOC 2';
  SELECT id INTO hipaa_framework_id FROM frameworks WHERE name = 'HIPAA';
  SELECT id INTO pci_framework_id FROM frameworks WHERE name = 'PCI DSS';
  SELECT id INTO gdpr_framework_id FROM frameworks WHERE name = 'GDPR';

  -- Insert NIST controls
  INSERT INTO public.controls (framework_id, control_id, title, description, status, implementation_status)
  VALUES
    (nist_framework_id, 'AC-1', 'Access Control Policy and Procedures', 'The organization develops, documents, and disseminates an access control policy.', 'completed', 'implemented'),
    (nist_framework_id, 'AC-2', 'Account Management', 'The organization manages information system accounts.', 'in_progress', 'partially_implemented'),
    (nist_framework_id, 'AC-3', 'Access Enforcement', 'The system enforces approved authorizations for logical access.', 'in_progress', 'partially_implemented'),
    (nist_framework_id, 'AC-4', 'Information Flow Enforcement', 'The system enforces approved authorizations for controlling information flow.', 'not_started', 'not_implemented');

  -- Insert ISO controls
  INSERT INTO public.controls (framework_id, control_id, title, description, status, implementation_status)
  VALUES
    (iso_framework_id, 'A.5.1', 'Information Security Policies', 'Management direction for information security', 'completed', 'implemented'),
    (iso_framework_id, 'A.6.1', 'Internal Organization', 'Information security roles and responsibilities', 'in_progress', 'partially_implemented'),
    (iso_framework_id, 'A.7.1', 'Human Resource Security', 'Security aspects for employees joining, moving, and leaving', 'not_started', 'not_implemented'),
    (iso_framework_id, 'A.8.1', 'Asset Management', 'Responsibility and classification of information assets', 'completed', 'implemented');

  -- Insert PCI controls
  INSERT INTO public.controls (framework_id, control_id, title, description, status, implementation_status)
  VALUES
    (pci_framework_id, 'Req-1', 'Network Security', 'Install and maintain network security controls', 'completed', 'implemented'),
    (pci_framework_id, 'Req-2', 'Secure Configurations', 'Apply secure configurations to all system components', 'in_progress', 'partially_implemented'),
    (pci_framework_id, 'Req-3', 'Account Security', 'Protect stored account data', 'not_started', 'not_implemented'),
    (pci_framework_id, 'Req-4', 'Transmission Security', 'Protect cardholder data with strong cryptography during transmission', 'completed', 'implemented');

  -- Insert sample tasks
  INSERT INTO public.tasks (title, description, due_date, priority, framework_id, control_id, status)
  SELECT
    'Review ' || c.title,
    'Perform review of ' || c.title || ' implementation',
    NOW() + (random() * interval '30 days'),
    CASE 
      WHEN random() < 0.3 THEN 'high'
      WHEN random() < 0.6 THEN 'medium'
      ELSE 'low'
    END,
    c.framework_id,
    c.id,
    CASE 
      WHEN random() < 0.3 THEN 'pending'
      WHEN random() < 0.6 THEN 'in_progress'
      ELSE 'completed'
    END
  FROM controls c
  ORDER BY random()
  LIMIT 10;

  -- Insert sample audit logs
  INSERT INTO public.audit_logs (type, framework_id, control_id, details)
  SELECT
    CASE 
      WHEN random() < 0.2 THEN 'update'
      WHEN random() < 0.4 THEN 'issue'
      WHEN random() < 0.6 THEN 'complete'
      WHEN random() < 0.8 THEN 'evidence'
      ELSE 'review'
    END,
    framework_id,
    id,
    'Automatic audit log for ' || title
  FROM controls
  ORDER BY random()
  LIMIT 20;

END $$;
