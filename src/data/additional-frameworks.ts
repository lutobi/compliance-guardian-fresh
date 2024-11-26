import { FrameworkData } from '../types/framework-data.types'

export const additionalFrameworks: FrameworkData[] = [
  {
    name: 'HIPAA',
    version: '2023',
    description: 'Health Insurance Portability and Accountability Act - Privacy and Security Rules',
    controls: [
      {
        name: 'Privacy Rule',
        controls: [
          {
            id: 'PR.1',
            title: 'Privacy Policies and Procedures',
            description: 'Develop and implement policies and procedures to comply with HIPAA Privacy Rule standards',
            subControls: [
              {
                id: 'PR.1.1',
                title: 'Notice of Privacy Practices',
                description: 'Develop and distribute Notice of Privacy Practices to patients'
              },
              {
                id: 'PR.1.2',
                title: 'Patient Rights',
                description: 'Implement policies and procedures for patient rights regarding PHI'
              },
              {
                id: 'PR.1.3',
                title: 'Minimum Necessary',
                description: 'Implement policies to limit PHI access and disclosure to minimum necessary'
              }
            ]
          },
          {
            id: 'PR.2',
            title: 'Use and Disclosure',
            description: 'Controls for the use and disclosure of Protected Health Information (PHI)',
            subControls: [
              {
                id: 'PR.2.1',
                title: 'Authorization',
                description: 'Obtain appropriate authorization for use or disclosure of PHI'
              },
              {
                id: 'PR.2.2',
                title: 'Business Associates',
                description: 'Establish business associate agreements for sharing PHI'
              }
            ]
          }
        ]
      },
      {
        name: 'Security Rule',
        controls: [
          {
            id: 'SR.1',
            title: 'Administrative Safeguards',
            description: 'Security management and administration controls',
            subControls: [
              {
                id: 'SR.1.1',
                title: 'Security Management Process',
                description: 'Implement policies and procedures to prevent, detect, contain, and correct security violations'
              },
              {
                id: 'SR.1.2',
                title: 'Workforce Security',
                description: 'Implement policies and procedures for workforce members access to PHI'
              }
            ]
          },
          {
            id: 'SR.2',
            title: 'Physical Safeguards',
            description: 'Physical security measures for protected health information',
            subControls: [
              {
                id: 'SR.2.1',
                title: 'Facility Access Controls',
                description: 'Implement policies and procedures to limit physical access to systems containing PHI'
              },
              {
                id: 'SR.2.2',
                title: 'Workstation Security',
                description: 'Implement physical safeguards for workstations accessing PHI'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'GDPR',
    version: '2018',
    description: 'General Data Protection Regulation - EU data protection and privacy framework',
    controls: [
      {
        name: 'Data Protection Principles',
        controls: [
          {
            id: 'DPP.1',
            title: 'Lawfulness, Fairness and Transparency',
            description: 'Personal data shall be processed lawfully, fairly and in a transparent manner',
            subControls: [
              {
                id: 'DPP.1.1',
                title: 'Legal Basis',
                description: 'Identify and document legal basis for processing personal data'
              },
              {
                id: 'DPP.1.2',
                title: 'Privacy Notices',
                description: 'Provide clear and transparent information about data processing'
              }
            ]
          },
          {
            id: 'DPP.2',
            title: 'Purpose Limitation',
            description: 'Personal data shall be collected for specified, explicit and legitimate purposes',
            subControls: [
              {
                id: 'DPP.2.1',
                title: 'Purpose Specification',
                description: 'Document and limit data processing to specified purposes'
              },
              {
                id: 'DPP.2.2',
                title: 'Compatible Processing',
                description: 'Ensure further processing is compatible with original purposes'
              }
            ]
          }
        ]
      },
      {
        name: 'Data Subject Rights',
        controls: [
          {
            id: 'DSR.1',
            title: 'Right of Access',
            description: 'Data subjects right to access their personal data',
            subControls: [
              {
                id: 'DSR.1.1',
                title: 'Access Request Process',
                description: 'Process for handling data subject access requests'
              },
              {
                id: 'DSR.1.2',
                title: 'Information Provision',
                description: 'Provide copy of personal data and processing information'
              }
            ]
          },
          {
            id: 'DSR.2',
            title: 'Right to Erasure',
            description: 'Data subjects right to request erasure of personal data',
            subControls: [
              {
                id: 'DSR.2.1',
                title: 'Erasure Process',
                description: 'Process for handling erasure requests'
              },
              {
                id: 'DSR.2.2',
                title: 'Third Party Notification',
                description: 'Inform third parties of erasure requests'
              }
            ]
          }
        ]
      }
    ]
  }
]
