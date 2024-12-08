const pci_dss_guidance = {
  frameworkId: "PCI DSS",
  controls: {
    "1.1": {
      description: "Install and maintain network security controls",
      requirements: [
        "Define and document network security controls",
        "Implement firewall configurations",
        "Review security control rules",
        "Validate network segmentation",
        "Document business justification"
      ],
      implementation: [
        {
          phase: "Planning",
          steps: [
            "Document network topology",
            "Define security requirements",
            "Design control architecture",
            "Create configuration standards",
            "Establish review process"
          ]
        },
        {
          phase: "Implementation",
          steps: [
            "Deploy security controls",
            "Configure firewalls",
            "Implement monitoring",
            "Test configurations",
            "Document changes"
          ]
        },
        {
          phase: "Maintenance",
          steps: [
            "Regular reviews",
            "Update configurations",
            "Monitor effectiveness",
            "Document changes",
            "Validate compliance"
          ]
        }
      ],
      evidence: [
        {
          title: "Network Documentation",
          description: "Evidence of network security controls",
          examples: [
            "Network diagrams",
            "Firewall configurations",
            "Security policies",
            "Change records",
            "Review logs"
          ]
        },
        {
          title: "Testing Documentation",
          description: "Evidence of security testing",
          examples: [
            "Test results",
            "Validation reports",
            "Audit logs",
            "Review documentation",
            "Compliance reports"
          ]
        }
      ],
      validation: {
        methods: [
          "Configuration review",
          "Security testing",
          "Log analysis",
          "Compliance audit",
          "Penetration testing"
        ],
        frequency: "Quarterly",
        responsibility: "Network Security Manager"
      },
      metrics: [
        {
          name: "Rule Review Coverage",
          target: "100% of rules reviewed",
          formula: "(Reviewed rules / Total rules) × 100"
        },
        {
          name: "Configuration Compliance",
          target: "100% compliance",
          formula: "(Compliant configs / Total configs) × 100"
        }
      ],
      references: [
        {
          title: "PCI DSS Documentation",
          description: "Official PCI DSS requirements and testing procedures",
          url: "https://www.pcisecuritystandards.org/"
        }
      ]
    },
    "1.2": {
      description: "Restrict connections between untrusted networks and system components",
      requirements: [
        "Identify trusted/untrusted networks",
        "Define connection restrictions",
        "Implement access controls",
        "Monitor network traffic",
        "Document security measures"
      ],
      implementation: [
        {
          phase: "Analysis",
          steps: [
            "Map network connections",
            "Identify trust boundaries",
            "Define security rules",
            "Document requirements",
            "Plan implementation"
          ]
        },
        {
          phase: "Configuration",
          steps: [
            "Configure firewalls",
            "Set up monitoring",
            "Implement controls",
            "Test restrictions",
            "Document settings"
          ]
        }
      ],
      evidence: [
        {
          title: "Security Documentation",
          description: "Evidence of network restrictions",
          examples: [
            "Network policies",
            "Configuration files",
            "Access control lists",
            "Monitoring logs",
            "Security reports"
          ]
        }
      ],
      validation: {
        methods: [
          "Security testing",
          "Traffic analysis",
          "Configuration review",
          "Compliance check"
        ],
        frequency: "Monthly",
        responsibility: "Network Security Engineer"
      }
    }
  }
};

export default pci_dss_guidance;
