import { ControlGuidance } from '@/types/framework-data.types'

export const soc2Guidance: ControlGuidance[] = [
  {
    controlId: 'CC1.0',
    overview: 'Control Environment establishes the foundation for an effective internal control system within the organization.',
    implementationSteps: [
      'Establish organizational structure',
      'Define roles and responsibilities',
      'Develop ethics and conduct policies',
      'Implement oversight mechanisms'
    ],
    examples: [
      'Organization chart',
      'Code of conduct document',
      'Board oversight procedures',
      'HR policies and procedures'
    ],
    evidenceTypes: [
      'Board meeting minutes',
      'Policy acknowledgments',
      'Training records',
      'Performance reviews'
    ],
    furtherResources: [
      'COSO Internal Control Framework',
      'AICPA Trust Services Criteria'
    ]
  },
  {
    controlId: 'A1.1',
    overview: 'Availability Planning ensures system components are available to meet organizational objectives.',
    implementationSteps: [
      'Monitor system capacity',
      'Implement performance monitoring',
      'Establish availability targets',
      'Plan for scalability'
    ],
    examples: [
      'Capacity planning document',
      'Performance monitoring dashboard',
      'SLA documentation',
      'Scalability strategy'
    ],
    evidenceTypes: [
      'Capacity reports',
      'Performance metrics',
      'Availability reports',
      'Scaling procedures'
    ],
    furtherResources: [
      'ITIL Availability Management',
      'ISO/IEC 20000-1:2018'
    ]
  },
  {
    controlId: 'C1.1',
    overview: 'Confidentiality Policies ensure proper protection of sensitive information.',
    implementationSteps: [
      'Identify confidential information',
      'Develop classification scheme',
      'Implement access controls',
      'Train employees on handling procedures'
    ],
    examples: [
      'Data classification policy',
      'Access control matrix',
      'Confidentiality agreements',
      'Training materials'
    ],
    evidenceTypes: [
      'Classification records',
      'Access reviews',
      'Training completion records',
      'Audit logs'
    ],
    furtherResources: [
      'ISO/IEC 27001:2013 A.8.2',
      'NIST SP 800-53 SC-8'
    ]
  }
]
