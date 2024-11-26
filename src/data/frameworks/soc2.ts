import { FrameworkData } from '../../types/framework-data.types'

export const soc2: FrameworkData = {
  name: 'SOC 2',
  version: '2017',
  description: 'Service Organization Control 2 - Trust Services Criteria',
  controls: [
    {
      id: 'CC1',
      title: 'Control Environment',
      controls: [
        {
          id: 'CC1.1',
          title: 'COSO Principle 1',
          description: 'The entity demonstrates a commitment to integrity and ethical values.',
          subControls: [
            {
              id: 'CC1.1.1',
              title: 'Commitment to integrity',
              description: 'The entity has defined and communicated standards of conduct to its board members, management, and employees.'
            },
            {
              id: 'CC1.1.2',
              title: 'Adherence evaluation',
              description: 'The entity evaluates adherence to standards of conduct and addresses deviations in a timely manner.'
            }
          ]
        }
      ]
    },
    {
      id: 'CC2',
      title: 'Communication and Information',
      controls: [
        {
          id: 'CC2.1',
          title: 'Information Requirements',
          description: 'The entity obtains or generates and uses relevant, quality information to support the functioning of internal control.',
          subControls: [
            {
              id: 'CC2.1.1',
              title: 'Information identification',
              description: 'The entity has identified information requirements to support the functioning of internal control.'
            }
          ]
        }
      ]
    }
  ]
}
