import { ControlGuidance } from '@/types/framework-data.types'

export const hipaaGuidance: ControlGuidance[] = [
  {
    controlId: 'P.1',
    overview: 'Notice of Privacy Practices (NPP) is a key document that informs individuals about their rights regarding protected health information and how their information will be used and disclosed.',
    implementationSteps: [
      'Create a comprehensive NPP that includes all required elements',
      'Establish procedures for distributing NPP to individuals',
      'Document acknowledgment of receipt',
      'Maintain NPP records and updates',
      'Train staff on NPP requirements and procedures',
      'Make NPP available in multiple formats (paper, electronic)',
      'Post NPP in clear and prominent locations'
    ],
    examples: [
      'Sample NPP template following HHS guidelines',
      'NPP distribution workflow diagram',
      'Electronic acknowledgment form',
      'NPP training presentation',
      'Multi-language NPP versions',
      'NPP posting locations map'
    ],
    evidenceTypes: [
      'Signed NPP acknowledgments',
      'NPP distribution logs',
      'Staff training records',
      'NPP version history',
      'Website privacy notice',
      'Facility posting photographs',
      'Electronic delivery receipts'
    ],
    furtherResources: [
      'HHS Model NPP: https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/model-notices-privacy-practices/',
      'OCR NPP Requirements: https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/privacy-practices-notice/',
      'HIPAA Privacy Rule Training Materials'
    ]
  },
  {
    controlId: 'S.1.1',
    overview: 'Security Management Process requires organizations to implement policies and procedures to prevent, detect, contain, and correct security violations.',
    implementationSteps: [
      'Conduct comprehensive risk analysis',
      'Develop risk management strategy',
      'Create and implement sanction policy',
      'Establish information system activity review process',
      'Document all security incidents and responses',
      'Implement continuous monitoring procedures',
      'Regular review and updates of security measures'
    ],
    examples: [
      'Risk analysis methodology document',
      'Risk management plan template',
      'Sanction policy document',
      'Security incident response plan',
      'System activity monitoring procedures',
      'Security metrics dashboard',
      'Remediation tracking system'
    ],
    evidenceTypes: [
      'Risk assessment reports',
      'Risk treatment plans',
      'Sanction records',
      'Activity review logs',
      'Security incident reports',
      'Audit trail records',
      'Remediation documentation'
    ],
    furtherResources: [
      'NIST SP 800-66: HIPAA Security Rule Guide',
      'OCR Audit Protocol: Security Management Process',
      'HHS Risk Analysis Guidance: https://www.hhs.gov/hipaa/for-professionals/security/guidance/guidance-risk-analysis/',
      'NIST Risk Management Framework'
    ]
  },
  {
    controlId: 'B.1.1',
    overview: 'Risk Assessment for breach notification requires evaluation of the probability that PHI has been compromised based on specific risk factors.',
    implementationSteps: [
      'Establish breach identification procedures',
      'Create risk assessment methodology',
      'Define compromise probability factors',
      'Document assessment process',
      'Implement investigation procedures',
      'Train staff on breach assessment',
      'Maintain assessment records'
    ],
    examples: [
      'Breach risk assessment template',
      'Investigation checklist',
      'Risk factor evaluation matrix',
      'Documentation requirements list',
      'Staff training materials',
      'Assessment workflow diagram',
      'Record retention schedule'
    ],
    evidenceTypes: [
      'Completed risk assessments',
      'Investigation reports',
      'Interview documentation',
      'Evidence collection logs',
      'Training completion records',
      'Assessment review notes',
      'Decision documentation'
    ],
    furtherResources: [
      'HHS Breach Risk Assessment Tool',
      'OCR Breach Notification Guidance: https://www.hhs.gov/hipaa/for-professionals/breach-notification/',
      'NIST Guide to Data Breach Response',
      'FTC Data Breach Response Guide'
    ]
  },
  {
    controlId: 'S.3.1',
    overview: 'Access Control requires implementation of technical policies and procedures for electronic information systems that maintain electronic protected health information.',
    implementationSteps: [
      'Implement unique user identification',
      'Establish emergency access procedures',
      'Configure automatic logoff',
      'Deploy encryption/decryption mechanisms',
      'Create access authorization process',
      'Set up access monitoring',
      'Regular access review procedures'
    ],
    examples: [
      'User identification policy',
      'Emergency access procedure',
      'Automatic logoff configuration',
      'Encryption standards document',
      'Access request forms',
      'Monitoring dashboard setup',
      'Access review template'
    ],
    evidenceTypes: [
      'User ID assignments',
      'Emergency access logs',
      'System configuration records',
      'Encryption certificates',
      'Access authorization records',
      'Monitoring reports',
      'Access review documentation'
    ],
    furtherResources: [
      'NIST SP 800-63: Digital Identity Guidelines',
      'HHS Guidance on Access Control',
      'HIPAA Security Rule: Access Control Standard',
      'OCR Guidance on Technical Safeguards'
    ]
  }
]
