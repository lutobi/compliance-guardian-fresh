import { FrameworkData } from '../../types/framework-data.types'

export const gdpr: FrameworkData = {
  name: 'GDPR',
  version: '2018',
  description: 'General Data Protection Regulation',
  controls: [
    {
      id: 'A5',
      title: 'Principles relating to processing of personal data',
      controls: [
        {
          id: 'A5.1',
          title: 'Lawfulness, fairness and transparency',
          description: 'Personal data shall be processed lawfully, fairly and in a transparent manner in relation to the data subject.',
          subControls: [
            {
              id: 'A5.1.1',
              title: 'Lawful basis',
              description: 'Processing shall be lawful only if and to the extent that at least one legal basis applies.'
            },
            {
              id: 'A5.1.2',
              title: 'Transparency',
              description: 'Information provided to data subjects shall be concise, transparent, intelligible and easily accessible.'
            }
          ]
        },
        {
          id: 'A5.2',
          title: 'Purpose limitation',
          description: 'Personal data shall be collected for specified, explicit and legitimate purposes.',
          subControls: [
            {
              id: 'A5.2.1',
              title: 'Purpose specification',
              description: 'Clearly document and inform individuals about your purposes for processing their personal data.'
            }
          ]
        }
      ]
    },
    {
      id: 'A6',
      title: 'Lawfulness of processing',
      controls: [
        {
          id: 'A6.1',
          title: 'Conditions for lawful processing',
          description: 'Processing shall be lawful only if and to the extent that at least one condition applies.',
          subControls: [
            {
              id: 'A6.1.1',
              title: 'Consent',
              description: 'The data subject has given consent to the processing of his or her personal data for one or more specific purposes.'
            }
          ]
        }
      ]
    },
    {
      id: 'A7',
      title: 'Security of processing',
      controls: [
        {
          id: 'A7.1',
          title: 'Security measures',
          description: 'Implement appropriate technical and organisational measures to ensure a level of security appropriate to the risk.',
          subControls: [
            {
              id: 'A7.1.1',
              title: 'Risk assessment',
              description: 'Assess the risks to personal data and implement measures to address them.'
            },
            {
              id: 'A7.1.2',
              title: 'Data protection by design',
              description: 'Implement technical and organisational measures to integrate data protection into processing activities.'
            }
          ]
        }
      ]
    }
  ]
}
