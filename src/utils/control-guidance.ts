import { ControlItemData } from '@/types/framework-data.types'
import { ControlGuidance } from '@/types/control-guidance.types'
import { iso27001Guidance } from '@/data/framework-guidance/iso27001-guidance'
import { nistCsfGuidance } from '@/data/framework-guidance/nist-csf-guidance'
import { soc2Guidance } from '@/data/framework-guidance/soc2-guidance'
import { pciDssGuidance } from '@/data/framework-guidance/pci-dss-guidance'
import { iso42001Guidance } from '@/data/framework-guidance/iso42001-guidance'
import { gdprGuidance } from '@/data/framework-guidance/gdpr-guidance'
import { hipaaGuidance } from '@/data/framework-guidance/hipaa-guidance'

const frameworkGuidanceMap = {
  'ISO 27001:2022': iso27001Guidance,
  'NIST CSF': nistCsfGuidance,
  'SOC 2': soc2Guidance,
  'PCI DSS': pciDssGuidance,
  'ISO 42001': iso42001Guidance,
  'GDPR': gdprGuidance,
  'HIPAA': hipaaGuidance,
}

export function getAllControls(controls: ControlItemData[]): ControlItemData[] {
  const allControls: ControlItemData[] = []

  function extractControls(control: ControlItemData) {
    allControls.push(control)
    if (control.subControls) {
      control.subControls.forEach(extractControls)
    }
  }

  controls.forEach(extractControls)
  return allControls
}

export function getControlGuidance(frameworkName: string, controlId: string): ControlGuidance | undefined {
  const guidance = frameworkGuidanceMap[frameworkName as keyof typeof frameworkGuidanceMap]
  return guidance?.find(g => g.controlId === controlId)
}

export function getAllGuidance(frameworkName: string): ControlGuidance[] {
  return frameworkGuidanceMap[frameworkName as keyof typeof frameworkGuidanceMap] || []
}
