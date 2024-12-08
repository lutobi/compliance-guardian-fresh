import { ControlGuidance } from '@/types/framework-data.types'

export const gdprGuidance: ControlGuidance[] = [
  {
    controlId: 'DP.1',
    overview: 'Lawfulness and Transparency ensures proper legal basis for data processing.',
    implementationSteps: [
      'Identify legal bases for processing',
      'Create transparency notices',
      'Document processing activities',
      'Implement consent management'
    ],
    examples: [
      'Privacy notice template',
      'Consent forms',
      'Processing register',
      'Legal basis assessment'
    ],
    evidenceTypes: [
      'Privacy notices',
      'Consent records',
      'Processing documentation',
      'Legal assessments'
    ],
    furtherResources: [
      'EDPB Guidelines on Transparency',
      'ICO Guide to Lawful Basis',
      'GDPR Article 6 Guidance'
    ]
  },
  {
    controlId: 'DR.1',
    overview: 'Access Rights enables individuals to access their personal data.',
    implementationSteps: [
      'Create data subject access procedure',
      'Implement identity verification',
      'Establish response timeline',
      'Train staff on handling requests'
    ],
    examples: [
      'DSAR procedure document',
      'ID verification process',
      'Response templates',
      'Training materials'
    ],
    evidenceTypes: [
      'DSAR logs',
      'Verification records',
      'Response tracking',
      'Training records'
    ],
    furtherResources: [
      'ICO Right of Access Guidance',
      'EDPB Guidelines on Data Subject Rights',
      'GDPR Article 15 Implementation Guide'
    ]
  },
  {
    controlId: 'DS.1',
    overview: 'Technical Measures implements appropriate security for personal data.',
    implementationSteps: [
      'Implement encryption',
      'Configure access controls',
      'Enable audit logging',
      'Deploy security monitoring'
    ],
    examples: [
      'Encryption standards',
      'Access control matrix',
      'Audit log configuration',
      'Security monitoring setup'
    ],
    evidenceTypes: [
      'Security configurations',
      'Access reviews',
      'Audit logs',
      'Security reports'
    ],
    furtherResources: [
      'ENISA Security Guidelines',
      'ICO Security Measures Guide',
      'GDPR Article 32 Technical Guide'
    ]
  }
]
