import { FrameworkData } from '../../types/framework-data.types'

export const hipaa: FrameworkData = {
  name: 'HIPAA',
  version: '2013',
  description: 'Health Insurance Portability and Accountability Act',
  controls: [
    {
      id: '164.308',
      title: 'Administrative Safeguards',
      controls: [
        {
          id: '164.308(a)(1)',
          title: 'Security Management Process',
          description: 'Implement policies and procedures to prevent, detect, contain, and correct security violations.',
          subControls: [
            {
              id: '164.308(a)(1)(i)',
              title: 'Risk Analysis',
              description: 'Conduct an accurate and thorough assessment of the potential risks and vulnerabilities to the confidentiality, integrity, and availability of electronic protected health information.'
            },
            {
              id: '164.308(a)(1)(ii)',
              title: 'Risk Management',
              description: 'Implement security measures sufficient to reduce risks and vulnerabilities to a reasonable and appropriate level.'
            }
          ]
        },
        {
          id: '164.308(a)(2)',
          title: 'Assigned Security Responsibility',
          description: 'Identify the security official who is responsible for the development and implementation of the policies and procedures.',
          subControls: [
            {
              id: '164.308(a)(2)(i)',
              title: 'Security Officer',
              description: 'Assign responsibility for security to a specific individual or organization.'
            }
          ]
        }
      ]
    },
    {
      id: '164.310',
      title: 'Physical Safeguards',
      controls: [
        {
          id: '164.310(a)(1)',
          title: 'Facility Access Controls',
          description: 'Implement policies and procedures to limit physical access to electronic information systems and the facilities in which they are housed.',
          subControls: [
            {
              id: '164.310(a)(1)(i)',
              title: 'Contingency Operations',
              description: 'Establish procedures that allow facility access in support of restoration of lost data in the event of an emergency.'
            },
            {
              id: '164.310(a)(1)(ii)',
              title: 'Facility Security Plan',
              description: 'Implement policies and procedures to safeguard the facility and the equipment therein from unauthorized physical access, tampering, and theft.'
            }
          ]
        }
      ]
    },
    {
      id: '164.312',
      title: 'Technical Safeguards',
      controls: [
        {
          id: '164.312(a)(1)',
          title: 'Access Control',
          description: 'Implement technical policies and procedures for electronic information systems that maintain electronic protected health information.',
          subControls: [
            {
              id: '164.312(a)(1)(i)',
              title: 'Unique User Identification',
              description: 'Assign a unique name and/or number for identifying and tracking user identity.'
            },
            {
              id: '164.312(a)(1)(ii)',
              title: 'Emergency Access Procedure',
              description: 'Establish procedures for obtaining necessary electronic protected health information during an emergency.'
            }
          ]
        }
      ]
    }
  ]
}
