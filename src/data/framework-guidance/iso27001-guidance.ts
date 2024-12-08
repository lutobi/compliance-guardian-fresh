import { FrameworkGuidance } from '@/types/control-guidance.types'

export const iso27001Guidance: FrameworkGuidance = {
  frameworkId: 'ISO 27001:2022',
  controls: {
    'A.5.1': {
      overview: 'Information security policies should be defined, approved by management, published, communicated, and reviewed at planned intervals or if significant changes occur.',
      steps: [
        'Establish a comprehensive information security policy document',
        'Get management approval for the policy',
        'Communicate the policy to all employees and relevant external parties',
        'Make the policy easily accessible to all stakeholders',
        'Review the policy periodically and after significant changes',
      ],
      examples: [
        'A formal document that outlines the organization\'s approach to information security',
        'Regular security awareness training sessions for employees',
        'Annual policy review meetings with stakeholders',
      ],
      evidenceTypes: [
        {
          type: 'Policy Document',
          description: 'The formal information security policy document',
          examples: ['Information Security Policy.pdf', 'Security Policy Version History.xlsx'],
          required: true,
        },
        {
          type: 'Communication Records',
          description: 'Evidence of policy communication to stakeholders',
          examples: ['Email notifications', 'Training attendance records', 'Policy acknowledgment forms'],
          required: true,
        },
        {
          type: 'Review Records',
          description: 'Documentation of policy reviews and updates',
          examples: ['Meeting minutes', 'Review schedule', 'Change logs'],
          required: false,
        },
      ],
      furtherStudy: [
        {
          title: 'ISO 27001 Policy Requirements',
          url: 'https://www.iso.org/standard/27001',
          description: 'Official ISO documentation on information security policy requirements',
        },
      ],
    },
    'A.5.2': {
      overview: 'Information security roles and responsibilities should be defined and allocated.',
      steps: [
        'Define key information security roles',
        'Document responsibilities for each role',
        'Assign roles to qualified personnel',
        'Communicate role assignments',
        'Review and update assignments periodically',
      ],
      examples: [
        'CISO role description',
        'Security team organization chart',
        'Responsibility matrix',
      ],
      evidenceTypes: [
        {
          type: 'Role Documentation',
          description: 'Formal role definitions and assignments',
          examples: ['Role Descriptions.pdf', 'Organization Chart.pdf'],
          required: true,
        },
      ],
      furtherStudy: [
        {
          title: 'Security Roles Guide',
          url: 'https://www.isaca.org/roles',
          description: 'ISACA guidance on security roles',
        },
      ],
    },
    'A.5.3': {
      overview: 'Conflicting duties and areas of responsibility shall be segregated to reduce opportunities for unauthorized or unintentional modification or misuse of assets.',
      steps: [
        'Identify critical duties and responsibilities',
        'Analyze potential conflicts',
        'Implement segregation controls',
        'Document segregation policies',
        'Monitor effectiveness',
      ],
      examples: [
        'Duty segregation matrix',
        'Role conflict analysis',
        'Access control policies',
      ],
      evidenceTypes: [
        {
          type: 'Segregation Documentation',
          description: 'Documentation of duty segregation',
          examples: ['Segregation Matrix.xlsx', 'Control Documentation.pdf'],
          required: true,
        },
      ],
      furtherStudy: [
        {
          title: 'Segregation of Duties Guide',
          url: 'https://www.isaca.org/sod',
          description: 'Best practices for duty segregation',
        },
      ],
    },
    'A.6.1': {
      overview: 'Background verification checks should be carried out for all candidates for employment.',
      steps: [
        'Define verification requirements',
        'Establish screening process',
        'Conduct background checks',
        'Document results',
        'Review periodically',
      ],
      examples: [
        'Background check policy',
        'Screening checklist',
        'Verification records',
      ],
      evidenceTypes: [
        {
          type: 'Screening Records',
          description: 'Background check documentation',
          examples: ['Background Check Reports.pdf', 'Screening Policy.pdf'],
          required: true,
        },
      ],
      furtherStudy: [
        {
          title: 'Employment Screening Guide',
          url: 'https://www.shrm.org/screening',
          description: 'SHRM guidance on employment screening',
        },
      ],
    },
    'A.6.2': {
      overview: 'Employment agreements shall state employees\' and the organization\'s responsibilities for information security.',
      steps: [
        'Define security responsibilities',
        'Include in employment contracts',
        'Obtain acknowledgment',
        'Maintain records',
        'Review periodically',
      ],
      examples: [
        'Security responsibility clause',
        'NDA template',
        'Employee handbook',
      ],
      evidenceTypes: [
        {
          type: 'Agreement Records',
          description: 'Employment agreements and acknowledgments',
          examples: ['Employment Contracts.pdf', 'Security Agreements.pdf'],
          required: true,
        },
      ],
      furtherStudy: [
        {
          title: 'Employment Agreement Guide',
          url: 'https://www.shrm.org/agreements',
          description: 'Best practices for security agreements',
        },
      ],
    },
    'A.7.1': {
      overview: 'Security perimeters shall be defined and used to protect areas containing sensitive information.',
      steps: [
        'Define security perimeters',
        'Implement physical controls',
        'Monitor access',
        'Review effectiveness',
        'Update as needed',
      ],
      examples: [
        'Physical security zones',
        'Access control systems',
        'Security monitoring',
      ],
      evidenceTypes: [
        {
          type: 'Security Plans',
          description: 'Physical security documentation',
          examples: ['Security Plans.pdf', 'Access Logs.xlsx'],
          required: true,
        },
      ],
      furtherStudy: [
        {
          title: 'Physical Security Guide',
          url: 'https://www.cpni.gov.uk/physical',
          description: 'CPNI guidance on physical security',
        },
      ],
    },
    'A.8.1': {
      overview: 'Access to networks and network services shall be controlled.',
      steps: [
        'Define access policies',
        'Implement controls',
        'Monitor access',
        'Review regularly',
        'Update as needed',
      ],
      examples: [
        'Access policy document',
        'Network diagrams',
        'Access logs',
      ],
      evidenceTypes: [
        {
          type: 'Access Documentation',
          description: 'Network access control documentation',
          examples: ['Access Policy.pdf', 'Network Controls.pdf'],
          required: true,
        },
      ],
      furtherStudy: [
        {
          title: 'Network Access Guide',
          url: 'https://www.nist.gov/network-access',
          description: 'NIST guidance on network access',
        },
      ],
    },
    'A.9.1': {
      overview: 'An access control policy shall be established, documented, and reviewed based on business requirements.',
      steps: [
        'Develop access policy',
        'Document requirements',
        'Implement controls',
        'Review effectiveness',
        'Update as needed',
      ],
      examples: [
        'Access control policy',
        'Role-based access matrix',
        'Review records',
      ],
      evidenceTypes: [
        {
          type: 'Policy Documentation',
          description: 'Access control policy documentation',
          examples: ['Access Policy.pdf', 'Access Matrix.xlsx'],
          required: true,
        },
      ],
      furtherStudy: [
        {
          title: 'Access Control Guide',
          url: 'https://www.nist.gov/access-control',
          description: 'NIST guidance on access control',
        },
      ],
    },
    'A.10.1': {
      overview: 'A policy on the use of cryptographic controls shall be developed and implemented.',
      steps: [
        'Develop crypto policy',
        'Select appropriate controls',
        'Implement controls',
        'Monitor effectiveness',
        'Review regularly',
      ],
      examples: [
        'Cryptography policy',
        'Key management procedures',
        'Encryption standards',
      ],
      evidenceTypes: [
        {
          type: 'Crypto Documentation',
          description: 'Cryptographic control documentation',
          examples: ['Crypto Policy.pdf', 'Key Management.pdf'],
          required: true,
        },
      ],
      furtherStudy: [
        {
          title: 'Cryptography Guide',
          url: 'https://www.nist.gov/cryptography',
          description: 'NIST guidance on cryptography',
        },
      ],
    },
    'A.11.1': {
      overview: 'Operating procedures shall be documented and made available to all users who need them.',
      steps: [
        'Document procedures',
        'Review and approve',
        'Distribute to users',
        'Train users',
        'Update as needed',
      ],
      examples: [
        'Operating manuals',
        'Process documentation',
        'Work instructions',
      ],
      evidenceTypes: [
        {
          type: 'Procedure Documentation',
          description: 'Operating procedures documentation',
          examples: ['Operations Manual.pdf', 'Process Docs.pdf'],
          required: true,
        },
      ],
      furtherStudy: [
        {
          title: 'IT Operations Guide',
          url: 'https://www.itil.org/operations',
          description: 'ITIL guidance on IT operations',
        },
      ],
    },
    'A.12.1': {
      overview: 'Networks shall be managed and controlled to protect information in systems and applications.',
      steps: [
        'Define network controls',
        'Implement security measures',
        'Monitor network traffic',
        'Review security logs',
        'Update controls',
      ],
      examples: [
        'Network security policy',
        'Firewall rules',
        'IDS/IPS configuration',
      ],
      evidenceTypes: [
        {
          type: 'Network Documentation',
          description: 'Network security documentation',
          examples: ['Network Policy.pdf', 'Security Configs.pdf'],
          required: true,
        },
      ],
      furtherStudy: [
        {
          title: 'Network Security Guide',
          url: 'https://www.nist.gov/network-security',
          description: 'NIST guidance on network security',
        },
      ],
    },
    'A.13.1': {
      overview: 'Security requirements shall be included in requirements for new information systems or enhancements.',
      steps: [
        'Define security requirements',
        'Include in system specs',
        'Review implementations',
        'Test security controls',
        'Document compliance',
      ],
      examples: [
        'Security requirements doc',
        'System specifications',
        'Test results',
      ],
      evidenceTypes: [
        {
          type: 'Requirements Documentation',
          description: 'Security requirements documentation',
          examples: ['Requirements Spec.pdf', 'Security Design.pdf'],
          required: true,
        },
      ],
      furtherStudy: [
        {
          title: 'Secure Development Guide',
          url: 'https://www.owasp.org/secure-development',
          description: 'OWASP guidance on secure development',
        },
      ],
    },
    'A.14.1': {
      overview: 'Information security requirements for supplier relationships shall be agreed and documented.',
      steps: [
        'Define supplier requirements',
        'Document agreements',
        'Monitor compliance',
        'Review performance',
        'Update requirements',
      ],
      examples: [
        'Supplier security policy',
        'Security agreements',
        'Compliance reports',
      ],
      evidenceTypes: [
        {
          type: 'Supplier Documentation',
          description: 'Supplier security documentation',
          examples: ['Supplier Policy.pdf', 'Security Agreements.pdf'],
          required: true,
        },
      ],
      furtherStudy: [
        {
          title: 'Supplier Security Guide',
          url: 'https://www.ncsc.gov.uk/supplier-security',
          description: 'NCSC guidance on supplier security',
        },
      ],
    },
    'A.15.1': {
      overview: 'Management responsibilities and procedures shall be established to ensure quick response to security incidents.',
      steps: [
        'Define incident procedures',
        'Assign responsibilities',
        'Train response team',
        'Test procedures',
        'Review and update',
      ],
      examples: [
        'Incident response plan',
        'Contact lists',
        'Response procedures',
      ],
      evidenceTypes: [
        {
          type: 'Incident Documentation',
          description: 'Incident management documentation',
          examples: ['Incident Plan.pdf', 'Response Procedures.pdf'],
          required: true,
        },
      ],
      furtherStudy: [
        {
          title: 'Incident Response Guide',
          url: 'https://www.nist.gov/incident-response',
          description: 'NIST guidance on incident response',
        },
      ],
    },
    'A.16.1': {
      overview: 'Information security continuity shall be embedded in business continuity management systems.',
      steps: [
        'Define continuity requirements',
        'Develop continuity plans',
        'Test plans',
        'Update documentation',
        'Train personnel',
      ],
      examples: [
        'Continuity plan',
        'Recovery procedures',
        'Test results',
      ],
      evidenceTypes: [
        {
          type: 'Continuity Documentation',
          description: 'Business continuity documentation',
          examples: ['Continuity Plan.pdf', 'Recovery Docs.pdf'],
          required: true,
        },
      ],
      furtherStudy: [
        {
          title: 'Business Continuity Guide',
          url: 'https://www.iso.org/22301',
          description: 'ISO guidance on business continuity',
        },
      ],
    },
    'A.17.1': {
      overview: 'All relevant legislative, regulatory, and contractual requirements shall be identified and complied with.',
      steps: [
        'Identify requirements',
        'Document compliance',
        'Monitor changes',
        'Update procedures',
        'Review compliance',
      ],
      examples: [
        'Compliance register',
        'Legal requirements',
        'Audit reports',
      ],
      evidenceTypes: [
        {
          type: 'Compliance Documentation',
          description: 'Legal compliance documentation',
          examples: ['Compliance Register.pdf', 'Audit Reports.pdf'],
          required: true,
        },
      ],
      furtherStudy: [
        {
          title: 'Compliance Guide',
          url: 'https://www.iso.org/27001-legal',
          description: 'ISO guidance on legal compliance',
        },
      ],
    },
    'A.18.1': {
      overview: 'Security responsibilities shall be defined and communicated before employment.',
      steps: [
        'Define responsibilities',
        'Document in contracts',
        'Communicate expectations',
        'Verify understanding',
        'Maintain records',
      ],
      examples: [
        'Job descriptions',
        'Security policies',
        'Training materials',
      ],
      evidenceTypes: [
        {
          type: 'Employment Documentation',
          description: 'Pre-employment documentation',
          examples: ['Job Descriptions.pdf', 'Security Policies.pdf'],
          required: true,
        },
      ],
      furtherStudy: [
        {
          title: 'HR Security Guide',
          url: 'https://www.shrm.org/security',
          description: 'SHRM guidance on security responsibilities',
        },
      ],
    }
  }
}
