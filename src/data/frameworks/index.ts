import { FrameworkData } from '../../types/framework-data.types'
import { iso27001 } from './iso27001'
import { pciDss } from './pci-dss'
import { nist } from './nist'
import { soc2 } from './soc2'
import { gdpr } from './gdpr'
import { hipaa } from './hipaa'

export const defaultFrameworks: FrameworkData[] = [
  iso27001,
  pciDss,
  nist,
  soc2,
  gdpr,
  hipaa
]
