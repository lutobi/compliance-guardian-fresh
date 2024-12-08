import { ControlGuidance } from '@/types/framework-data.types'

export const nistCsfGuidance: ControlGuidance[] = [
  {
    controlId: 'ID.AM',
    overview: 'Asset Management focuses on identifying and managing all organizational assets that enable business operations.',
    implementationSteps: [
      'Create and maintain an asset inventory',
      'Classify assets based on business criticality',
      'Document asset ownership and responsibilities',
      'Implement asset tracking mechanisms'
    ],
    examples: [
      'Asset inventory spreadsheet with classification levels',
      'Network diagram showing critical assets',
      'Asset management policy document'
    ],
    evidenceTypes: [
      'Asset inventory records',
      'Asset classification documentation',
      'Asset ownership assignments',
      'Network diagrams'
    ],
    furtherResources: [
      'NIST SP 800-53 CM-8: Information System Component Inventory',
      'ISO/IEC 27001:2013 A.8.1.1: Inventory of assets'
    ]
  },
  {
    controlId: 'PR.AC',
    overview: 'Access Control ensures that access to assets and facilities is limited to authorized users, processes, and devices.',
    implementationSteps: [
      'Implement identity and access management (IAM)',
      'Establish role-based access control (RBAC)',
      'Configure remote access security',
      'Implement physical access controls'
    ],
    examples: [
      'IAM policy document',
      'RBAC matrix',
      'VPN configuration guide',
      'Physical security procedures'
    ],
    evidenceTypes: [
      'Access control policies',
      'User access reviews',
      'Remote access logs',
      'Physical access logs'
    ],
    furtherResources: [
      'NIST SP 800-53 AC-1: Access Control Policy and Procedures',
      'ISO/IEC 27001:2013 A.9: Access control'
    ]
  },
  {
    controlId: 'DE.AE',
    overview: 'Anomalies and Events focuses on detecting and understanding potential cybersecurity events.',
    implementationSteps: [
      'Establish a baseline of network operations',
      'Implement event detection mechanisms',
      'Configure alert thresholds',
      'Develop incident response procedures'
    ],
    examples: [
      'Network baseline documentation',
      'SIEM configuration guide',
      'Alert threshold matrix',
      'Incident response playbook'
    ],
    evidenceTypes: [
      'Network baseline reports',
      'Event logs',
      'Alert configurations',
      'Incident response records'
    ],
    furtherResources: [
      'NIST SP 800-53 SI-4: Information System Monitoring',
      'ISO/IEC 27001:2013 A.12.4: Logging and monitoring'
    ]
  }
]
