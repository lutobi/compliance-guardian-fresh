import { FrameworkData } from '@/types/framework-data.types'

export const learnFrameworks: FrameworkData[] = [
  {
    name: 'ISO 27001:2022',
    version: '2022',
    description: 'ISO/IEC 27001 is an international standard for information security management',
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
            description: 'Information security shall be integrated into project management'
          }
        ]
      },
      {
        id: 'A.6',
        title: 'People Controls',
        description: 'Controls related to personnel security',
        subControls: [
          {
            id: 'A.6.1',
            title: 'Screening',
            description: 'Background verification checks on candidates'
          },
          {
            id: 'A.6.2',
            title: 'Terms and conditions of employment',
            description: 'Employee contractual agreements'
          },
          {
            id: 'A.6.3',
            title: 'Information security awareness, education and training',
            description: 'Security awareness program'
          },
          {
            id: 'A.6.4',
            title: 'Disciplinary process',
            description: 'Process for taking action against employees who violate security'
          },
          {
            id: 'A.6.5',
            title: 'Responsibilities after termination or change of employment',
            description: 'Security responsibilities that remain valid after employment change or termination'
          },
          {
            id: 'A.6.6',
            title: 'Confidentiality or non-disclosure agreements',
            description: 'Protection of organizational information through agreements'
          },
          {
            id: 'A.6.7',
            title: 'Remote working',
            description: 'Security measures for remote working'
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
            description: 'Physical security for offices, rooms and facilities'
          },
          {
            id: 'A.7.4',
            title: 'Physical security monitoring',
            description: 'Premises shall be monitored for unauthorized access'
          },
          {
            id: 'A.7.5',
            title: 'Protecting against physical and environmental threats',
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
          },
          {
            id: 'A.7.9',
            title: 'Security of assets off-premises',
            description: 'Security of assets outside organizational premises'
          },
          {
            id: 'A.7.10',
            title: 'Storage media',
            description: 'Management of removable storage media'
          },
          {
            id: 'A.7.11',
            title: 'Supporting utilities',
            description: 'Protection of equipment from power failures and other disruptions'
          },
          {
            id: 'A.7.12',
            title: 'Cabling security',
            description: 'Protection of power and telecommunications cabling'
          },
          {
            id: 'A.7.13',
            title: 'Equipment maintenance',
            description: 'Correct and secure maintenance of equipment'
          },
          {
            id: 'A.7.14',
            title: 'Secure disposal or re-use of equipment',
            description: 'Verification of storage media before disposal or re-use'
          }
        ]
      },
      {
        id: 'A.8',
        title: 'Technological Controls',
        description: 'Controls related to technology and systems security',
        subControls: [
          {
            id: 'A.8.1',
            title: 'User endpoint devices',
            description: 'Security requirements for user endpoint devices'
          },
          {
            id: 'A.8.2',
            title: 'Privileged access rights',
            description: 'Management and control of privileged access rights'
          },
          {
            id: 'A.8.3',
            title: 'Information access restriction',
            description: 'Control access to information and application functions'
          },
          {
            id: 'A.8.4',
            title: 'Access to source code',
            description: 'Restricting access to source code'
          },
          {
            id: 'A.8.5',
            title: 'Secure authentication',
            description: 'Management of authentication mechanisms'
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
          },
          {
            id: 'A.8.9',
            title: 'Configuration management',
            description: 'Security configuration baseline for systems'
          },
          {
            id: 'A.8.10',
            title: 'Information deletion',
            description: 'Secure deletion of information in systems'
          },
          {
            id: 'A.8.11',
            title: 'Data masking',
            description: 'Protection of sensitive information through masking'
          },
          {
            id: 'A.8.12',
            title: 'Data leakage prevention',
            description: 'Prevention of unauthorized data exfiltration'
          },
          {
            id: 'A.8.13',
            title: 'Information backup',
            description: 'Protection of information through backup'
          },
          {
            id: 'A.8.14',
            title: 'Redundancy of information processing facilities',
            description: 'Availability of processing facilities'
          },
          {
            id: 'A.8.15',
            title: 'Logging',
            description: 'Recording of user and system activities'
          },
          {
            id: 'A.8.16',
            title: 'Monitoring activities',
            description: 'Detection of unauthorized information processing activities'
          },
          {
            id: 'A.8.17',
            title: 'Clock synchronization',
            description: 'Synchronization of system clocks'
          },
          {
            id: 'A.8.18',
            title: 'Use of privileged utility programs',
            description: 'Restriction and control of utility programs'
          },
          {
            id: 'A.8.19',
            title: 'Installation of software on operational systems',
            description: 'Control of software installation on systems'
          },
          {
            id: 'A.8.20',
            title: 'Networks security',
            description: 'Security of network services'
          },
          {
            id: 'A.8.21',
            title: 'Security of network services',
            description: 'Management and control of network services'
          },
          {
            id: 'A.8.22',
            title: 'Web filtering',
            description: 'Filtering of web traffic'
          },
          {
            id: 'A.8.23',
            title: 'Security of network services',
            description: 'Segregation of networks'
          },
          {
            id: 'A.8.24',
            title: 'Use of cryptography',
            description: 'Controls for cryptographic keys'
          },
          {
            id: 'A.8.25',
            title: 'Secure development lifecycle',
            description: 'Security in development processes'
          }
        ]
      },
      {
        id: 'A.9',
        title: 'Access Controls',
        description: 'Controls for system and information access',
        subControls: [
          {
            id: 'A.9.1',
            title: 'Access control policy',
            description: 'Business requirements for access control'
          },
          {
            id: 'A.9.2',
            title: 'User access management',
            description: 'Ensure authorized user access and prevent unauthorized access'
          },
          {
            id: 'A.9.3',
            title: 'User responsibilities',
            description: 'Make users accountable for safeguarding their authentication information'
          }
        ]
      },
      {
        id: 'A.10',
        title: 'Cryptography Controls',
        description: 'Controls for cryptographic security',
        subControls: [
          {
            id: 'A.10.1',
            title: 'Cryptographic controls policy',
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
        title: 'Operational Security',
        description: 'Controls for operational procedures and responsibilities',
        subControls: [
          {
            id: 'A.11.1',
            title: 'Operational procedures and responsibilities',
            description: 'Ensure correct and secure operations of information processing facilities'
          },
          {
            id: 'A.11.2',
            title: 'Protection from malware',
            description: 'Ensure protection against malware'
          },
          {
            id: 'A.11.3',
            title: 'Backup',
            description: 'Protect against loss of data'
          }
        ]
      },
      {
        id: 'A.12',
        title: 'Communications Security',
        description: 'Controls for network security management',
        subControls: [
          {
            id: 'A.12.1',
            title: 'Network security management',
            description: 'Ensure the protection of information in networks'
          },
          {
            id: 'A.12.2',
            title: 'Information transfer',
            description: 'Maintain the security of information transferred within an organization and with external entities'
          }
        ]
      },
      {
        id: 'A.13',
        title: 'System Development',
        description: 'Controls for system acquisition, development and maintenance',
        subControls: [
          {
            id: 'A.13.1',
            title: 'Security requirements of information systems',
            description: 'Ensure that security is an integral part of information systems'
          },
          {
            id: 'A.13.2',
            title: 'Security in development processes',
            description: 'Ensure that information security is designed and implemented within the development lifecycle'
          },
          {
            id: 'A.13.3',
            title: 'Test data',
            description: 'Ensure the protection of data used for testing'
          }
        ]
      },
      {
        id: 'A.14',
        title: 'Supplier Relationships',
        description: 'Controls for supplier relationships',
        subControls: [
          {
            id: 'A.14.1',
            title: 'Information security in supplier relationships',
            description: 'Ensure protection of organizational assets accessible by suppliers'
          },
          {
            id: 'A.14.2',
            title: 'Supplier service delivery management',
            description: 'Maintain an agreed level of information security and service delivery'
          }
        ]
      },
      {
        id: 'A.15',
        title: 'Incident Management',
        description: 'Controls for information security incident management',
        subControls: [
          {
            id: 'A.15.1',
            title: 'Management of information security incidents',
            description: 'Ensure a consistent and effective approach to incident management'
          },
          {
            id: 'A.15.2',
            title: 'Information security incident response',
            description: 'Respond to information security incidents in a timely manner'
          }
        ]
      },
      {
        id: 'A.16',
        title: 'Business Continuity',
        description: 'Information security aspects of business continuity management',
        subControls: [
          {
            id: 'A.16.1',
            title: 'Information security continuity',
            description: 'Information security continuity shall be embedded in business continuity management systems'
          },
          {
            id: 'A.16.2',
            title: 'Redundancies',
            description: 'Ensure availability of information processing facilities'
          }
        ]
      },
      {
        id: 'A.17',
        title: 'Compliance',
        description: 'Controls for compliance with legal and contractual requirements',
        subControls: [
          {
            id: 'A.17.1',
            title: 'Compliance with legal requirements',
            description: 'Avoid breaches of legal, statutory, regulatory or contractual obligations'
          },
          {
            id: 'A.17.2',
            title: 'Information security reviews',
            description: 'Ensure information security is implemented and operated in accordance with organizational policies'
          }
        ]
      },
      {
        id: 'A.18',
        title: 'Human Resource Security',
        description: 'Controls related to human resource security',
        subControls: [
          {
            id: 'A.18.1',
            title: 'Prior to employment',
            description: 'Ensure employees understand their responsibilities'
          },
          {
            id: 'A.18.2',
            title: 'During employment',
            description: 'Ensure employees are aware of and fulfill their information security responsibilities'
          },
          {
            id: 'A.18.3',
            title: 'Termination and change of employment',
            description: 'Protect organizational interests as part of the process of changing or terminating employment'
          }
        ]
      }
    ]
  },
  {
    name: 'NIST CSF',
    version: '2.0',
    description: 'The NIST Cybersecurity Framework provides a policy framework of computer security guidance',
    controls: [
      {
        id: 'ID',
        title: 'Identify',
        description: 'Develop organizational understanding to manage cybersecurity risk to systems, people, assets, data, and capabilities',
        subControls: [
          {
            id: 'ID.AM',
            title: 'Asset Management',
            description: 'The data, personnel, devices, systems, and facilities that enable the organization to achieve business purposes are identified and managed',
          },
          {
            id: 'ID.BE',
            title: 'Business Environment',
            description: 'The organization\'s mission, objectives, stakeholders, and activities are understood and prioritized',
          },
          {
            id: 'ID.GV',
            title: 'Governance',
            description: 'The policies, procedures, and processes to manage and monitor organizational regulatory, legal, risk, environmental, and operational requirements',
          },
          {
            id: 'ID.RA',
            title: 'Risk Assessment',
            description: 'The organization understands the cybersecurity risks to operations, assets, and individuals',
          },
          {
            id: 'ID.RM',
            title: 'Risk Management Strategy',
            description: 'The organization\'s priorities, constraints, risk tolerances, and assumptions are established',
          },
          {
            id: 'ID.SC',
            title: 'Supply Chain Risk Management',
            description: 'The organization\'s priorities, constraints, risk tolerances, and assumptions are established and used to support risk decisions',
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
            description: 'Access to physical and logical assets and associated facilities is limited to authorized users, processes, and devices',
          },
          {
            id: 'PR.AT',
            title: 'Awareness and Training',
            description: 'The organization\'s personnel and partners are trained to perform their cybersecurity-related duties and responsibilities',
          },
          {
            id: 'PR.DS',
            title: 'Data Security',
            description: 'Information and records (data) are managed consistent with the organization\'s risk strategy to protect confidentiality, integrity, and availability',
          },
          {
            id: 'PR.IP',
            title: 'Information Protection Processes and Procedures',
            description: 'Security policies, processes, and procedures are maintained and used to manage protection of information systems and assets',
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
            description: 'Anomalous activity is detected and the potential impact of events is understood',
          },
          {
            id: 'DE.CM',
            title: 'Security Continuous Monitoring',
            description: 'The information system and assets are monitored to identify cybersecurity events and verify the effectiveness of protective measures',
          },
          {
            id: 'DE.DP',
            title: 'Detection Processes',
            description: 'Detection processes and procedures are maintained and tested to ensure awareness of anomalous events',
          }
        ]
      }
    ]
  },
  {
    name: 'SOC 2',
    version: '2017',
    description: 'SOC 2 defines criteria for managing customer data based on five "trust service criteria"',
    controls: [
      {
        id: 'CC',
        title: 'Common Criteria',
        description: 'The common criteria controls that apply across all trust service categories',
        subControls: [
          {
            id: 'CC1.0',
            title: 'Control Environment',
            description: 'The control environment sets the tone of an organization, influencing the control consciousness of its people',
          },
          {
            id: 'CC2.0',
            title: 'Communication and Information',
            description: 'Information is necessary for the entity to carry out internal control responsibilities',
          },
          {
            id: 'CC3.0',
            title: 'Risk Assessment',
            description: 'The entity specifies objectives with sufficient clarity to enable the identification and assessment of risks',
          },
          {
            id: 'CC4.0',
            title: 'Monitoring Activities',
            description: 'The entity selects, develops, and performs ongoing evaluations to ascertain whether components are present and functioning',
          }
        ]
      },
      {
        id: 'A',
        title: 'Availability',
        description: 'Controls that support that systems are available for operation and use to meet objectives',
        subControls: [
          {
            id: 'A1.1',
            title: 'Availability Planning',
            description: 'The entity maintains, monitors, and evaluates current processing capacity and use of system components',
          },
          {
            id: 'A1.2',
            title: 'Environmental Protections',
            description: 'Environmental protections, software, data backup processes, and recovery infrastructure are designed, developed, implemented, operated, maintained, and monitored',
          },
          {
            id: 'A1.3',
            title: 'Backup and Recovery',
            description: 'Procedures supporting system recovery in accordance with recovery objectives are implemented and maintained',
          }
        ]
      },
      {
        id: 'C',
        title: 'Confidentiality',
        description: 'Information designated as confidential is protected according to policy',
        subControls: [
          {
            id: 'C1.1',
            title: 'Confidentiality Policies',
            description: 'The entity identifies and maintains confidential information to meet objectives',
          },
          {
            id: 'C1.2',
            title: 'Confidentiality of Data',
            description: 'The entity disposes of confidential information to meet objectives',
          }
        ]
      }
    ]
  },
  {
    name: 'PCI DSS',
    version: '4.0',
    description: 'Payment Card Industry Data Security Standard - Requirements and security assessment procedures',
    controls: [
      {
        id: 'R1',
        title: 'Build and Maintain a Secure Network',
        description: 'Requirements for secure network architecture and configurations',
        subControls: [
          {
            id: 'R1.1',
            title: 'Firewall Configuration',
            description: 'Install and maintain a firewall configuration to protect cardholder data',
          },
          {
            id: 'R1.2',
            title: 'System Passwords',
            description: 'Do not use vendor-supplied defaults for system passwords and other security parameters',
          }
        ]
      },
      {
        id: 'R2',
        title: 'Protect Cardholder Data',
        description: 'Requirements for protection of cardholder data',
        subControls: [
          {
            id: 'R2.1',
            title: 'Data Protection',
            description: 'Protect stored cardholder data',
          },
          {
            id: 'R2.2',
            title: 'Encryption',
            description: 'Encrypt transmission of cardholder data across open, public networks',
          }
        ]
      },
      {
        id: 'R3',
        title: 'Maintain a Vulnerability Management Program',
        description: 'Requirements for vulnerability management',
        subControls: [
          {
            id: 'R3.1',
            title: 'Antivirus',
            description: 'Use and regularly update anti-virus software or programs',
          },
          {
            id: 'R3.2',
            title: 'Secure Systems',
            description: 'Develop and maintain secure systems and applications',
          }
        ]
      }
    ]
  },
  {
    name: 'ISO 42001',
    version: '2023',
    description: 'International standard for artificial intelligence management systems',
    controls: [
      {
        id: '4',
        title: 'Context of the Organization',
        description: 'Understanding the organization and its context in relation to AI systems',
        subControls: [
          {
            id: '4.1',
            title: 'AI Strategy and Objectives',
            description: 'Establishing strategic direction and objectives for AI implementation'
          },
          {
            id: '4.2',
            title: 'Stakeholder Requirements',
            description: 'Understanding stakeholder needs and expectations regarding AI systems'
          },
          {
            id: '4.3',
            title: 'AI Risk Assessment',
            description: 'Evaluating risks and opportunities related to AI implementation'
          }
        ]
      },
      {
        id: '5',
        title: 'AI Ethics and Governance',
        description: 'Ensuring ethical AI development and deployment',
        subControls: [
          {
            id: '5.1',
            title: 'Ethical Principles',
            description: 'Establishing and maintaining ethical principles for AI development'
          },
          {
            id: '5.2',
            title: 'Bias Management',
            description: 'Identifying and mitigating AI bias in systems and data'
          },
          {
            id: '5.3',
            title: 'Transparency',
            description: 'Ensuring transparency in AI decision-making processes'
          }
        ]
      },
      {
        id: '6',
        title: 'AI Operations',
        description: 'Managing AI systems throughout their lifecycle',
        subControls: [
          {
            id: '6.1',
            title: 'Data Management',
            description: 'Managing data quality and integrity for AI systems'
          },
          {
            id: '6.2',
            title: 'Model Governance',
            description: 'Controlling AI model development, testing, and deployment'
          }
        ]
      }
    ]
  },
  {
    name: 'GDPR',
    version: '2018',
    description: 'General Data Protection Regulation - EU data protection and privacy regulation',
    controls: [
      {
        id: 'DP',
        title: 'Data Protection Principles',
        description: 'Core principles for processing personal data',
        subControls: [
          {
            id: 'DP.1',
            title: 'Lawfulness and Transparency',
            description: 'Ensuring lawful basis and transparency in data processing'
          },
          {
            id: 'DP.2',
            title: 'Purpose Limitation',
            description: 'Processing data for specified, explicit, and legitimate purposes'
          },
          {
            id: 'DP.3',
            title: 'Data Minimization',
            description: 'Limiting data collection to what is necessary'
          }
        ]
      },
      {
        id: 'DR',
        title: 'Data Subject Rights',
        description: 'Rights of individuals regarding their personal data',
        subControls: [
          {
            id: 'DR.1',
            title: 'Access Rights',
            description: 'Providing individuals access to their personal data'
          },
          {
            id: 'DR.2',
            title: 'Right to Erasure',
            description: 'Implementing the right to be forgotten'
          },
          {
            id: 'DR.3',
            title: 'Data Portability',
            description: 'Enabling data transfer between controllers'
          }
        ]
      },
      {
        id: 'DS',
        title: 'Data Security',
        description: 'Security measures for personal data protection',
        subControls: [
          {
            id: 'DS.1',
            title: 'Technical Measures',
            description: 'Implementing appropriate technical security measures'
          },
          {
            id: 'DS.2',
            title: 'Organizational Measures',
            description: 'Establishing organizational security controls'
          }
        ]
      }
    ]
  },
  {
    name: 'HIPAA',
    version: '2013',
    description: 'Health Insurance Portability and Accountability Act - Privacy and Security Rules',
    controls: [
      {
        id: 'Privacy',
        title: 'Privacy Rule',
        description: 'Standards for protection of medical records and personal health information',
        subControls: [
          {
            id: 'P.1',
            title: 'Notice of Privacy Practices',
            description: 'Providing notice of privacy practices and individual rights'
          },
          {
            id: 'P.2',
            title: 'Minimum Necessary',
            description: 'Using or disclosing only the minimum necessary protected health information'
          },
          {
            id: 'P.3',
            title: 'Patient Rights',
            description: 'Individual rights regarding their health information'
          },
          {
            id: 'P.4',
            title: 'Uses and Disclosures',
            description: 'Rules for using and disclosing protected health information'
          },
          {
            id: 'P.5',
            title: 'Business Associates',
            description: 'Requirements for business associate agreements and compliance'
          },
          {
            id: 'P.6',
            title: 'Administrative Requirements',
            description: 'Administrative requirements for privacy rule compliance'
          }
        ]
      },
      {
        id: 'Security',
        title: 'Security Rule',
        description: 'Technical and non-technical safeguards for protected health information',
        subControls: [
          {
            id: 'S.1',
            title: 'Administrative Safeguards',
            description: 'Security management processes and assigned security responsibility',
            subControls: [
              {
                id: 'S.1.1',
                title: 'Security Management Process',
                description: 'Risk analysis, risk management, sanction policy, and information system activity review'
              },
              {
                id: 'S.1.2',
                title: 'Assigned Security Responsibility',
                description: 'Identifying the security official responsible for policies and procedures'
              },
              {
                id: 'S.1.3',
                title: 'Workforce Security',
                description: 'Authorization and supervision, workforce clearance, and termination procedures'
              },
              {
                id: 'S.1.4',
                title: 'Information Access Management',
                description: 'Access authorization, establishment, and modification'
              },
              {
                id: 'S.1.5',
                title: 'Security Awareness and Training',
                description: 'Security reminders, malicious software, login monitoring, and password management'
              }
            ]
          },
          {
            id: 'S.2',
            title: 'Physical Safeguards',
            description: 'Facility access controls and workstation/device security',
            subControls: [
              {
                id: 'S.2.1',
                title: 'Facility Access Controls',
                description: 'Contingency operations, facility security plan, access control and validation'
              },
              {
                id: 'S.2.2',
                title: 'Workstation Use',
                description: 'Policies and procedures for workstation use and security'
              },
              {
                id: 'S.2.3',
                title: 'Device and Media Controls',
                description: 'Disposal, media re-use, accountability, and data backup and storage'
              }
            ]
          },
          {
            id: 'S.3',
            title: 'Technical Safeguards',
            description: 'Access control, audit controls, and transmission security',
            subControls: [
              {
                id: 'S.3.1',
                title: 'Access Control',
                description: 'Unique user identification, emergency access, automatic logoff, and encryption'
              },
              {
                id: 'S.3.2',
                title: 'Audit Controls',
                description: 'Hardware, software, and procedural mechanisms for activity tracking'
              },
              {
                id: 'S.3.3',
                title: 'Integrity Controls',
                description: 'Mechanisms to authenticate ePHI and prevent improper alteration or destruction'
              },
              {
                id: 'S.3.4',
                title: 'Person or Entity Authentication',
                description: 'Procedures to verify that a person seeking access is the claimed person'
              },
              {
                id: 'S.3.5',
                title: 'Transmission Security',
                description: 'Technical security measures to guard against unauthorized access during transmission'
              }
            ]
          }
        ]
      },
      {
        id: 'Breach',
        title: 'Breach Notification',
        description: 'Requirements for notification of health information breaches',
        subControls: [
          {
            id: 'B.1',
            title: 'Breach Assessment',
            description: 'Assessing and determining if a breach has occurred',
            subControls: [
              {
                id: 'B.1.1',
                title: 'Risk Assessment',
                description: 'Evaluating the probability that PHI has been compromised'
              },
              {
                id: 'B.1.2',
                title: 'Exceptions',
                description: 'Determining if the incident falls under breach notification exceptions'
              }
            ]
          },
          {
            id: 'B.2',
            title: 'Notification Requirements',
            description: 'Requirements for notifying affected individuals and authorities',
            subControls: [
              {
                id: 'B.2.1',
                title: 'Individual Notification',
                description: 'Timing, content, and methods of individual breach notification'
              },
              {
                id: 'B.2.2',
                title: 'Media Notification',
                description: 'Requirements for notifying media of large breaches'
              },
              {
                id: 'B.2.3',
                title: 'HHS Notification',
                description: 'Requirements for notifying the Secretary of HHS'
              }
            ]
          },
          {
            id: 'B.3',
            title: 'Business Associate Obligations',
            description: 'Business associate responsibilities regarding breach notification',
            subControls: [
              {
                id: 'B.3.1',
                title: 'BA to Covered Entity',
                description: 'Requirements for BAs to notify covered entities of breaches'
              },
              {
                id: 'B.3.2',
                title: 'Timing and Content',
                description: 'Timing and content requirements for BA breach notifications'
              }
            ]
          }
        ]
      }
    ]
  }
]
