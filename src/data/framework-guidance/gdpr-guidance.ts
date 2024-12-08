const gdpr_guidance = {
  frameworkId: "GDPR",
  controls: {
    "Art5.1.a": {
      description: "Lawfulness, fairness and transparency",
      requirements: [
        "Process data lawfully",
        "Ensure fairness in processing",
        "Maintain transparency",
        "Document legal basis",
        "Provide privacy notices"
      ],
      implementation: [
        {
          phase: "Assessment",
          steps: [
            "Identify processing activities",
            "Determine legal basis",
            "Document justification",
            "Review fairness impact",
            "Create transparency measures"
          ]
        },
        {
          phase: "Documentation",
          steps: [
            "Create privacy notices",
            "Document legal bases",
            "Maintain processing records",
            "Update documentation",
            "Review regularly"
          ]
        },
        {
          phase: "Communication",
          steps: [
            "Publish privacy notices",
            "Inform data subjects",
            "Handle inquiries",
            "Update communications",
            "Train staff"
          ]
        }
      ],
      evidence: [
        {
          title: "Legal Documentation",
          description: "Evidence of lawful processing",
          examples: [
            "Privacy notices",
            "Consent records",
            "Legal basis documentation",
            "Processing records",
            "Communication logs"
          ]
        },
        {
          title: "Transparency Measures",
          description: "Evidence of transparency",
          examples: [
            "Public privacy policy",
            "Data subject communications",
            "Internal procedures",
            "Training materials",
            "Review records"
          ]
        }
      ],
      validation: {
        methods: [
          "Documentation review",
          "Process assessment",
          "Communication audit",
          "Compliance check",
          "Staff interviews"
        ],
        frequency: "Semi-annual",
        responsibility: "Data Protection Officer"
      },
      metrics: [
        {
          name: "Privacy Notice Coverage",
          target: "100% of processing activities",
          formula: "(Documented activities / Total activities) × 100"
        },
        {
          name: "Transparency Compliance",
          target: "100% compliance",
          formula: "(Compliant measures / Required measures) × 100"
        }
      ],
      references: [
        {
          title: "GDPR Article 5",
          description: "Official GDPR text on principles",
          url: "https://gdpr-info.eu/art-5-gdpr/"
        },
        {
          title: "EDPB Guidelines",
          description: "European Data Protection Board guidance",
          url: "https://edpb.europa.eu/our-work-tools/general-guidance/gdpr-guidelines-recommendations-best-practices_en"
        }
      ]
    },
    "Art5.1.b": {
      description: "Purpose limitation",
      requirements: [
        "Specify processing purposes",
        "Document purposes explicitly",
        "Ensure legitimate purposes",
        "Prevent purpose creep",
        "Review purpose compatibility"
      ],
      implementation: [
        {
          phase: "Planning",
          steps: [
            "Identify purposes",
            "Document purposes",
            "Assess legitimacy",
            "Create controls",
            "Establish review process"
          ]
        },
        {
          phase: "Implementation",
          steps: [
            "Implement controls",
            "Train staff",
            "Monitor compliance",
            "Review changes",
            "Update documentation"
          ]
        }
      ],
      evidence: [
        {
          title: "Purpose Documentation",
          description: "Documentation of processing purposes",
          examples: [
            "Purpose registry",
            "Processing records",
            "Assessment reports",
            "Change logs",
            "Review documentation"
          ]
        }
      ],
      validation: {
        methods: [
          "Purpose review",
          "Compatibility assessment",
          "Control testing",
          "Documentation audit"
        ],
        frequency: "Annual",
        responsibility: "Data Protection Officer"
      }
    }
  }
};

export default gdpr_guidance;
