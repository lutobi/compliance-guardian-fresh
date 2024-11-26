import { FrameworkData } from '../types/framework-data.types'

export const defaultFrameworks: FrameworkData[] = [
  {
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
                description: 'Physical security for offices, rooms, and facilities shall be designed and applied'
              },
              {
                id: 'A.7.4',
                title: 'Protection against external and environmental threats',
                description: 'Physical protection against natural disasters, malicious attack or accidents'
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
                description: 'Access to program source code shall be restricted'
              }
            ]
          },
          {
            id: 'A.9',
            title: 'Cryptography',
            description: 'Controls related to cryptographic security',
            subControls: [
              {
                id: 'A.9.1',
                title: 'Cryptographic controls',
                description: 'Policy on the use of cryptographic controls'
              },
              {
                id: 'A.9.2',
                title: 'Key management',
                description: 'Management of cryptographic keys'
              },
              {
                id: 'A.9.3',
                title: 'Cryptographic algorithms',
                description: 'Use of approved cryptographic algorithms'
              }
            ]
          },
          {
            id: 'A.10',
            title: 'Operations Security',
            description: 'Controls related to operational security',
            subControls: [
              {
                id: 'A.10.1',
                title: 'Operational procedures and responsibilities',
                description: 'Documented operating procedures'
              },
              {
                id: 'A.10.2',
                title: 'Protection from malware',
                description: 'Controls against malware'
              },
              {
                id: 'A.10.3',
                title: 'Backup',
                description: 'Backup of information, software and system images'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'PCI DSS',
    version: '4.0',
    description: 'Payment Card Industry Data Security Standard',
    controls: [
      {
        name: 'Build and Maintain a Secure Network',
        controls: [
          {
            id: 'Requirement 1',
            title: 'Install and maintain network security controls',
            description: 'Network security controls (NSCs) are security control mechanisms that manage network traffic between networks and between network segments.',
            subControls: [
              {
                id: '1.1',
                title: 'Processes and mechanisms for managing network security controls are defined and understood',
                description: 'All security policies and operational procedures are documented, in use, and known to all affected parties.'
              },
              {
                id: '1.2',
                title: 'Network security controls (NSCs) are configured and maintained',
                description: 'NSC configurations restrict traffic between trusted and untrusted networks.'
              },
              {
                id: '1.3',
                title: 'Network access to and from the cardholder data environment is restricted',
                description: 'Controls are implemented to restrict network access to and from the cardholder data environment.'
              },
              {
                id: '1.4',
                title: 'Network connections between cardholder data environments and untrusted networks are regulated',
                description: 'Use network security controls to regulate connections between trusted and untrusted networks.'
              }
            ]
          },
          {
            id: 'Requirement 2',
            title: 'Apply secure configurations to all system components',
            description: 'System components include network devices, servers, computing devices, and applications.',
            subControls: [
              {
                id: '2.1',
                title: 'Processes and mechanisms for applying secure configurations are defined and understood',
                description: 'All security policies and operational procedures are documented, in use, and known to all affected parties.'
              },
              {
                id: '2.2',
                title: 'Vendor-supplied defaults are not used',
                description: 'Vendor-supplied defaults are changed before installing a system on the network.'
              },
              {
                id: '2.3',
                title: 'Wireless networks security controls',
                description: 'Security controls for wireless networks are implemented and configured.'
              }
            ]
          },
          {
            id: 'Requirement 3',
            title: 'Protect stored account data',
            description: 'Protection methods such as encryption, truncation, masking, and hashing are critical components of account data protection.',
            subControls: [
              {
                id: '3.1',
                title: 'Processes and mechanisms for protecting stored account data are defined and understood',
                description: 'All security policies and procedures for protecting stored account data are documented.'
              },
              {
                id: '3.2',
                title: 'Storage of account data is kept to a minimum',
                description: 'Storage and retention time of account data are limited to that required for business.'
              },
              {
                id: '3.3',
                title: 'Sensitive authentication data is not stored after authorization',
                description: 'Sensitive authentication data is not retained after authorization.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'NIST Cybersecurity Framework',
    version: '1.1',
    description: 'Framework for improving critical infrastructure cybersecurity',
    controls: [
      {
        name: 'Core Functions',
        controls: [
          {
            id: 'ID',
            title: 'Identify',
            description: 'Develop organizational understanding to manage cybersecurity risk to systems, people, assets, data, and capabilities',
            subControls: [
              {
                id: 'ID.AM',
                title: 'Asset Management',
                description: 'The data, personnel, devices, systems, and facilities that enable the organization to achieve business purposes are identified and managed'
              },
              {
                id: 'ID.BE',
                title: 'Business Environment',
                description: 'The organization\'s mission, objectives, stakeholders, and activities are understood and prioritized'
              },
              {
                id: 'ID.GV',
                title: 'Governance',
                description: 'The policies, procedures, and processes to manage and monitor organizational regulatory, legal, risk, environmental, and operational requirements'
              },
              {
                id: 'ID.RA',
                title: 'Risk Assessment',
                description: 'The organization understands the cybersecurity risks to operations, assets, and individuals'
              }
            ]
          },
          {
            id: 'PR',
            title: 'Protect',
            description: 'Develop and implement appropriate safeguards to ensure delivery of critical services',
            subControls: [
              {
                id: 'PR.AC',
                title: 'Access Control',
                description: 'Access to physical and logical assets and associated facilities is limited to authorized users, processes, and devices'
              },
              {
                id: 'PR.AT',
                title: 'Awareness and Training',
                description: 'The organization\'s personnel and partners are trained to perform their cybersecurity-related duties and responsibilities'
              },
              {
                id: 'PR.DS',
                title: 'Data Security',
                description: 'Information and records (data) are managed consistent with the organization\'s risk strategy to protect confidentiality, integrity, and availability'
              },
              {
                id: 'PR.IP',
                title: 'Information Protection Processes and Procedures',
                description: 'Security policies, processes, and procedures are maintained and used to manage protection of information systems and assets'
              }
            ]
          },
          {
            id: 'DE',
            title: 'Detect',
            description: 'Develop and implement appropriate activities to identify the occurrence of a cybersecurity event',
            subControls: [
              {
                id: 'DE.AE',
                title: 'Anomalies and Events',
                description: 'Anomalous activity is detected and the potential impact of events is understood'
              },
              {
                id: 'DE.CM',
                title: 'Security Continuous Monitoring',
                description: 'The information system and assets are monitored to identify cybersecurity events and verify the effectiveness of protective measures'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'SOC 2',
    version: '2017',
    description: 'Service Organization Control 2 - Trust Services Criteria',
    controls: [
      {
        name: 'Trust Services Criteria',
        controls: [
          {
            id: 'CC1.0',
            title: 'Control Environment',
            description: 'Common Criteria related to Control Environment',
            subControls: [
              {
                id: 'CC1.1',
                title: 'COSO Principle 1: Demonstrates Commitment to Integrity and Ethical Values',
                description: 'The entity demonstrates a commitment to integrity and ethical values.'
              },
              {
                id: 'CC1.2',
                title: 'COSO Principle 2: Exercises Oversight Responsibility',
                description: 'The board of directors demonstrates independence from management and exercises oversight responsibility.'
              },
              {
                id: 'CC1.3',
                title: 'COSO Principle 3: Establishes Structure, Authority, and Responsibility',
                description: 'Management establishes structures, reporting lines, and appropriate authorities and responsibilities.'
              }
            ]
          },
          {
            id: 'CC2.0',
            title: 'Communication and Information',
            description: 'Common Criteria related to Communication and Information',
            subControls: [
              {
                id: 'CC2.1',
                title: 'COSO Principle 13: Uses Relevant Information',
                description: 'The entity obtains or generates and uses relevant, quality information.'
              },
              {
                id: 'CC2.2',
                title: 'COSO Principle 14: Communicates Internally',
                description: 'The entity internally communicates information, including objectives and responsibilities.'
              },
              {
                id: 'CC2.3',
                title: 'COSO Principle 15: Communicates Externally',
                description: 'The entity communicates with external parties regarding matters affecting the functioning of internal control.'
              }
            ]
          }
        ]
      }
    ]
  }
]
