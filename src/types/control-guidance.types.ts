export interface ControlGuidance {
  description?: string;
  requirements?: string[];
  implementation?: {
    phase: string;
    steps: string[];
  }[];
  evidence?: {
    title: string;
    description: string;
    examples: string[];
    validationMethod?: string;
  }[];
  validation?: {
    methods: string[];
    frequency: string;
    responsibility: string;
  };
  metrics?: {
    name: string;
    target: string;
    formula?: string;
    measurement?: string;
  }[];
  references?: {
    title: string;
    description: string;
    url: string;
  }[];
  commonChallenges?: {
    challenge: string;
    solution: string;
    preventiveMeasures?: string[];
  }[];
  industryExamples?: {
    industry: string;
    examples: string[];
  }[];
}

export interface FrameworkGuidance {
  frameworkId: string;
  controls: {
    [key: string]: ControlGuidance;
  };
}
