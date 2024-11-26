import { FrameworkData } from '../types/framework-data.types'

export const iso42001Framework: FrameworkData = {
  name: 'ISO/IEC 42001',
  version: '2023',
  description: 'ISO/IEC 42001 is the international standard for Artificial Intelligence Management Systems (AIMS). It provides a framework for organizations to develop, implement, and improve their AI management practices while ensuring responsible and ethical AI development.',
  controls: [
    {
      name: 'Context of the Organization',
      controls: [
        {
          id: 'ISO42001-4.1',
          title: 'Understanding the Organization and its Context',
          description: 'Determine external and internal issues relevant to AI implementation that affect the ability to achieve intended outcomes.',
          subControls: [
            {
              id: 'ISO42001-4.1.1',
              title: 'AI Strategy Alignment',
              description: 'Ensure AI initiatives align with organizational objectives and strategic direction.'
            },
            {
              id: 'ISO42001-4.1.2',
              title: 'Stakeholder Analysis',
              description: 'Identify and analyze stakeholders affected by AI implementation.'
            }
          ]
        },
        {
          id: 'ISO42001-4.2',
          title: 'Understanding Needs and Expectations',
          description: 'Determine stakeholder requirements and expectations relevant to AI implementation.',
          subControls: [
            {
              id: 'ISO42001-4.2.1',
              title: 'Regulatory Compliance',
              description: 'Identify and monitor applicable laws and regulations for AI systems.'
            },
            {
              id: 'ISO42001-4.2.2',
              title: 'Ethical Considerations',
              description: 'Define ethical principles and guidelines for AI development and deployment.'
            }
          ]
        }
      ]
    },
    {
      name: 'Leadership',
      controls: [
        {
          id: 'ISO42001-5.1',
          title: 'Leadership and Commitment',
          description: 'Demonstrate leadership commitment to AI management system.',
          subControls: [
            {
              id: 'ISO42001-5.1.1',
              title: 'Resource Allocation',
              description: 'Ensure availability of resources for AI implementation and management.'
            },
            {
              id: 'ISO42001-5.1.2',
              title: 'AI Governance Structure',
              description: 'Establish clear roles and responsibilities for AI governance.'
            }
          ]
        },
        {
          id: 'ISO42001-5.2',
          title: 'Policy',
          description: 'Establish AI policy appropriate to organization\'s purpose.',
          subControls: [
            {
              id: 'ISO42001-5.2.1',
              title: 'AI Policy Framework',
              description: 'Develop and maintain comprehensive AI policies and procedures.'
            },
            {
              id: 'ISO42001-5.2.2',
              title: 'Communication Strategy',
              description: 'Establish methods for communicating AI policies to stakeholders.'
            }
          ]
        }
      ]
    },
    {
      name: 'Planning',
      controls: [
        {
          id: 'ISO42001-6.1',
          title: 'Actions to Address Risks and Opportunities',
          description: 'Plan actions to address risks and opportunities in AI implementation.',
          subControls: [
            {
              id: 'ISO42001-6.1.1',
              title: 'Risk Assessment',
              description: 'Conduct comprehensive risk assessments for AI systems.'
            },
            {
              id: 'ISO42001-6.1.2',
              title: 'Opportunity Analysis',
              description: 'Identify and evaluate opportunities for AI enhancement.'
            }
          ]
        },
        {
          id: 'ISO42001-6.2',
          title: 'AI Objectives and Planning',
          description: 'Establish AI objectives and plans to achieve them.',
          subControls: [
            {
              id: 'ISO42001-6.2.1',
              title: 'Performance Metrics',
              description: 'Define measurable AI performance indicators and targets.'
            },
            {
              id: 'ISO42001-6.2.2',
              title: 'Implementation Roadmap',
              description: 'Develop detailed plans for achieving AI objectives.'
            }
          ]
        }
      ]
    },
    {
      name: 'Support',
      controls: [
        {
          id: 'ISO42001-7.1',
          title: 'Resources',
          description: 'Determine and provide resources needed for AI implementation.',
          subControls: [
            {
              id: 'ISO42001-7.1.1',
              title: 'Infrastructure',
              description: 'Ensure adequate infrastructure for AI systems.'
            },
            {
              id: 'ISO42001-7.1.2',
              title: 'Competence Development',
              description: 'Provide training and development for AI-related roles.'
            }
          ]
        },
        {
          id: 'ISO42001-7.2',
          title: 'Documentation',
          description: 'Maintain documented information required by the standard.',
          subControls: [
            {
              id: 'ISO42001-7.2.1',
              title: 'Documentation Control',
              description: 'Establish processes for managing AI-related documentation.'
            },
            {
              id: 'ISO42001-7.2.2',
              title: 'Knowledge Management',
              description: 'Implement systems for capturing and sharing AI knowledge.'
            }
          ]
        }
      ]
    },
    {
      name: 'Operation',
      controls: [
        {
          id: 'ISO42001-8.1',
          title: 'Operational Planning and Control',
          description: 'Plan, implement and control processes needed for AI systems.',
          subControls: [
            {
              id: 'ISO42001-8.1.1',
              title: 'Process Control',
              description: 'Establish controls for AI development and deployment processes.'
            },
            {
              id: 'ISO42001-8.1.2',
              title: 'Change Management',
              description: 'Manage changes to AI systems and processes.'
            }
          ]
        },
        {
          id: 'ISO42001-8.2',
          title: 'AI System Lifecycle',
          description: 'Manage AI system lifecycle including development, testing, and deployment.',
          subControls: [
            {
              id: 'ISO42001-8.2.1',
              title: 'Development Standards',
              description: 'Implement standards for AI system development.'
            },
            {
              id: 'ISO42001-8.2.2',
              title: 'Testing and Validation',
              description: 'Establish procedures for testing and validating AI systems.'
            }
          ]
        }
      ]
    },
    {
      name: 'Performance Evaluation',
      controls: [
        {
          id: 'ISO42001-9.1',
          title: 'Monitoring, Measurement, Analysis and Evaluation',
          description: 'Evaluate the performance and effectiveness of AI systems.',
          subControls: [
            {
              id: 'ISO42001-9.1.1',
              title: 'Performance Monitoring',
              description: 'Monitor and measure AI system performance.'
            },
            {
              id: 'ISO42001-9.1.2',
              title: 'Analysis Methods',
              description: 'Define methods for analyzing AI performance data.'
            }
          ]
        },
        {
          id: 'ISO42001-9.2',
          title: 'Internal Audit',
          description: 'Conduct internal audits of the AI management system.',
          subControls: [
            {
              id: 'ISO42001-9.2.1',
              title: 'Audit Planning',
              description: 'Plan and prepare for AI system audits.'
            },
            {
              id: 'ISO42001-9.2.2',
              title: 'Audit Execution',
              description: 'Conduct and document AI system audits.'
            }
          ]
        }
      ]
    },
    {
      name: 'Improvement',
      controls: [
        {
          id: 'ISO42001-10.1',
          title: 'Continual Improvement',
          description: 'Continuously improve the suitability, adequacy and effectiveness of the AI management system.',
          subControls: [
            {
              id: 'ISO42001-10.1.1',
              title: 'Improvement Planning',
              description: 'Plan and implement improvements to AI systems.'
            },
            {
              id: 'ISO42001-10.1.2',
              title: 'Innovation Management',
              description: 'Manage and incorporate AI innovations and improvements.'
            }
          ]
        },
        {
          id: 'ISO42001-10.2',
          title: 'Nonconformity and Corrective Action',
          description: 'Handle nonconformities and take corrective actions.',
          subControls: [
            {
              id: 'ISO42001-10.2.1',
              title: 'Issue Resolution',
              description: 'Address and resolve AI system issues and nonconformities.'
            },
            {
              id: 'ISO42001-10.2.2',
              title: 'Preventive Measures',
              description: 'Implement measures to prevent AI system issues.'
            }
          ]
        }
      ]
    }
  ]
}
