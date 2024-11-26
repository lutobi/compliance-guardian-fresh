export interface Control {
  id: string
  name: string
  description: string
  subcontrols: Subcontrol[]
}

export interface Subcontrol {
  id: string
  name: string
  description: string
}

export interface Framework {
  id: string
  name: string
  version: string
  description: string
  controls: Control[]
}

export const AVAILABLE_FRAMEWORKS: Framework[] = [
  {
    id: 'nist-800-53',
    name: 'NIST SP 800-53',
    version: 'Revision 5',
    description: 'Security and Privacy Controls for Information Systems and Organizations',
    controls: [
      {
        id: 'AC',
        name: 'Access Control',
        description: 'Access Control family of controls',
        subcontrols: [
          {
            id: 'AC-1',
            name: 'Access Control Policy and Procedures',
            description: 'The organization develops, documents, and disseminates an access control policy.'
          },
          {
            id: 'AC-2',
            name: 'Account Management',
            description: 'The organization manages information system accounts.'
          }
        ]
      },
      {
        id: 'AU',
        name: 'Audit and Accountability',
        description: 'Audit and Accountability family of controls',
        subcontrols: [
          {
            id: 'AU-1',
            name: 'Audit and Accountability Policy and Procedures',
            description: 'The organization develops, documents, and disseminates an audit and accountability policy.'
          }
        ]
      }
    ]
  },
  {
    id: 'iso-27001',
    name: 'ISO 27001',
    version: '2022',
    description: 'Information Security Management System (ISMS) standard',
    controls: [
      {
        id: 'A.5',
        name: 'Information Security Policies',
        description: 'Management direction for information security',
        subcontrols: [
          {
            id: 'A.5.1',
            name: 'Management direction for information security',
            description: 'To provide management direction and support for information security in accordance with business requirements.'
          }
        ]
      },
      {
        id: 'A.6',
        name: 'Organization of Information Security',
        description: 'Internal organization and mobile devices/teleworking',
        subcontrols: [
          {
            id: 'A.6.1',
            name: 'Internal organization',
            description: 'Framework for initiation and control of information security implementation.'
          }
        ]
      }
    ]
  },
  {
    id: 'soc2',
    name: 'SOC 2',
    version: '2017',
    description: 'Trust Services Criteria for Security, Availability, Processing Integrity, Confidentiality, and Privacy',
    controls: [
      {
        id: 'CC',
        name: 'Common Criteria',
        description: 'Common Criteria controls',
        subcontrols: [
          {
            id: 'CC1.0',
            name: 'Control Environment',
            description: 'The entity demonstrates a commitment to integrity and ethical values.'
          },
          {
            id: 'CC2.0',
            name: 'Communication and Information',
            description: 'Communication and information systems support the achievement of objectives.'
          }
        ]
      }
    ]
  },
  {
    id: 'hipaa',
    name: 'HIPAA',
    version: '2013',
    description: 'Health Insurance Portability and Accountability Act Security Rule',
    controls: [
      {
        id: 'ADM',
        name: 'Administrative Safeguards',
        description: 'Administrative actions to manage security measures',
        subcontrols: [
          {
            id: 'ADM-1',
            name: 'Security Management Process',
            description: 'Implement policies and procedures to prevent, detect, contain, and correct security violations.'
          }
        ]
      },
      {
        id: 'PHY',
        name: 'Physical Safeguards',
        description: 'Physical measures, policies, and procedures',
        subcontrols: [
          {
            id: 'PHY-1',
            name: 'Facility Access Controls',
            description: 'Implement policies and procedures to limit physical access to electronic information systems.'
          }
        ]
      }
    ]
  },
  {
    id: 'pci-dss',
    name: 'PCI DSS',
    version: 'v4.0',
    description: 'Payment Card Industry Data Security Standard',
    controls: [
      {
        id: 'REQ-1',
        name: 'Network Security',
        description: 'Install and maintain network security controls',
        subcontrols: [
          {
            id: 'REQ-1.1',
            name: 'Firewall Configuration',
            description: 'Establish and implement firewall and router configuration standards.'
          }
        ]
      },
      {
        id: 'REQ-2',
        name: 'System Security',
        description: 'Apply secure configurations to all system components',
        subcontrols: [
          {
            id: 'REQ-2.1',
            name: 'Vendor Defaults',
            description: 'Change vendor-supplied defaults and remove or disable unnecessary default accounts.'
          }
        ]
      }
    ]
  }
] as const;
