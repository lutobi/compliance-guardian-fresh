import { FrameworkData } from '../types/framework-data.types'

export const soc2Framework: FrameworkData = {
  name: 'SOC 2',
  version: '2017',
  description: 'Service Organization Control 2 - Trust Services Criteria for Security, Availability, Processing Integrity, Confidentiality, and Privacy',
  controls: [
    {
      name: 'Trust Services Criteria',
      controls: [
        {
          id: 'CC1',
          title: 'Control Environment',
          description: 'The criteria relevant to how the organization demonstrates commitment to integrity and ethical values',
          subControls: [
            {
              id: 'CC1.1',
              title: 'Demonstrates Commitment to Integrity and Ethical Values',
              description: 'Organization demonstrates commitment to integrity and ethical values'
            },
            {
              id: 'CC1.2',
              title: 'Exercises Oversight Responsibility',
              description: 'Board of directors demonstrates independence from management'
            },
            {
              id: 'CC1.3',
              title: 'Establishes Structure, Authority, and Responsibility',
              description: 'Management establishes structures, reporting lines, authorities, and responsibilities'
            },
            {
              id: 'CC1.4',
              title: 'Demonstrates Commitment to Competence',
              description: 'Organization demonstrates commitment to attract, develop, and retain competent individuals'
            },
            {
              id: 'CC1.5',
              title: 'Enforces Accountability',
              description: 'Organization holds individuals accountable for their internal control responsibilities'
            }
          ]
        },
        {
          id: 'CC2',
          title: 'Communication and Information',
          description: 'The criteria relevant to how the organization communicates and manages information',
          subControls: [
            {
              id: 'CC2.1',
              title: 'Specifies Objectives',
              description: 'Organization specifies objectives with sufficient clarity'
            },
            {
              id: 'CC2.2',
              title: 'Identifies and Assesses Risks',
              description: 'Organization identifies and assesses risks to achieving objectives'
            },
            {
              id: 'CC2.3',
              title: 'Selects and Develops Control Activities',
              description: 'Organization selects and develops control activities that mitigate risks'
            }
          ]
        },
        {
          id: 'CC3',
          title: 'Risk Assessment',
          description: 'The criteria relevant to how the organization manages risks',
          subControls: [
            {
              id: 'CC3.1',
              title: 'Identifies and Assesses Changes',
              description: 'Organization identifies and assesses changes that could impact the system of internal control'
            },
            {
              id: 'CC3.2',
              title: 'Assesses Fraud Risk',
              description: 'Organization identifies and assesses fraud risks'
            },
            {
              id: 'CC3.3',
              title: 'Implements Risk Responses',
              description: 'Organization identifies and implements risk responses'
            }
          ]
        },
        {
          id: 'CC4',
          title: 'Monitoring Activities',
          description: 'The criteria relevant to how the organization monitors controls',
          subControls: [
            {
              id: 'CC4.1',
              title: 'Evaluates and Communicates Deficiencies',
              description: 'Organization evaluates and communicates internal control deficiencies'
            },
            {
              id: 'CC4.2',
              title: 'Conducts Ongoing and Separate Evaluations',
              description: 'Organization selects, develops, and performs evaluations to monitor controls'
            }
          ]
        },
        {
          id: 'CC5',
          title: 'Control Activities',
          description: 'The criteria relevant to how the organization designs and implements controls',
          subControls: [
            {
              id: 'CC5.1',
              title: 'Selects and Develops Control Activities',
              description: 'Organization selects and develops control activities'
            },
            {
              id: 'CC5.2',
              title: 'Selects and Develops General Controls over Technology',
              description: 'Organization selects and develops general IT controls'
            },
            {
              id: 'CC5.3',
              title: 'Deploys Control Activities',
              description: 'Organization deploys control activities through policies and procedures'
            }
          ]
        },
        {
          id: 'CC6',
          title: 'Logical and Physical Access Controls',
          description: 'The criteria relevant to how the organization controls logical and physical access',
          subControls: [
            {
              id: 'CC6.1',
              title: 'Manages Logical Access Security',
              description: 'Organization implements logical access security software, infrastructure, and architectures'
            },
            {
              id: 'CC6.2',
              title: 'Manages Physical Access Security',
              description: 'Organization implements physical access security measures'
            },
            {
              id: 'CC6.3',
              title: 'Implements Access Controls',
              description: 'Organization implements access controls based on risk assessment'
            }
          ]
        },
        {
          id: 'CC7',
          title: 'System Operations',
          description: 'The criteria relevant to how the organization manages system operations',
          subControls: [
            {
              id: 'CC7.1',
              title: 'Manages Production Changes',
              description: 'Organization manages changes to infrastructure, data, software, and procedures'
            },
            {
              id: 'CC7.2',
              title: 'Manages Environmental Threats',
              description: 'Organization manages risks of environmental threats to system components'
            },
            {
              id: 'CC7.3',
              title: 'Manages System Recovery',
              description: 'Organization manages recovery plan and backup procedures'
            },
            {
              id: 'CC7.4',
              title: 'Manages Identification and Authentication',
              description: 'Organization manages identification and authentication of users'
            }
          ]
        },
        {
          id: 'CC8',
          title: 'Change Management',
          description: 'The criteria relevant to how the organization manages changes',
          subControls: [
            {
              id: 'CC8.1',
              title: 'Manages Infrastructure Changes',
              description: 'Organization authorizes, designs, develops, implements, and maintains infrastructure changes'
            },
            {
              id: 'CC8.2',
              title: 'Manages Application Changes',
              description: 'Organization manages application acquisition, development, and maintenance'
            }
          ]
        },
        {
          id: 'CC9',
          title: 'Risk Mitigation',
          description: 'The criteria relevant to how the organization mitigates risk',
          subControls: [
            {
              id: 'CC9.1',
              title: 'Identifies and Evaluates Risk',
              description: 'Organization identifies, selects, and develops risk mitigation activities'
            },
            {
              id: 'CC9.2',
              title: 'Implements Risk Mitigation Activities',
              description: 'Organization implements risk mitigation activities'
            }
          ]
        }
      ]
    }
  ]
}
