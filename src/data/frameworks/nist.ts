import { FrameworkData } from '../../types/framework-data.types'

export const nist: FrameworkData = {
  name: 'NIST Cybersecurity Framework',
  version: '1.1',
  description: 'Framework for improving critical infrastructure cybersecurity',
  controls: [
    {
      id: 'ID',
      title: 'Identify',
      controls: [
        {
          id: 'ID.AM',
          title: 'Asset Management',
          description: 'The data, personnel, devices, systems, and facilities that enable the organization to achieve business purposes are identified and managed consistent with their relative importance to organizational objectives and the organization\'s risk strategy.',
          subControls: [
            {
              id: 'ID.AM-1',
              title: 'Physical devices and systems inventory',
              description: 'Physical devices and systems within the organization are inventoried'
            },
            {
              id: 'ID.AM-2',
              title: 'Software platforms and applications inventory',
              description: 'Software platforms and applications within the organization are inventoried'
            }
          ]
        }
      ]
    },
    {
      id: 'PR',
      title: 'Protect',
      controls: [
        {
          id: 'PR.AC',
          title: 'Access Control',
          description: 'Access to physical and logical assets and associated facilities is limited to authorized users, processes, and devices, and is managed consistent with the assessed risk of unauthorized access.',
          subControls: [
            {
              id: 'PR.AC-1',
              title: 'Identities and credentials',
              description: 'Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users and processes'
            }
          ]
        }
      ]
    }
  ]
}
