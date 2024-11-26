export type ComplianceStatus = 'Compliant' | 'Non-Compliant' | 'Partial' | 'Not Applicable' | 'Pending Review';

export type ComplianceSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface ComplianceRequirement {
  id: string;
  name: string;
  description?: string;
  status: ComplianceStatus;
  lastUpdated: Date;
  evidence: ComplianceEvidence[];
}

export interface ComplianceEvidence {
  id: string;
  requirementId: string;
  title: string;
  description: string;
  fileUrls?: string[];
  dateCollected: Date;
  collectedBy: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}

export interface ComplianceAlert {
  id: string;
  type: string;
  message: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  timestamp: Date;
}

export interface ComplianceMetric {
  name: string;
  value: number;
}

export interface ComplianceFramework {
  id: string;
  name: string;
  completionPercentage: number;
  overallStatus: string;
  lastUpdated: Date;
  requirements: Array<{
    id: string;
    name: string;
    status: ComplianceStatus;
  }>;
}
