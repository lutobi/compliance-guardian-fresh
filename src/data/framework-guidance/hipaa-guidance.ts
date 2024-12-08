const hipaa_guidance = {
  frameworkId: "HIPAA",
  controls: {
    "164.308(a)(1)": {
      description: "Security Management Process",
      requirements: [
        "Implement policies and procedures",
        "Conduct risk assessment",
        "Implement security measures",
        "Apply sanctions",
        "Review system activity"
      ],
      implementation: [
        {
          phase: "Risk Analysis",
          steps: [
            "Identify assets and systems",
            "Document threats and vulnerabilities",
            "Assess current security measures",
            "Determine likelihood of threats",
            "Calculate potential impact"
          ]
        },
        {
          phase: "Risk Management",
          steps: [
            "Prioritize risks",
            "Select security measures",
            "Document decisions",
            "Implement controls",
            "Monitor effectiveness"
          ]
        },
        {
          phase: "Sanction Policy",
          steps: [
            "Define violations",
            "Establish sanctions",
            "Document procedures",
            "Communicate policy",
            "Track violations"
          ]
        }
      ],
      evidence: [
        {
          title: "Risk Assessment",
          description: "Documentation of risk analysis and management",
          examples: [
            "Risk analysis report",
            "Security assessment",
            "Gap analysis",
            "Remediation plans",
            "Implementation records"
          ]
        },
        {
          title: "Policy Documentation",
          description: "Security management policies and procedures",
          examples: [
            "Security policies",
            "Sanction policy",
            "Incident response plan",
            "Audit procedures",
            "Review logs"
          ]
        }
      ],
      validation: {
        methods: [
          "Documentation review",
          "Process assessment",
          "Control testing",
          "Log analysis",
          "Staff interviews"
        ],
        frequency: "Annual",
        responsibility: "Security Officer"
      },
      metrics: [
        {
          name: "Risk Assessment Coverage",
          target: "100% of systems",
          formula: "(Systems assessed / Total systems) × 100"
        },
        {
          name: "Control Implementation",
          target: "95% of identified controls",
          formula: "(Implemented controls / Required controls) × 100"
        }
      ],
      references: [
        {
          title: "HHS Security Rule Guidance",
          description: "Official HHS Security Rule guidance material",
          url: "https://www.hhs.gov/hipaa/for-professionals/security/guidance/index.html"
        }
      ]
    },
    "164.308(a)(2)": {
      description: "Assigned Security Responsibility",
      requirements: [
        "Identify security official",
        "Document responsibilities",
        "Ensure authority",
        "Provide resources",
        "Monitor performance"
      ],
      implementation: [
        {
          phase: "Planning",
          steps: [
            "Define role requirements",
            "Select qualified individual",
            "Document appointment",
            "Establish reporting lines",
            "Allocate resources"
          ]
        },
        {
          phase: "Implementation",
          steps: [
            "Communicate appointment",
            "Transfer responsibilities",
            "Establish processes",
            "Define metrics",
            "Start monitoring"
          ]
        }
      ],
      evidence: [
        {
          title: "Appointment Documentation",
          description: "Evidence of security official appointment",
          examples: [
            "Appointment letter",
            "Job description",
            "Authority documentation",
            "Resource allocation",
            "Performance metrics"
          ]
        }
      ],
      validation: {
        methods: [
          "Document review",
          "Role assessment",
          "Authority verification",
          "Resource review"
        ],
        frequency: "Annual",
        responsibility: "Executive Management"
      }
    }
  }
};

export default hipaa_guidance;
