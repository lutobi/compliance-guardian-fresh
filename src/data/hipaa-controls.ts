import { FrameworkData } from '../types/framework-data.types'

export const hipaaFramework: FrameworkData = {
  name: 'HIPAA',
  version: '2013',
  description: 'Health Insurance Portability and Accountability Act - Standards for privacy and security of health information',
  controls: [
    {
      name: 'HIPAA Rules',
      controls: [
        {
          id: '164.300',
          title: 'Security Rule',
          description: 'Administrative, physical, and technical safeguards for electronic protected health information',
          subControls: [
            {
              id: '164.308',
              title: 'Administrative Safeguards',
              description: 'Administrative actions and policies to manage the selection, development, implementation, and maintenance of security measures',
              subControls: [
                {
                  id: '164.308(a)(1)',
                  title: 'Security Management Process',
                  description: 'Implement policies and procedures to prevent, detect, contain, and correct security violations'
                },
                {
                  id: '164.308(a)(2)',
                  title: 'Assigned Security Responsibility',
                  description: 'Identify the security official responsible for policies and procedures'
                },
                {
                  id: '164.308(a)(3)',
                  title: 'Workforce Security',
                  description: 'Implement policies and procedures for workforce authorization and supervision'
                },
                {
                  id: '164.308(a)(4)',
                  title: 'Information Access Management',
                  description: 'Implement policies and procedures for authorizing access to electronic protected health information'
                },
                {
                  id: '164.308(a)(5)',
                  title: 'Security Awareness and Training',
                  description: 'Implement security awareness and training program for all workforce members'
                },
                {
                  id: '164.308(a)(6)',
                  title: 'Security Incident Procedures',
                  description: 'Implement policies and procedures to address security incidents'
                },
                {
                  id: '164.308(a)(7)',
                  title: 'Contingency Plan',
                  description: 'Establish policies and procedures for responding to emergencies'
                },
                {
                  id: '164.308(a)(8)',
                  title: 'Evaluation',
                  description: 'Perform periodic technical and nontechnical evaluation'
                }
              ]
            },
            {
              id: '164.310',
              title: 'Physical Safeguards',
              description: 'Physical measures, policies, and procedures to protect electronic information systems',
              subControls: [
                {
                  id: '164.310(a)',
                  title: 'Facility Access Controls',
                  description: 'Implement policies and procedures to limit physical access to electronic information systems'
                },
                {
                  id: '164.310(b)',
                  title: 'Workstation Use',
                  description: 'Implement policies and procedures that specify proper workstation use'
                },
                {
                  id: '164.310(c)',
                  title: 'Workstation Security',
                  description: 'Implement physical safeguards for workstations with access to electronic protected health information'
                },
                {
                  id: '164.310(d)',
                  title: 'Device and Media Controls',
                  description: 'Implement policies and procedures for receipt and removal of hardware and electronic media'
                }
              ]
            },
            {
              id: '164.312',
              title: 'Technical Safeguards',
              description: 'Technology and related policies and procedures to protect electronic protected health information',
              subControls: [
                {
                  id: '164.312(a)',
                  title: 'Access Control',
                  description: 'Implement technical policies and procedures for electronic information systems'
                },
                {
                  id: '164.312(b)',
                  title: 'Audit Controls',
                  description: 'Implement hardware, software, and procedural mechanisms for recording and examining activity'
                },
                {
                  id: '164.312(c)',
                  title: 'Integrity',
                  description: 'Implement policies and procedures to protect electronic protected health information from improper alteration or destruction'
                },
                {
                  id: '164.312(d)',
                  title: 'Person or Entity Authentication',
                  description: 'Implement procedures to verify that a person or entity seeking access is the one claimed'
                },
                {
                  id: '164.312(e)',
                  title: 'Transmission Security',
                  description: 'Implement technical security measures to guard against unauthorized access during transmission'
                }
              ]
            }
          ]
        },
        {
          id: '164.500',
          title: 'Privacy Rule',
          description: 'Standards for privacy of individually identifiable health information',
          subControls: [
            {
              id: '164.502',
              title: 'Uses and Disclosures',
              description: 'General rules for uses and disclosures of protected health information',
              subControls: [
                {
                  id: '164.502(a)',
                  title: 'Permitted Uses and Disclosures',
                  description: 'Circumstances where protected health information may be used or disclosed'
                },
                {
                  id: '164.502(b)',
                  title: 'Minimum Necessary',
                  description: 'Limit uses and disclosures to the minimum necessary'
                },
                {
                  id: '164.502(c)',
                  title: 'Uses and Disclosures of De-identified Information',
                  description: 'Requirements for using and disclosing de-identified information'
                }
              ]
            },
            {
              id: '164.520',
              title: 'Notice of Privacy Practices',
              description: 'Requirements for notice of privacy practices for protected health information',
              subControls: [
                {
                  id: '164.520(a)',
                  title: 'Notice Requirements',
                  description: 'Content requirements for privacy practices notice'
                },
                {
                  id: '164.520(b)',
                  title: 'Implementation Requirements',
                  description: 'Requirements for implementing privacy practices notice'
                }
              ]
            },
            {
              id: '164.524',
              title: 'Access of Individuals',
              description: 'Individual\'s right to access protected health information',
              subControls: [
                {
                  id: '164.524(a)',
                  title: 'Right of Access',
                  description: 'Individual\'s right to inspect and obtain a copy of protected health information'
                },
                {
                  id: '164.524(b)',
                  title: 'Timely Action',
                  description: 'Requirements for timely action on access requests'
                }
              ]
            }
          ]
        },
        {
          id: '164.400',
          title: 'Breach Notification Rule',
          description: 'Requirements for notification in case of breach of unsecured protected health information',
          subControls: [
            {
              id: '164.402',
              title: 'Definitions',
              description: 'Definitions of breach and unsecured protected health information',
              subControls: [
                {
                  id: '164.402(1)',
                  title: 'Breach Definition',
                  description: 'Definition and exceptions to breach of protected health information'
                },
                {
                  id: '164.402(2)',
                  title: 'Unsecured PHI',
                  description: 'Definition of unsecured protected health information'
                }
              ]
            },
            {
              id: '164.404',
              title: 'Notification to Individuals',
              description: 'Requirements for notification to individuals',
              subControls: [
                {
                  id: '164.404(a)',
                  title: 'Individual Notice',
                  description: 'Requirements for notifying individuals of a breach'
                },
                {
                  id: '164.404(b)',
                  title: 'Timeliness',
                  description: 'Time period for breach notification'
                },
                {
                  id: '164.404(c)',
                  title: 'Content of Notification',
                  description: 'Required content of breach notifications'
                }
              ]
            },
            {
              id: '164.406',
              title: 'Notification to Media',
              description: 'Requirements for notification to media',
              subControls: [
                {
                  id: '164.406(a)',
                  title: 'Media Notice',
                  description: 'Requirements for notifying media of breaches affecting more than 500 residents'
                },
                {
                  id: '164.406(b)',
                  title: 'Timing',
                  description: 'Timing requirements for media notification'
                }
              ]
            },
            {
              id: '164.408',
              title: 'Notification to Secretary',
              description: 'Requirements for notification to Secretary of HHS',
              subControls: [
                {
                  id: '164.408(a)',
                  title: 'Secretary Notice - 500 or More',
                  description: 'Requirements for breaches affecting 500 or more individuals'
                },
                {
                  id: '164.408(b)',
                  title: 'Secretary Notice - Less than 500',
                  description: 'Requirements for breaches affecting less than 500 individuals'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
