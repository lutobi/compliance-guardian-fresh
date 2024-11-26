-- Create security assessments table
CREATE TABLE IF NOT EXISTS security_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL CHECK (type IN ('PENTEST', 'VULNERABILITY_SCAN')),
    status TEXT NOT NULL CHECK (status IN ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    scope TEXT[] NOT NULL DEFAULT '{}',
    methodology TEXT[] NOT NULL DEFAULT '{}',
    assigned_to TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create vulnerabilities table
CREATE TABLE IF NOT EXISTS vulnerabilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assessment_id UUID NOT NULL REFERENCES security_assessments(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFO')),
    status TEXT NOT NULL CHECK (status IN ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'ACCEPTED_RISK')),
    affected_components TEXT[] NOT NULL DEFAULT '{}',
    proof_of_concept TEXT,
    remediation_steps TEXT,
    cvss_score NUMERIC(3,1),
    cwe_id TEXT,
    discovered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    assigned_to TEXT,
    remediation_deadline TIMESTAMP WITH TIME ZONE,
    remediation_notes TEXT[] NOT NULL DEFAULT '{}'
);

-- Create scan configurations table
CREATE TABLE IF NOT EXISTS scan_configurations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    target_urls TEXT[] NOT NULL,
    excluded_urls TEXT[] NOT NULL DEFAULT '{}',
    scan_frequency TEXT NOT NULL CHECK (scan_frequency IN ('DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY')),
    notification_emails TEXT[] NOT NULL,
    last_scan TIMESTAMP WITH TIME ZONE,
    next_scan TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Function to create a new security assessment
CREATE OR REPLACE FUNCTION create_security_assessment(
    p_name TEXT,
    p_description TEXT,
    p_type TEXT,
    p_status TEXT,
    p_start_date TIMESTAMP WITH TIME ZONE,
    p_scope TEXT[],
    p_methodology TEXT[],
    p_assigned_to TEXT[]
) RETURNS security_assessments AS $$
DECLARE
    v_assessment security_assessments;
BEGIN
    INSERT INTO security_assessments (
        name,
        description,
        type,
        status,
        start_date,
        scope,
        methodology,
        assigned_to
    ) VALUES (
        p_name,
        p_description,
        p_type,
        p_status,
        p_start_date,
        p_scope,
        p_methodology,
        p_assigned_to
    ) RETURNING * INTO v_assessment;

    RETURN v_assessment;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create a new vulnerability
CREATE OR REPLACE FUNCTION create_vulnerability(
    p_assessment_id UUID,
    p_title TEXT,
    p_description TEXT,
    p_severity TEXT,
    p_status TEXT,
    p_affected_components TEXT[],
    p_proof_of_concept TEXT DEFAULT NULL,
    p_remediation_steps TEXT DEFAULT NULL,
    p_cvss_score NUMERIC(3,1) DEFAULT NULL,
    p_cwe_id TEXT DEFAULT NULL,
    p_assigned_to TEXT DEFAULT NULL,
    p_remediation_deadline TIMESTAMP WITH TIME ZONE DEFAULT NULL
) RETURNS vulnerabilities AS $$
DECLARE
    v_vulnerability vulnerabilities;
BEGIN
    INSERT INTO vulnerabilities (
        assessment_id,
        title,
        description,
        severity,
        status,
        affected_components,
        proof_of_concept,
        remediation_steps,
        cvss_score,
        cwe_id,
        assigned_to,
        remediation_deadline
    ) VALUES (
        p_assessment_id,
        p_title,
        p_description,
        p_severity,
        p_status,
        p_affected_components,
        p_proof_of_concept,
        p_remediation_steps,
        p_cvss_score,
        p_cwe_id,
        p_assigned_to,
        p_remediation_deadline
    ) RETURNING * INTO v_vulnerability;

    RETURN v_vulnerability;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get assessment with vulnerabilities
CREATE OR REPLACE FUNCTION get_assessment_with_vulnerabilities(p_assessment_id UUID)
RETURNS TABLE (
    id UUID,
    name TEXT,
    description TEXT,
    type TEXT,
    status TEXT,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    scope TEXT[],
    methodology TEXT[],
    assigned_to TEXT[],
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    findings JSON
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.*,
        COALESCE(
            json_agg(
                json_build_object(
                    'id', v.id,
                    'title', v.title,
                    'severity', v.severity,
                    'status', v.status,
                    'affected_components', v.affected_components,
                    'discovered_at', v.discovered_at
                )
            ) FILTER (WHERE v.id IS NOT NULL),
            '[]'::json
        ) as findings
    FROM security_assessments a
    LEFT JOIN vulnerabilities v ON v.assessment_id = a.id
    WHERE a.id = p_assessment_id
    GROUP BY a.id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
