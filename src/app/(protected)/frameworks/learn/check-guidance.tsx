'use client'

import { useEffect, useState } from 'react'
import { learnFrameworks } from '@/data/frameworks-learn'
import { listMissingGuidance } from '@/utils/control-guidance'

export default function CheckGuidancePage() {
  const [missingGuidance, setMissingGuidance] = useState<Record<string, string[]>>({})

  useEffect(() => {
    const missing: Record<string, string[]> = {}
    learnFrameworks.forEach(framework => {
      const missingControls = listMissingGuidance(framework.name, framework.controls)
      if (missingControls.length > 0) {
        missing[framework.name] = missingControls
      }
    })
    setMissingGuidance(missing)
  }, [])

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <h1 className="text-2xl font-bold">Missing Guidance Report</h1>
      
      {Object.keys(missingGuidance).length === 0 ? (
        <div className="bg-green-50 text-green-800 rounded-lg p-4">
          <p className="font-medium">All frameworks have complete guidance!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(missingGuidance).map(([framework, controls]) => (
            <div key={framework} className="bg-card rounded-lg p-4 shadow-sm">
              <h2 className="text-lg font-semibold mb-2">{framework}</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Missing guidance for {controls.length} control{controls.length === 1 ? '' : 's'}:
              </p>
              <ul className="list-disc list-inside space-y-1">
                {controls.map((control, index) => (
                  <li key={index} className="text-sm text-muted-foreground">{control}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
