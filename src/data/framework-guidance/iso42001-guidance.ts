import { ControlGuidance } from '@/types/framework-data.types'

export const iso42001Guidance: ControlGuidance[] = [
  {
    controlId: '4.1',
    overview: 'AI Strategy and Objectives focuses on establishing clear direction for AI implementation.',
    implementationSteps: [
      'Define AI strategic objectives',
      'Align AI strategy with business goals',
      'Identify AI use cases and opportunities',
      'Establish AI governance structure'
    ],
    examples: [
      'AI strategy document',
      'AI roadmap',
      'Use case prioritization matrix',
      'AI governance framework'
    ],
    evidenceTypes: [
      'Strategy documentation',
      'Business case analyses',
      'AI project portfolio',
      'Governance meeting minutes'
    ],
    furtherResources: [
      'ISO/IEC 42001 Implementation Guide',
      'AI Strategy Development Framework',
      'AI Governance Best Practices'
    ]
  },
  {
    controlId: '5.1',
    overview: 'Ethical Principles ensures responsible and trustworthy AI development.',
    implementationSteps: [
      'Define AI ethical principles',
      'Establish ethics review process',
      'Implement ethics training',
      'Create monitoring mechanisms'
    ],
    examples: [
      'AI ethics policy',
      'Ethics review checklist',
      'Training materials',
      'Monitoring dashboard'
    ],
    evidenceTypes: [
      'Ethics policy documentation',
      'Review records',
      'Training completion records',
      'Monitoring reports'
    ],
    furtherResources: [
      'IEEE Ethics Guidelines for AI',
      'EU AI Ethics Guidelines',
      'AI Ethics Implementation Guide'
    ]
  },
  {
    controlId: '6.1',
    overview: 'Data Management ensures quality and integrity of AI training data.',
    implementationSteps: [
      'Establish data quality criteria',
      'Implement data validation processes',
      'Create data lineage tracking',
      'Define data retention policies'
    ],
    examples: [
      'Data quality framework',
      'Validation procedures',
      'Data lineage diagrams',
      'Retention schedules'
    ],
    evidenceTypes: [
      'Data quality metrics',
      'Validation reports',
      'Lineage documentation',
      'Retention records'
    ],
    furtherResources: [
      'Data Quality Management Guide',
      'Data Governance Framework',
      'Data Lineage Best Practices'
    ]
  }
]
