import { ControlGuidance } from '@/types/framework-data.types'

export const pciDssGuidance: ControlGuidance[] = [
  {
    controlId: 'R1.1',
    overview: 'Firewall Configuration ensures proper network segmentation and protection of cardholder data environment.',
    implementationSteps: [
      'Document network architecture',
      'Establish firewall change control',
      'Configure rule sets',
      'Test firewall effectiveness'
    ],
    examples: [
      'Network diagram',
      'Firewall rule set documentation',
      'Change control procedures',
      'Testing procedures'
    ],
    evidenceTypes: [
      'Firewall configurations',
      'Change records',
      'Test results',
      'Review logs'
    ],
    furtherResources: [
      'PCI DSS Network Security Controls',
      'NIST SP 800-41: Guidelines on Firewalls'
    ]
  },
  {
    controlId: 'R2.1',
    overview: 'Data Protection focuses on securing stored cardholder data through encryption and access controls.',
    implementationSteps: [
      'Identify cardholder data storage',
      'Implement encryption',
      'Configure access controls',
      'Establish key management'
    ],
    examples: [
      'Data flow diagrams',
      'Encryption configurations',
      'Access control matrix',
      'Key management procedures'
    ],
    evidenceTypes: [
      'Data inventory',
      'Encryption certificates',
      'Access logs',
      'Key management logs'
    ],
    furtherResources: [
      'PCI DSS Data Protection Guidelines',
      'NIST SP 800-57: Key Management'
    ]
  },
  {
    controlId: 'R3.1',
    overview: 'Antivirus implementation protects systems from malicious software.',
    implementationSteps: [
      'Deploy antivirus software',
      'Configure automatic updates',
      'Enable real-time scanning',
      'Implement alerting'
    ],
    examples: [
      'Antivirus deployment guide',
      'Update configuration',
      'Scanning policies',
      'Alert procedures'
    ],
    evidenceTypes: [
      'Installation records',
      'Update logs',
      'Scan reports',
      'Alert logs'
    ],
    furtherResources: [
      'PCI DSS Malware Guidelines',
      'NIST SP 800-83: Malware Prevention'
    ]
  }
]
