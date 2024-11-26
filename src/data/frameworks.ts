import { FrameworkData } from '../types/framework-data.types'
import { Framework, Control } from '../types/framework'
import { pciDssFramework } from './pci-dss-controls'
import { soc2Framework } from './soc2-controls'
import { gdprFramework } from './gdpr-controls'
import { iso27001Framework } from './iso27001-controls'
import { nistFramework } from './nist-csf-controls'
import { hipaaFramework } from './hipaa-controls'
import { iso42001Framework } from './iso42001-controls'

export const defaultFrameworks: FrameworkData[] = [
  iso27001Framework,
  nistFramework,
  pciDssFramework,
  soc2Framework,
  gdprFramework,
  hipaaFramework,
  iso42001Framework
]

function transformFramework(framework: FrameworkData): Framework {
  // Helper function to transform a control and its subcontrols
  function transformControlItem(item: any): Control {
    const control: Control = {
      id: item.id,
      name: item.title,
      description: item.description
    }
    
    if (item.subControls?.length > 0) {
      control.children = item.subControls.map(transformControlItem)
    }
    
    return control
  }

  // Helper function to process a section of controls
  function processControlSection(section: any): Control[] {
    if (!section.controls) return []
    
    return section.controls.map((control: any) => {
      if (control.id) {
        return transformControlItem(control)
      }
      return processControlSection(control)[0]
    }).filter(Boolean)
  }

  return {
    id: framework.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: framework.name,
    description: framework.description,
    controls: framework.controls.flatMap(processControlSection)
  }
}

export const frameworks = defaultFrameworks.map(transformFramework)

const statuses: Record<string, string> = {}

const calculateProgress = (ctrl: Control): number => {
  if (!ctrl.children?.length) {
    return statuses[ctrl.id] === 'completed' ? 100 : 0
  }

  const totalControls = ctrl.children.length
  const completedCount = ctrl.children.reduce((acc, child) => {
    if (!child.children?.length) {
      return acc + (statuses[child.id] === 'completed' ? 1 : 0)
    }
    return acc + (calculateProgress(child) === 100 ? 1 : 0)
  }, 0)

  return Math.round((completedCount / totalControls) * 100)
}