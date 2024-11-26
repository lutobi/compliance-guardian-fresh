export interface Control {
  id: string
  name?: string
  title?: string
  description?: string
  subControls?: Control[]
  children?: Control[]
  controls?: Control[]
}

export interface Framework {
  id: string
  name: string
  description: string
  controls: Control[]
}
