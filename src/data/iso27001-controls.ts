import { FrameworkData } from '../types/framework-data.types'

export const iso27001Framework: FrameworkData = {
  name: 'ISO 27001:2022',
  version: '2022',
  description: 'ISO/IEC 27001 is an international standard for information security management',
  controls: [
    {
      name: 'Information Security Controls',
      controls: [
        {
          id: 'A.5',
          title: 'Organizational Controls',
          description: 'Controls related to organizational aspects of information security',
          subControls: [
            {
              id: 'A.5.1',
              title: 'Policies for information security',
              description: 'Management direction for information security'
            },
            {
              id: 'A.5.2',
              title: 'Information security roles and responsibilities',
              description: 'Assignment of information security responsibilities'
            },
            {
              id: 'A.5.3',
              title: 'Segregation of duties',
              description: 'Conflicting duties and areas of responsibility shall be segregated'
            },
            {
              id: 'A.5.4',
              title: 'Management responsibilities',
              description: 'Management shall actively support security within the organization'
            },
            {
              id: 'A.5.5',
              title: 'Contact with authorities',
              description: 'Appropriate contacts with relevant authorities shall be maintained'
            },
            {
              id: 'A.5.6',
              title: 'Contact with special interest groups',
              description: 'Appropriate contacts with special interest groups shall be maintained'
            },
            {
              id: 'A.5.7',
              title: 'Threat intelligence',
              description: 'Information about technical security vulnerabilities shall be collected and analyzed'
            },
            {
              id: 'A.5.8',
              title: 'Information security in project management',
              description: 'Information security shall be addressed in project management'
            }
          ]
        },
        {
          id: 'A.6',
          title: 'People Controls',
          description: 'Controls related to human resources security',
          subControls: [
            {
              id: 'A.6.1',
              title: 'Screening',
              description: 'Background verification checks on candidates'
            },
            {
              id: 'A.6.2',
              title: 'Terms and conditions of employment',
              description: 'Contractual agreements with employees and contractors'
            },
            {
              id: 'A.6.3',
              title: 'Information security awareness, education and training',
              description: 'Security awareness program'
            },
            {
              id: 'A.6.4',
              title: 'Disciplinary process',
              description: 'Formal disciplinary process for information security violations'
            },
            {
              id: 'A.6.5',
              title: 'Responsibilities after termination or change of employment',
              description: 'Security responsibilities after employment changes'
            },
            {
              id: 'A.6.6',
              title: 'Confidentiality or non-disclosure agreements',
              description: 'Protection of organization\'s information through agreements'
            },
            {
              id: 'A.6.7',
              title: 'Remote working',
              description: 'Security when working from remote locations'
            },
            {
              id: 'A.6.8',
              title: 'Information security event reporting',
              description: 'Reporting of security events through appropriate channels'
            }
          ]
        },
        {
          id: 'A.7',
          title: 'Physical Controls',
          description: 'Controls related to physical and environmental security',
          subControls: [
            {
              id: 'A.7.1',
              title: 'Physical security perimeter',
              description: 'Security perimeters shall be defined and used'
            },
            {
              id: 'A.7.2',
              title: 'Physical entry controls',
              description: 'Secure areas shall be protected by appropriate entry controls'
            },
            {
              id: 'A.7.3',
              title: 'Securing offices, rooms and facilities',
              description: 'Physical security for offices, rooms, and facilities'
            },
            {
              id: 'A.7.4',
              title: 'Physical security monitoring',
              description: 'Premises shall be monitored for unauthorized access'
            },
            {
              id: 'A.7.5',
              title: 'Protection against physical and environmental threats',
              description: 'Protection against natural disasters, malicious attack or accidents'
            },
            {
              id: 'A.7.6',
              title: 'Working in secure areas',
              description: 'Controls for working in secure areas'
            },
            {
              id: 'A.7.7',
              title: 'Clear desk and clear screen',
              description: 'Policy for clear desk and clear screen'
            },
            {
              id: 'A.7.8',
              title: 'Equipment siting and protection',
              description: 'Protection of equipment from environmental threats and unauthorized access'
            }
          ]
        },
        {
          id: 'A.8',
          title: 'Technological Controls',
          description: 'Controls related to technology and systems',
          subControls: [
            {
              id: 'A.8.1',
              title: 'User endpoint devices',
              description: 'Security of user endpoint devices'
            },
            {
              id: 'A.8.2',
              title: 'Privileged access rights',
              description: 'Management of privileged access rights'
            },
            {
              id: 'A.8.3',
              title: 'Information access restriction',
              description: 'Access to information and application functions'
            },
            {
              id: 'A.8.4',
              title: 'Access to source code',
              description: 'Restrictions on access to source code'
            },
            {
              id: 'A.8.5',
              title: 'Secure authentication',
              description: 'System for managing passwords and other authentication methods'
            },
            {
              id: 'A.8.6',
              title: 'Capacity management',
              description: 'Monitoring and management of system resources'
            },
            {
              id: 'A.8.7',
              title: 'Protection against malware',
              description: 'Controls against malware'
            },
            {
              id: 'A.8.8',
              title: 'Management of technical vulnerabilities',
              description: 'Management of technical vulnerabilities in systems'
            }
          ]
        },
        {
          id: 'A.9',
          title: 'Access Control',
          description: 'Controls for system and application access control',
          subControls: [
            {
              id: 'A.9.1',
              title: 'Business requirements of access control',
              description: 'Access control policy based on business requirements'
            },
            {
              id: 'A.9.2',
              title: 'User access management',
              description: 'Formal user access provisioning process'
            },
            {
              id: 'A.9.3',
              title: 'User responsibilities',
              description: 'Users following good security practices'
            },
            {
              id: 'A.9.4',
              title: 'System and application access control',
              description: 'Preventing unauthorized access to systems and applications'
            }
          ]
        },
        {
          id: 'A.10',
          title: 'Cryptography',
          description: 'Controls for cryptographic measures',
          subControls: [
            {
              id: 'A.10.1',
              title: 'Cryptographic controls',
              description: 'Policy on the use of cryptographic controls'
            },
            {
              id: 'A.10.2',
              title: 'Key management',
              description: 'Management of cryptographic keys'
            }
          ]
        },
        {
          id: 'A.11',
          title: 'Physical and Environmental Security',
          description: 'Controls for secure areas and equipment',
          subControls: [
            {
              id: 'A.11.1',
              title: 'Secure areas',
              description: 'Physical security perimeter and entry controls'
            },
            {
              id: 'A.11.2',
              title: 'Equipment security',
              description: 'Security of equipment and assets'
            }
          ]
        },
        {
          id: 'A.12',
          title: 'Operations Security',
          description: 'Controls for operational procedures and responsibilities',
          subControls: [
            {
              id: 'A.12.1',
              title: 'Operational procedures and responsibilities',
              description: 'Documented operating procedures'
            },
            {
              id: 'A.12.2',
              title: 'Protection from malware',
              description: 'Controls against malware'
            },
            {
              id: 'A.12.3',
              title: 'Backup',
              description: 'Backup of information, software and systems'
            },
            {
              id: 'A.12.4',
              title: 'Logging and monitoring',
              description: 'Event logging and monitoring'
            },
            {
              id: 'A.12.5',
              title: 'Control of operational software',
              description: 'Installation of software on operational systems'
            },
            {
              id: 'A.12.6',
              title: 'Technical vulnerability management',
              description: 'Management of technical vulnerabilities'
            }
          ]
        },
        {
          id: 'A.13',
          title: 'Communications Security',
          description: 'Controls for network security and information transfer',
          subControls: [
            {
              id: 'A.13.1',
              title: 'Network security management',
              description: 'Management and control of networks'
            },
            {
              id: 'A.13.2',
              title: 'Information transfer',
              description: 'Secure information transfer'
            }
          ]
        },
        {
          id: 'A.14',
          title: 'System Acquisition, Development and Maintenance',
          description: 'Controls for development and support processes',
          subControls: [
            {
              id: 'A.14.1',
              title: 'Security requirements of information systems',
              description: 'Security requirements analysis and specification'
            },
            {
              id: 'A.14.2',
              title: 'Security in development and support processes',
              description: 'Secure development environment'
            },
            {
              id: 'A.14.3',
              title: 'Test data',
              description: 'Protection of test data'
            }
          ]
        },
        {
          id: 'A.15',
          title: 'Supplier Relationships',
          description: 'Controls for supplier access and service delivery',
          subControls: [
            {
              id: 'A.15.1',
              title: 'Information security in supplier relationships',
              description: 'Security requirements in supplier agreements'
            },
            {
              id: 'A.15.2',
              title: 'Supplier service delivery management',
              description: 'Monitoring and review of supplier services'
            }
          ]
        },
        {
          id: 'A.16',
          title: 'Information Security Incident Management',
          description: 'Controls for security incidents and improvements',
          subControls: [
            {
              id: 'A.16.1',
              title: 'Management of information security incidents',
              description: 'Responsibilities and procedures'
            },
            {
              id: 'A.16.2',
              title: 'Learning from information security incidents',
              description: 'Collection of evidence and learning from incidents'
            }
          ]
        },
        {
          id: 'A.17',
          title: 'Information Security Aspects of BCM',
          description: 'Controls for business continuity management',
          subControls: [
            {
              id: 'A.17.1',
              title: 'Information security continuity',
              description: 'Planning information security continuity'
            },
            {
              id: 'A.17.2',
              title: 'Redundancies',
              description: 'Availability of information processing facilities'
            }
          ]
        },
        {
          id: 'A.18',
          title: 'Compliance',
          description: 'Controls for compliance with legal and contractual requirements',
          subControls: [
            {
              id: 'A.18.1',
              title: 'Compliance with legal and contractual requirements',
              description: 'Identification of applicable legislation'
            },
            {
              id: 'A.18.2',
              title: 'Information security reviews',
              description: 'Independent review of information security'
            }
          ]
        }
      ]
    }
  ]
}
