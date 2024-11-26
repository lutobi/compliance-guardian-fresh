import { useState, useEffect } from 'react'
import { Framework, SelectableFramework } from '@/types/framework'
import { defaultFrameworks } from '@/data/frameworks'

function generateFrameworkId(name: string): string {
  console.log('Generating ID for framework:', name)
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  console.log('Generated ID:', id)
  return id
}

function transformFramework(rawFramework: any): Framework {
  console.log('Transforming framework:', rawFramework)
  const id = generateFrameworkId(rawFramework.name)
  
  const framework: Framework = {
    id,
    name: rawFramework.name,
    description: rawFramework.description,
    controls: []
  }

  // Helper function to transform controls recursively
  const transformControl = (control: any): any => {
    if (!control) return null

    const transformed = {
      id: control.id,
      name: control.title || control.name,
      description: control.description,
    }

    // Handle subcontrols
    if (control.subControls?.length > 0) {
      transformed.children = control.subControls
        .map(transformControl)
        .filter(Boolean)
    }

    // Handle nested controls
    if (control.controls?.length > 0) {
      transformed.children = [
        ...(transformed.children || []),
        ...control.controls.map(transformControl).filter(Boolean)
      ]
    }

    return transformed
  }

  // Transform top-level controls
  if (rawFramework.controls) {
    framework.controls = rawFramework.controls
      .map((section: any) => {
        if (section.controls) {
          return section.controls.map(transformControl)
        }
        return transformControl(section)
      })
      .flat()
      .filter(Boolean)
  }

  console.log('Transformed framework:', framework)
  return framework
}

function createSelectableFramework(framework: Framework): SelectableFramework {
  console.log('Creating selectable framework from:', framework)
  return {
    value: framework.id,
    label: framework.name,
    description: framework.description
  }
}

export function useFrameworks() {
  const [frameworks, setFrameworks] = useState<Framework[]>([])
  const [selectableFrameworks, setSelectableFrameworks] = useState<SelectableFramework[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadFrameworks = () => {
      try {
        console.log('Loading frameworks, defaultFrameworks:', defaultFrameworks)
        if (!defaultFrameworks?.length) {
          throw new Error('No frameworks available')
        }

        // Transform frameworks
        const transformedFrameworks = defaultFrameworks.map(transformFramework)
        console.log('Transformed frameworks:', transformedFrameworks)
        
        // Create selectable options
        const selectableOptions = transformedFrameworks.map(createSelectableFramework)
        console.log('Created selectable options:', selectableOptions)

        setFrameworks(transformedFrameworks)
        setSelectableFrameworks(selectableOptions)
        setError(null)
      } catch (err) {
        console.error('Error loading frameworks:', err)
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    loadFrameworks()
  }, [])

  const getFrameworkById = (id: string) => {
    console.log('Getting framework by id:', id)
    const framework = frameworks.find(f => f.id === id)
    console.log('Found framework:', framework)
    return framework
  }

  const getSelectableFrameworkByValue = (value: string) => {
    console.log('Getting selectable framework by value:', value)
    const framework = selectableFrameworks.find(f => f.value === value)
    console.log('Found selectable framework:', framework)
    return framework
  }

  return {
    frameworks,
    selectableFrameworks,
    isLoading,
    error,
    getFrameworkById,
    getSelectableFrameworkByValue
  }
}
