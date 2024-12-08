export interface ControlGuidance {
  overview: string
  steps: string[]
  examples: string[]
  evidenceTypes?: {
    type: string
    description: string
    examples: string[]
    required: boolean
  }[]
  furtherStudy?: {
    title: string
    url: string
    description: string
  }[]
}

export interface FrameworkGuidance {
  frameworkId: string
  controls: Record<string, ControlGuidance>
}
