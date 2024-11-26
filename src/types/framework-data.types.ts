export interface Framework {
  id: string
  name: string
  version: string
  description: string
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface Control {
  id: string
  framework_id: string
  parent_control_id: string | null
  control_id: string
  title: string
  description: string
  created_at: string
  updated_at: string
}

export interface ControlWithChildren extends Control {
  children?: ControlWithChildren[]
}

export interface FrameworkWithControls extends Framework {
  controls: ControlWithChildren[]
}

export interface ImplementationStatus {
  id: string
  control_id: string
  status: 'not_started' | 'in_progress' | 'implemented' | 'not_applicable'
  progress: number
  notes: string
  created_at: string
  updated_at: string
}

export interface Evidence {
  id: string
  control_id: string
  title: string
  description: string
  file_url: string
  file_type: string
  uploaded_by: string
  created_at: string
  updated_at: string
}

// Types for initial data
export interface FrameworkData {
  name: string
  version: string
  description: string
  controls: ControlData[]
}

export interface ControlData {
  name?: string
  controls?: ControlItemData[]
}

export interface ControlItemData {
  id: string
  title: string
  description: string
  subControls?: ControlItemData[]
  controls?: ControlItemData[]
}
