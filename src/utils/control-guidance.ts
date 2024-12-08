import { ControlGuidance } from '@/types/control-guidance.types';
import { ControlData, ControlItemData } from '@/types/framework-data.types';
import iso27001Guidance from '@/data/framework-guidance/iso27001-guidance';
import soc2Guidance from '@/data/framework-guidance/soc2-guidance';
import hipaaGuidance from '@/data/framework-guidance/hipaa-guidance';
import gdprGuidance from '@/data/framework-guidance/gdpr-guidance';
import nistCsfGuidance from '@/data/framework-guidance/nist-csf-guidance';
import pciDssGuidance from '@/data/framework-guidance/pci-dss-guidance';

export function getAllControls(controls: ControlData[]): ControlItemData[] {
  if (!Array.isArray(controls)) {
    console.warn('Invalid controls input:', controls);
    return [];
  }

  const allControls: ControlItemData[] = [];
  const processedIds = new Set<string>();
  
  function extractControls(items: (ControlData | ControlItemData)[]) {
    items.forEach(item => {
      // Skip if we've already processed this control or if it's invalid
      if (!item?.id && !('controls' in item)) {
        return;
      }

      // Handle section with nested controls
      if ('controls' in item && Array.isArray(item.controls)) {
        extractControls(item.controls);
        return;
      }

      // Handle control item
      const control = item as ControlItemData;
      if (!control.id || processedIds.has(control.id)) {
        return;
      }

      // Add the control to processed set and allControls array
      processedIds.add(control.id);
      allControls.push(control);

      // Process subcontrols if they exist
      if (Array.isArray(control.subControls)) {
        control.subControls.forEach(sub => {
          if (sub?.id && !processedIds.has(sub.id)) {
            processedIds.add(sub.id);
            allControls.push(sub);
          }
        });
      }
    });
  }
  
  try {
    extractControls(controls);
    return allControls;
  } catch (error) {
    console.error('Error extracting controls:', error);
    return [];
  }
}

export function getControlGuidance(controlId: string): ControlGuidance | null {
  if (!controlId) {
    console.warn('No control ID provided for guidance lookup');
    return null;
  }

  const frameworks = [
    iso27001Guidance,
    soc2Guidance,
    hipaaGuidance,
    gdprGuidance,
    nistCsfGuidance,
    pciDssGuidance
  ];

  try {
    for (const framework of frameworks) {
      if (framework?.controls?.[controlId]) {
        return framework.controls[controlId];
      }
    }
  } catch (error) {
    console.error('Error getting control guidance:', error);
  }

  return null;
}
