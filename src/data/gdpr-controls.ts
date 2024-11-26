import { FrameworkData } from '../types/framework-data.types'

export const gdprFramework: FrameworkData = {
  name: 'GDPR',
  version: '2018',
  description: 'General Data Protection Regulation - EU data protection and privacy regulations',
  controls: [
    {
      name: 'GDPR Articles',
      controls: [
        {
          id: 'Art5',
          title: 'Principles relating to processing of personal data',
          description: 'Core principles for processing personal data',
          subControls: [
            {
              id: 'Art5.1.a',
              title: 'Lawfulness, fairness and transparency',
              description: 'Personal data shall be processed lawfully, fairly and transparently'
            },
            {
              id: 'Art5.1.b',
              title: 'Purpose limitation',
              description: 'Personal data must be collected for specified, explicit and legitimate purposes'
            },
            {
              id: 'Art5.1.c',
              title: 'Data minimisation',
              description: 'Personal data must be adequate, relevant and limited to what is necessary'
            },
            {
              id: 'Art5.1.d',
              title: 'Accuracy',
              description: 'Personal data must be accurate and kept up to date'
            },
            {
              id: 'Art5.1.e',
              title: 'Storage limitation',
              description: 'Personal data must be kept for no longer than necessary'
            },
            {
              id: 'Art5.1.f',
              title: 'Integrity and confidentiality',
              description: 'Personal data must be processed securely'
            }
          ]
        },
        {
          id: 'Art6',
          title: 'Lawfulness of processing',
          description: 'Legal bases for processing personal data',
          subControls: [
            {
              id: 'Art6.1.a',
              title: 'Consent',
              description: 'Processing based on data subject consent'
            },
            {
              id: 'Art6.1.b',
              title: 'Contract',
              description: 'Processing necessary for contract performance'
            },
            {
              id: 'Art6.1.c',
              title: 'Legal obligation',
              description: 'Processing necessary for compliance with legal obligation'
            },
            {
              id: 'Art6.1.d',
              title: 'Vital interests',
              description: 'Processing necessary to protect vital interests'
            },
            {
              id: 'Art6.1.e',
              title: 'Public interest',
              description: 'Processing necessary for public interest or official authority'
            },
            {
              id: 'Art6.1.f',
              title: 'Legitimate interests',
              description: 'Processing necessary for legitimate interests'
            }
          ]
        },
        {
          id: 'Art7',
          title: 'Conditions for consent',
          description: 'Requirements for valid consent',
          subControls: [
            {
              id: 'Art7.1',
              title: 'Demonstrable consent',
              description: 'Controller must demonstrate data subject has consented'
            },
            {
              id: 'Art7.2',
              title: 'Clear consent request',
              description: 'Consent request must be clear and distinguishable'
            },
            {
              id: 'Art7.3',
              title: 'Right to withdraw',
              description: 'Right to withdraw consent at any time'
            }
          ]
        },
        {
          id: 'Art15',
          title: 'Right of access',
          description: 'Data subject right to access personal data',
          subControls: [
            {
              id: 'Art15.1',
              title: 'Confirmation and access',
              description: 'Right to obtain confirmation and access to personal data'
            },
            {
              id: 'Art15.2',
              title: 'Information provision',
              description: 'Right to information about processing'
            },
            {
              id: 'Art15.3',
              title: 'Copy provision',
              description: 'Right to obtain copy of personal data'
            }
          ]
        },
        {
          id: 'Art17',
          title: 'Right to erasure',
          description: 'Right to be forgotten',
          subControls: [
            {
              id: 'Art17.1',
              title: 'Erasure obligation',
              description: 'Obligation to erase personal data without delay'
            },
            {
              id: 'Art17.2',
              title: 'Inform third parties',
              description: 'Inform third parties about erasure request'
            }
          ]
        },
        {
          id: 'Art25',
          title: 'Data protection by design and by default',
          description: 'Privacy by design and default requirements',
          subControls: [
            {
              id: 'Art25.1',
              title: 'Protection by design',
              description: 'Implement appropriate technical and organizational measures'
            },
            {
              id: 'Art25.2',
              title: 'Protection by default',
              description: 'Ensure only necessary personal data is processed'
            }
          ]
        },
        {
          id: 'Art32',
          title: 'Security of processing',
          description: 'Technical and organizational security measures',
          subControls: [
            {
              id: 'Art32.1.a',
              title: 'Pseudonymisation and encryption',
              description: 'Implementation of pseudonymisation and encryption'
            },
            {
              id: 'Art32.1.b',
              title: 'Confidentiality integrity',
              description: 'Ensure confidentiality, integrity, availability and resilience'
            },
            {
              id: 'Art32.1.c',
              title: 'Restore availability',
              description: 'Ability to restore availability and access'
            },
            {
              id: 'Art32.1.d',
              title: 'Testing and evaluation',
              description: 'Regular testing and evaluation of security measures'
            }
          ]
        },
        {
          id: 'Art33',
          title: 'Notification of personal data breach',
          description: 'Data breach notification requirements',
          subControls: [
            {
              id: 'Art33.1',
              title: 'Authority notification',
              description: 'Notify supervisory authority of breach'
            },
            {
              id: 'Art33.2',
              title: 'Processor notification',
              description: 'Processor must notify controller'
            },
            {
              id: 'Art33.3',
              title: 'Notification content',
              description: 'Content requirements for breach notification'
            },
            {
              id: 'Art33.4',
              title: 'Documentation',
              description: 'Document all breaches and remedial actions'
            }
          ]
        }
      ]
    }
  ]
}
