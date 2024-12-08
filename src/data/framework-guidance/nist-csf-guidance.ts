const nist_csf_guidance = {
  frameworkId: "NIST CSF",
  controls: {
    "ID.AM": {
      description: "Asset Management",
      requirements: [
        "Identify physical devices and systems",
        "Identify software platforms and applications",
        "Map organizational communication flows",
        "Catalog external information systems",
        "Prioritize resources based on classification"
      ],
      implementation: [
        {
          phase: "Discovery",
          steps: [
            "Deploy asset discovery tools",
            "Conduct system inventory",
            "Document network topology",
            "Map data flows",
            "Identify dependencies"
          ]
        },
        {
          phase: "Documentation",
          steps: [
            "Create asset inventory",
            "Document configurations",
            "Map relationships",
            "Establish baselines",
            "Define classifications"
          ]
        },
        {
          phase: "Management",
          steps: [
            "Implement tracking system",
            "Define update procedures",
            "Establish monitoring",
            "Create maintenance schedule",
            "Review and update"
          ]
        }
      ],
      evidence: [
        {
          title: "Asset Documentation",
          description: "Evidence of asset management practices",
          examples: [
            "Asset inventory",
            "Network diagrams",
            "System configurations",
            "Data flow maps",
            "Classification records"
          ]
        },
        {
          title: "Management Records",
          description: "Evidence of ongoing management",
          examples: [
            "Update logs",
            "Review records",
            "Change documentation",
            "Monitoring reports",
            "Maintenance records"
          ]
        }
      ],
      validation: {
        methods: [
          "Inventory verification",
          "Configuration review",
          "Documentation audit",
          "Process assessment",
          "Control testing"
        ],
        frequency: "Quarterly",
        responsibility: "Asset Manager"
      },
      metrics: [
        {
          name: "Asset Coverage",
          target: "100% of assets",
          formula: "(Documented assets / Total assets) × 100"
        },
        {
          name: "Inventory Accuracy",
          target: "98% accuracy",
          formula: "(Verified assets / Total documented assets) × 100"
        }
      ],
      references: [
        {
          title: "NIST CSF Documentation",
          description: "Official NIST Cybersecurity Framework documentation",
          url: "https://www.nist.gov/cyberframework"
        }
      ]
    },
    "ID.BE": {
      description: "Business Environment",
      requirements: [
        "Document organization's role in supply chain",
        "Identify critical infrastructure position",
        "Prioritize business objectives",
        "Establish dependencies",
        "Determine resilience requirements"
      ],
      implementation: [
        {
          phase: "Analysis",
          steps: [
            "Conduct business impact analysis",
            "Map supply chain",
            "Identify stakeholders",
            "Document dependencies",
            "Define priorities"
          ]
        },
        {
          phase: "Documentation",
          steps: [
            "Create role documentation",
            "Map relationships",
            "Document requirements",
            "Establish metrics",
            "Define objectives"
          ]
        }
      ],
      evidence: [
        {
          title: "Business Documentation",
          description: "Evidence of business environment understanding",
          examples: [
            "Impact analysis",
            "Supply chain map",
            "Stakeholder registry",
            "Dependency matrix",
            "Priority documentation"
          ]
        }
      ],
      validation: {
        methods: [
          "Documentation review",
          "Stakeholder validation",
          "Process assessment",
          "Requirement verification"
        ],
        frequency: "Annual",
        responsibility: "Business Continuity Manager"
      }
    }
  }
};

export default nist_csf_guidance;
