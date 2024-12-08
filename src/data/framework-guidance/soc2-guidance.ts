const soc2_guidance = {
  frameworkId: "SOC 2",
  controls: {
    "CC1.1": {
      description: "Demonstrates Commitment to Integrity and Ethical Values",
      requirements: [
        "Establish and communicate ethical values",
        "Define standards of conduct",
        "Evaluate adherence to standards",
        "Address deviations timely",
        "Lead by example"
      ],
      implementation: [
        {
          phase: "Planning",
          steps: [
            "Document ethical values",
            "Create code of conduct",
            "Establish reporting mechanisms",
            "Define evaluation process",
            "Plan communication strategy"
          ]
        },
        {
          phase: "Development",
          steps: [
            "Create training materials",
            "Develop evaluation tools",
            "Establish reporting channels",
            "Create remediation procedures",
            "Define monitoring processes"
          ]
        },
        {
          phase: "Implementation",
          steps: [
            "Conduct ethics training",
            "Implement reporting system",
            "Monitor compliance",
            "Address violations",
            "Review effectiveness"
          ]
        }
      ],
      evidence: [
        {
          title: "Ethics Documentation",
          description: "Evidence of ethical standards and compliance",
          examples: [
            "Code of conduct",
            "Ethics policies",
            "Training records",
            "Violation reports",
            "Resolution documentation"
          ]
        },
        {
          title: "Monitoring Records",
          description: "Evidence of ongoing monitoring and evaluation",
          examples: [
            "Compliance reports",
            "Ethics hotline logs",
            "Investigation records",
            "Remediation plans",
            "Review findings"
          ]
        }
      ],
      validation: {
        methods: [
          "Documentation review",
          "Employee interviews",
          "Process observation",
          "Compliance testing",
          "Incident analysis"
        ],
        frequency: "Quarterly",
        responsibility: "Ethics Officer"
      },
      metrics: [
        {
          name: "Ethics Training Completion",
          target: "100% of employees",
          formula: "(Completed trainings / Total employees) × 100"
        },
        {
          name: "Incident Resolution Rate",
          target: "95% within SLA",
          formula: "(Resolved incidents / Total incidents) × 100"
        }
      ],
      references: [
        {
          title: "AICPA Trust Services Criteria",
          description: "Official SOC 2 guidance",
          url: "https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/trustservices.html"
        }
      ]
    },
    "CC1.2": {
      description: "Exercises Oversight Responsibility",
      requirements: [
        "Establish board independence",
        "Define oversight responsibilities",
        "Monitor management activities",
        "Evaluate control effectiveness",
        "Review performance metrics"
      ],
      implementation: [
        {
          phase: "Planning",
          steps: [
            "Define board structure",
            "Establish committees",
            "Create oversight framework",
            "Define reporting requirements",
            "Set evaluation criteria"
          ]
        },
        {
          phase: "Execution",
          steps: [
            "Conduct board meetings",
            "Review performance reports",
            "Evaluate controls",
            "Provide guidance",
            "Document decisions"
          ]
        }
      ],
      evidence: [
        {
          title: "Board Documentation",
          description: "Evidence of board oversight activities",
          examples: [
            "Board minutes",
            "Committee charters",
            "Review reports",
            "Decision records",
            "Action items"
          ]
        }
      ],
      validation: {
        methods: [
          "Document review",
          "Board assessment",
          "Performance evaluation",
          "Control testing"
        ],
        frequency: "Annual",
        responsibility: "Board Secretary"
      }
    }
  }
};

export default soc2_guidance;
