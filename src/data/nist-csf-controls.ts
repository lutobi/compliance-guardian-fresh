import { FrameworkData } from '../types/framework-data.types'

export const nistFramework: FrameworkData = {
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
            },
            {
              id: 'ID.RM',
              title: 'Risk Management Strategy',
              description: 'The organization\'s priorities, constraints, risk tolerances, and assumptions are established and used to support operational risk decisions'
            },
            {
              id: 'ID.SC',
              title: 'Supply Chain Risk Management',
              description: 'The organization\'s priorities, constraints, risk tolerances, and assumptions are established to support risk decisions associated with managing supply chain risk'
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
              title: 'Identity Management and Access Control',
              description: 'Access to physical and logical assets and associated facilities is limited to authorized users, processes, and devices'
            },
            {
              id: 'PR.AT',
              title: 'Awareness and Training',
              description: 'The organization\'s personnel and partners are provided cybersecurity awareness education and are trained to perform their duties and responsibilities consistent with related policies, procedures, and agreements'
            },
            {
              id: 'PR.DS',
              title: 'Data Security',
              description: 'Information and records (data) are managed consistent with the organization\'s risk strategy to protect the confidentiality, integrity, and availability of information'
            },
            {
              id: 'PR.IP',
              title: 'Information Protection Processes and Procedures',
              description: 'Security policies, processes, and procedures are maintained and used to manage protection of information systems and assets'
            },
            {
              id: 'PR.MA',
              title: 'Maintenance',
              description: 'Maintenance and repairs of industrial control and information system components are performed consistent with policies and procedures'
            },
            {
              id: 'PR.PT',
              title: 'Protective Technology',
              description: 'Technical security solutions are managed to ensure the security and resilience of systems and assets'
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
            },
            {
              id: 'DE.DP',
              title: 'Detection Processes',
              description: 'Detection processes and procedures are maintained and tested to ensure awareness of anomalous events'
            }
          ]
        },
        {
          id: 'RS',
          title: 'Respond',
          description: 'Develop and implement appropriate activities to take action regarding a detected cybersecurity incident',
          subControls: [
            {
              id: 'RS.RP',
              title: 'Response Planning',
              description: 'Response processes and procedures are executed and maintained to ensure response to detected cybersecurity incidents'
            },
            {
              id: 'RS.CO',
              title: 'Communications',
              description: 'Response activities are coordinated with internal and external stakeholders'
            },
            {
              id: 'RS.AN',
              title: 'Analysis',
              description: 'Analysis is conducted to ensure effective response and support recovery activities'
            },
            {
              id: 'RS.MI',
              title: 'Mitigation',
              description: 'Activities are performed to prevent expansion of an event, mitigate its effects, and resolve the incident'
            },
            {
              id: 'RS.IM',
              title: 'Improvements',
              description: 'Organizational response activities are improved by incorporating lessons learned from current and previous detection/response activities'
            }
          ]
        },
        {
          id: 'RC',
          title: 'Recover',
          description: 'Develop and implement appropriate activities to maintain plans for resilience and to restore any capabilities or services that were impaired due to a cybersecurity incident',
          subControls: [
            {
              id: 'RC.RP',
              title: 'Recovery Planning',
              description: 'Recovery processes and procedures are executed and maintained to ensure restoration of systems or assets affected by cybersecurity incidents'
            },
            {
              id: 'RC.IM',
              title: 'Improvements',
              description: 'Recovery planning and processes are improved by incorporating lessons learned into future activities'
            },
            {
              id: 'RC.CO',
              title: 'Communications',
              description: 'Restoration activities are coordinated with internal and external parties'
            }
          ]
        }
      ]
    }
  ]
}
