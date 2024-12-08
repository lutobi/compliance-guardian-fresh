import { FrameworkGuidance } from '@/types/control-guidance.types'

const iso27001Guidance: FrameworkGuidance = {
  frameworkId: 'ISO 27001:2022',
  controls: {
    'A.5': {
      overview: 'Organizational Controls establish the foundation for information security governance and management within the organization. These controls focus on policies, roles, responsibilities, and organizational structures.',
      steps: [
        'Establish an information security governance framework',
        'Define and document key security roles and responsibilities',
        'Develop comprehensive security policies and procedures',
        'Implement management oversight mechanisms',
        'Establish communication channels with authorities'
      ],
      examples: [
        'Information Security Management System (ISMS) documentation',
        'Security organization chart with defined roles and responsibilities',
        'Policy framework with regular review cycles',
        'Management review meeting minutes and action items',
        'Contact list for relevant authorities and stakeholders'
      ]
    },
    'A.5.1': {
      overview: 'Information Security Policies and Procedures establish the foundation for an organization\'s security program. These policies provide clear direction and support for information security in accordance with business requirements and relevant laws and regulations.',
      steps: [
        'Form an information security committee or working group to oversee policy development',
        'Identify regulatory requirements and business objectives that policies must address',
        'Develop comprehensive information security policies covering all key areas',
        'Review and obtain approval from senior management',
        'Communicate policies to all employees and relevant external parties',
        'Implement a regular review and update cycle for all policies',
        'Establish mechanisms to track policy compliance and effectiveness'
      ],
      examples: [
        'Information Security Policy Document: A master document outlining the organization\'s approach to information security.',
        'Acceptable Use Policy: Defines appropriate use of information systems and resources.',
        'Access Control Policy: Specifies rules for granting and revoking access to systems.',
        'Data Classification Policy: Guidelines for categorizing and handling different types of data.',
        'Incident Response Policy: Procedures for handling security incidents and breaches.'
      ]
    },
    'A.5.2': {
      overview: 'Information Security Roles and Responsibilities define clear accountability and authority for information security within the organization. This ensures proper oversight and execution of security controls.',
      steps: [
        'Identify key information security roles needed in the organization',
        'Define detailed responsibilities for each security role',
        'Document reporting lines and communication channels',
        'Assign qualified individuals to security roles',
        'Provide necessary resources and authority',
        'Establish performance metrics for security roles',
        'Implement regular review of role effectiveness'
      ],
      examples: [
        'RACI Matrix showing security responsibilities across the organization',
        'Job descriptions for key security roles (CISO, Security Manager, etc.)',
        'Security organization chart with reporting lines',
        'Role-based training and certification requirements',
        'Performance evaluation criteria for security personnel'
      ]
    },
    'A.5.3': {
      overview: 'Segregation of Duties ensures that no single person has excessive control over critical processes or systems. This reduces the risk of unauthorized access, fraud, or errors.',
      steps: [
        'Identify critical processes and systems requiring segregation',
        'Map out current access rights and responsibilities',
        'Define incompatible duties and roles',
        'Implement technical controls to enforce segregation',
        'Document exceptions and compensating controls',
        'Regular review of segregation effectiveness',
        'Monitor for violations or conflicts'
      ],
      examples: [
        'Access control matrix showing role separations',
        'Workflow diagrams with multiple approval steps',
        'Change management process with separate requestor and approver',
        'System configuration preventing conflicting access rights',
        'Exception documentation with risk assessments'
      ]
    },
    'A.5.4': {
      overview: 'Management Responsibilities ensure active engagement and support from top management in information security initiatives. This includes resource allocation, strategic alignment, and continuous improvement.',
      steps: [
        'Define management\'s security responsibilities',
        'Establish regular security reporting to management',
        'Allocate adequate resources for security',
        'Review and approve security strategies',
        'Monitor security program effectiveness',
        'Demonstrate visible commitment to security',
        'Participate in key security decisions'
      ],
      examples: [
        'Management review meeting minutes',
        'Security budget allocation documents',
        'Executive communications on security',
        'Strategic security roadmap approvals',
        'Security performance dashboard for management'
      ]
    },
    'A.5.5': {
      overview: 'Contact with Authorities ensures effective communication and coordination with relevant external parties. This includes law enforcement, regulators, and information sharing groups.',
      steps: [
        'Identify relevant authorities and regulatory bodies',
        'Establish formal points of contact',
        'Document communication procedures',
        'Maintain up-to-date contact information',
        'Regular engagement with authorities',
        'Test communication channels',
        'Document all interactions'
      ],
      examples: [
        'Contact list for authorities and regulators',
        'Incident reporting procedures',
        'Regulatory compliance reports',
        'Meeting minutes from authority engagements',
        'Information sharing agreements'
      ]
    },
    'A.6': {
      overview: 'People Controls focus on ensuring that employees and contractors understand their security responsibilities and are equipped to fulfill them effectively.',
      steps: [
        'Implement security screening procedures',
        'Provide comprehensive security training',
        'Define clear security responsibilities',
        'Monitor compliance with security policies',
        'Handle security violations appropriately'
      ],
      examples: [
        'Security awareness training program',
        'Employee security agreements',
        'Disciplinary procedures for security violations',
        'Performance reviews including security metrics',
        'Exit procedures for departing employees'
      ]
    },
    'A.6.1': {
      overview: 'Security Screening ensures that employees and contractors meet security requirements before being granted access to sensitive information or systems.',
      steps: [
        'Define screening requirements for different roles',
        'Implement background check procedures',
        'Verify professional qualifications',
        'Check references and employment history',
        'Document screening results',
        'Regular review of screening effectiveness',
        'Handle screening failures appropriately'
      ],
      examples: [
        'Background check policy and procedures',
        'Screening criteria for different roles',
        'Confidentiality agreements',
        'Reference check documentation',
        'Screening result records'
      ]
    },
    'A.6.2': {
      overview: 'Terms and Conditions of Employment clearly state security responsibilities that continue after employment ends.',
      steps: [
        'Define security terms in employment contracts',
        'Communicate security expectations clearly',
        'Include non-disclosure agreements',
        'Specify post-employment obligations',
        'Document acceptance of terms',
        'Regular review of terms',
        'Update terms as needed'
      ],
      examples: [
        'Employment contracts with security clauses',
        'Non-disclosure agreements',
        'Security responsibility statements',
        'Post-employment security obligations',
        'Signed acceptance records'
      ]
    },
    'A.8': {
      overview: 'Asset Management Controls ensure proper identification, classification, and protection of information assets throughout their lifecycle.',
      steps: [
        'Create and maintain asset inventory',
        'Implement asset classification scheme',
        'Define asset handling procedures',
        'Assign asset ownership',
        'Regular asset reviews and updates'
      ],
      examples: [
        'Asset inventory database',
        'Data classification guidelines',
        'Asset handling procedures',
        'Asset ownership matrix',
        'Asset review reports'
      ]
    },
    'A.8.1': {
      overview: 'Asset Inventory ensures all information assets are identified, documented, and tracked throughout their lifecycle.',
      steps: [
        'Define asset identification criteria',
        'Create comprehensive asset inventory',
        'Assign asset owners',
        'Regular inventory updates',
        'Track asset changes',
        'Implement asset tagging',
        'Regular inventory audits'
      ],
      examples: [
        'Asset inventory database with all relevant details',
        'Asset registration process',
        'Asset tracking system',
        'Inventory audit reports',
        'Asset change logs'
      ]
    }
  }
}

export default iso27001Guidance
