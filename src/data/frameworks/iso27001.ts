import { FrameworkData } from '../../types/framework-data.types'

export const iso27001: FrameworkData = {
  name: 'ISO 27001:2022',
  version: '2022',
  description: 'Information Security Management System (ISMS) standard',
  controls: [
    {
      id: 'A.5',
      title: 'Organizational Controls',
      controls: [
        {
          id: 'A.5.1',
          title: 'Information Security Policies',
          description: 'Management direction for information security',
          subControls: [
            {
              id: 'A.5.1.1',
              title: 'Policies for information security',
              description: 'A set of information security policies should be defined, approved by management, published and communicated to employees and relevant external parties.'
            },
            {
              id: 'A.5.1.2',
              title: 'Review of the policies for information security',
              description: 'The information security policies should be reviewed at planned intervals or if significant changes occur to ensure their continuing suitability, adequacy and effectiveness.'
            }
          ]
        },
        {
          id: 'A.5.2',
          title: 'Information security roles and responsibilities',
          description: 'Information security roles and responsibilities should be defined and allocated.',
          subControls: [
            {
              id: 'A.5.2.1',
              title: 'Management commitment',
              description: 'Management should actively support security within the organization through clear direction, demonstrated commitment, explicit assignment, and acknowledgment of information security responsibilities.'
            },
            {
              id: 'A.5.2.2',
              title: 'Segregation of duties',
              description: 'Conflicting duties and areas of responsibility should be segregated to reduce opportunities for unauthorized or unintentional modification or misuse of assets.'
            }
          ]
        }
      ]
    },
    {
      id: 'A.6',
      title: 'People Controls',
      controls: [
        {
          id: 'A.6.1',
          title: 'Screening',
          description: 'Background verification checks on all candidates for employment',
          subControls: [
            {
              id: 'A.6.1.1',
              title: 'Screening',
              description: 'Background verification checks on all candidates for employment should be carried out in accordance with relevant laws, regulations and ethics.'
            }
          ]
        }
      ]
    }
  ]
}
