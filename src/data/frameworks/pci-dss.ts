import { FrameworkData } from '../../types/framework-data.types'

export const pciDss: FrameworkData = {
  name: 'PCI DSS',
  version: '4.0',
  description: 'Payment Card Industry Data Security Standard',
  controls: [
    {
      id: '1',
      title: 'Build and Maintain a Secure Network',
      controls: [
        {
          id: '1.1',
          title: 'Install and maintain network security controls',
          description: 'Network security controls (NSCs) are installed and maintained to protect systems and networks.',
          subControls: [
            {
              id: '1.1.1',
              title: 'Roles and responsibilities defined',
              description: 'Roles and responsibilities for performing activities in Requirement 1 are documented, assigned, and understood.'
            },
            {
              id: '1.1.2',
              title: 'Network security control standards',
              description: 'Network security control (NSC) configurations are reviewed to verify that they are relevant and effective.'
            }
          ]
        },
        {
          id: '1.2',
          title: 'Network Security Configurations',
          description: 'Network security controls are configured and maintained.',
          subControls: [
            {
              id: '1.2.1',
              title: 'Restrict Inbound and Outbound Traffic',
              description: 'Inbound and outbound traffic is restricted to that which is necessary for the cardholder data environment, and specifically denies all other traffic.'
            },
            {
              id: '1.2.2',
              title: 'Secure Configurations',
              description: 'Configuration standards for network security controls are consistent with industry-accepted standards.'
            }
          ]
        }
      ]
    },
    {
      id: '2',
      title: 'Apply Strong Access Control Measures',
      controls: [
        {
          id: '2.1',
          title: 'User Authentication Management',
          description: 'Access to system components is properly managed.',
          subControls: [
            {
              id: '2.1.1',
              title: 'Password Requirements',
              description: 'Strong cryptography is used to render all authentication credentials unreadable during transmission and storage.'
            },
            {
              id: '2.1.2',
              title: 'Primary Functions',
              description: 'System components are configured to support only one primary function.'
            }
          ]
        }
      ]
    },
    {
      id: '3',
      title: 'Protect Stored Account Data',
      controls: [
        {
          id: '3.1',
          title: 'Data Storage and Retention',
          description: 'Processes and mechanisms for protecting stored account data are defined and understood.',
          subControls: [
            {
              id: '3.1.1',
              title: 'Data Retention Policy',
              description: 'A data retention and disposal policy is implemented and includes defined requirements for data retention, including all cardholder data.'
            }
          ]
        },
        {
          id: '3.2',
          title: 'Storage of Sensitive Authentication Data',
          description: 'Sensitive authentication data is not stored after authorization.',
          subControls: [
            {
              id: '3.2.1',
              title: 'SAD After Authorization',
              description: 'Sensitive authentication data is not retained after authorization, even if encrypted.'
            }
          ]
        }
      ]
    }
  ]
}
