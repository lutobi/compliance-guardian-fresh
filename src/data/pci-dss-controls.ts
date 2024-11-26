import { FrameworkData } from '../types/framework-data.types'

export const pciDssFramework: FrameworkData = {
  name: 'PCI DSS',
  version: '4.0',
  description: 'Payment Card Industry Data Security Standard - Requirements and security assessment procedures',
  controls: [
    {
      name: 'PCI DSS Requirements',
      controls: [
        {
          id: '1',
          title: 'Build and Maintain a Secure Network and Systems',
          description: 'Requirements for secure network architecture',
          subControls: [
            {
              id: '1.1',
              title: 'Install and maintain network security controls',
              description: 'Network security controls to manage and monitor traffic'
            },
            {
              id: '1.2',
              title: 'Restrict connections between untrusted networks and system components',
              description: 'Configure security controls to restrict connections'
            },
            {
              id: '1.3',
              title: 'Prohibit direct public access to cardholder data environment',
              description: 'Implement security controls to prevent direct access'
            },
            {
              id: '1.4',
              title: 'Protect against security threats',
              description: 'Use security controls, processes, and procedures to protect against threats'
            },
            {
              id: '1.5',
              title: 'Manage service providers',
              description: 'Manage and monitor service provider compliance'
            }
          ]
        },
        {
          id: '2',
          title: 'Apply Strong Access Control Measures',
          description: 'Requirements for access control and authentication',
          subControls: [
            {
              id: '2.1',
              title: 'Change vendor-supplied defaults',
              description: 'Change default passwords and security parameters'
            },
            {
              id: '2.2',
              title: 'Configure security features for system components',
              description: 'Develop configuration standards for all system components'
            },
            {
              id: '2.3',
              title: 'Use strong cryptography and security protocols',
              description: 'Encrypt transmission of cardholder data'
            },
            {
              id: '2.4',
              title: 'Maintain an inventory of system components',
              description: 'Maintain a current inventory of system components'
            }
          ]
        },
        {
          id: '3',
          title: 'Protect Stored Cardholder Data',
          description: 'Requirements for data protection and storage',
          subControls: [
            {
              id: '3.1',
              title: 'Keep cardholder data storage to a minimum',
              description: 'Implement data retention and disposal policies'
            },
            {
              id: '3.2',
              title: 'Do not store sensitive authentication data',
              description: 'Protect sensitive authentication data'
            },
            {
              id: '3.3',
              title: 'Mask PAN when displayed',
              description: 'Mask display of card numbers'
            },
            {
              id: '3.4',
              title: 'Render PAN unreadable anywhere it is stored',
              description: 'Use strong cryptography to protect stored data'
            }
          ]
        },
        {
          id: '4',
          title: 'Implement Strong Access Control Measures',
          description: 'Requirements for access restrictions',
          subControls: [
            {
              id: '4.1',
              title: 'Restrict access to cardholder data',
              description: 'Limit access based on business need to know'
            },
            {
              id: '4.2',
              title: 'Identify and authenticate access',
              description: 'Unique ID for each person with computer access'
            },
            {
              id: '4.3',
              title: 'Restrict physical access',
              description: 'Restrict physical access to cardholder data'
            }
          ]
        },
        {
          id: '5',
          title: 'Regularly Monitor and Test Networks',
          description: 'Requirements for monitoring and testing',
          subControls: [
            {
              id: '5.1',
              title: 'Track and monitor all access',
              description: 'Log and monitor all access to network resources'
            },
            {
              id: '5.2',
              title: 'Regularly test security systems',
              description: 'Test security systems and processes regularly'
            },
            {
              id: '5.3',
              title: 'Maintain a policy addressing information security',
              description: 'Maintain an information security policy'
            }
          ]
        },
        {
          id: '6',
          title: 'Maintain an Information Security Policy',
          description: 'Requirements for policies and procedures',
          subControls: [
            {
              id: '6.1',
              title: 'Establish security policies',
              description: 'Maintain security policies for all personnel'
            },
            {
              id: '6.2',
              title: 'Implement risk assessment process',
              description: 'Identify threats and vulnerabilities'
            },
            {
              id: '6.3',
              title: 'Develop software securely',
              description: 'Develop applications based on secure guidelines'
            },
            {
              id: '6.4',
              title: 'Follow change control procedures',
              description: 'Follow change control processes'
            },
            {
              id: '6.5',
              title: 'Address common coding vulnerabilities',
              description: 'Train developers in secure coding'
            }
          ]
        }
      ]
    }
  ]
}
