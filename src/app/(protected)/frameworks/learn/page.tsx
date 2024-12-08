'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { ScrollArea } from '@/components/ui/scroll-area'
import { defaultFrameworks } from '@/data/frameworks'
import { getAllControls, getControlGuidance } from '@/utils/control-guidance'
import { getEvidenceCountsForControls } from '@/utils/evidence'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { FrameworkData, ControlItemData } from '@/types/framework-data.types'

export default function FrameworkLearningPage() {
  const searchParams = useSearchParams()
  const [selectedFramework, setSelectedFramework] = useState<FrameworkData>(defaultFrameworks.find(f => f.name === 'ISO 27001:2022') || defaultFrameworks[0])
  const [selectedControl, setSelectedControl] = useState<ControlItemData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const controls = useMemo(() => {
    try {
      const allControls = selectedFramework?.controls ? getAllControls(selectedFramework.controls) : []
      console.log('All controls:', allControls)
      return allControls
    } catch (err) {
      console.error('Error getting controls:', err)
      return []
    }
  }, [selectedFramework])

  const evidenceCounts = useMemo(() => {
    try {
      if (!controls.length) {
        console.log('No controls found')
        return {}
      }

      const controlIds = controls.flatMap(control => {
        const ids = [control.id]
        if (Array.isArray(control.subControls)) {
          ids.push(...control.subControls.map(sub => sub.id))
        }
        return ids
      }).filter(Boolean)

      console.log('Control IDs:', controlIds)
      const counts = getEvidenceCountsForControls(controlIds)
      console.log('Evidence counts:', counts)
      return counts
    } catch (err) {
      console.error('Error getting evidence counts:', err)
      return {}
    }
  }, [controls])

  const guidance = useMemo(() => {
    try {
      return selectedControl ? getControlGuidance(selectedControl.id) : null
    } catch (err) {
      console.error('Error getting guidance:', err)
      return null
    }
  }, [selectedControl])

  useEffect(() => {
    try {
      const frameworkId = searchParams.get('framework')
      const controlId = searchParams.get('control')

      if (frameworkId) {
        const framework = defaultFrameworks.find((f) => f.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === frameworkId)
        if (framework) {
          setSelectedFramework(framework)
          if (controlId) {
            const control = getAllControls(framework.controls).find((c) => c.id === controlId)
            if (control) {
              setSelectedControl(control)
            }
          }
        }
      }
    } catch (err) {
      console.error('Error setting initial framework/control:', err)
      setError('Failed to load framework data')
    }
  }, [searchParams])

  if (error) {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <div className="text-center space-y-4">
          <Icons.alertTriangle className="h-12 w-12 text-destructive mx-auto" />
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Something went wrong</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[100vh]">
      {/* Header Section */}
      <div className="flex-none p-6 space-y-6 bg-background border-b">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight">Framework Learning Center</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Master compliance frameworks through comprehensive guidance and practical implementation steps
          </p>
        </div>

        {/* Framework Selection */}
        <div className="flex flex-wrap gap-2">
          {defaultFrameworks.map((framework) => (
            <button
              key={framework.name}
              onClick={() => setSelectedFramework(framework)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg transition-all',
                selectedFramework.name === framework.name
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted hover:bg-muted/80'
              )}
            >
              {framework.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-12 h-full">
          {/* Controls List */}
          <div className="col-span-4 border-r overflow-hidden bg-muted/30">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">{selectedFramework.name}</h2>
                    <Badge variant="outline" className="text-xs">
                      {controls.length} Controls
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedFramework.description}</p>
                </div>

                <div className="space-y-2">
                  {controls.map((control) => (
                    <Card
                      key={control.id}
                      className={cn(
                        'p-4 cursor-pointer transition-all hover:shadow-sm',
                        selectedControl?.id === control.id 
                          ? 'bg-primary/5 border-primary shadow-sm' 
                          : 'hover:bg-muted/50'
                      )}
                      onClick={() => setSelectedControl(control)}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "text-sm font-medium",
                            selectedControl?.id === control.id ? "text-primary" : "text-foreground"
                          )}>{control.id}</span>
                          {evidenceCounts[control.id] > 0 && (
                            <Badge variant="secondary" className="text-xs flex items-center gap-1">
                              <Icons.fileText className="h-3 w-3" />
                              {evidenceCounts[control.id]}
                            </Badge>
                          )}
                          {control.subControls && control.subControls.length > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {control.subControls.length} subcontrols
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-sm font-medium">{control.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {control.description}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Control Details */}
          <div className="col-span-8 overflow-hidden bg-background">
            <ScrollArea className="h-full">
              {selectedControl ? (
                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-bold">{selectedControl.id}</h2>
                          <Badge variant="outline">Control</Badge>
                          {evidenceCounts[selectedControl.id] > 0 && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Icons.fileText className="h-3 w-3" />
                              {evidenceCounts[selectedControl.id]} Evidence
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-muted-foreground">{selectedControl.title}</h3>
                      </div>
                    </div>
                    <div className="prose max-w-none">
                      <p className="text-muted-foreground">{selectedControl.description}</p>
                    </div>
                  </div>

                  {selectedControl.subControls && selectedControl.subControls.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">Subcontrols</h3>
                        <Badge variant="outline" className="text-xs">
                          {selectedControl.subControls.length} total
                        </Badge>
                      </div>
                      <div className="grid gap-3">
                        {selectedControl.subControls.map((subControl) => (
                          <Card key={subControl.id} className="p-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-primary">{subControl.id}</span>
                                <Badge variant="secondary" className="text-xs">
                                  Subcontrol
                                </Badge>
                                {evidenceCounts[subControl.id] > 0 && (
                                  <Badge variant="outline" className="text-xs flex items-center gap-1">
                                    <Icons.fileText className="h-3 w-3" />
                                    {evidenceCounts[subControl.id]}
                                  </Badge>
                                )}
                              </div>
                              <h4 className="text-sm font-medium">{subControl.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {subControl.description}
                              </p>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {guidance && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Implementation Guidance</h3>
                      <Tabs defaultValue="overview" className="space-y-4">
                        <TabsList className="bg-muted/50 p-1">
                          <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
                          <TabsTrigger value="steps" className="text-sm">Implementation Steps</TabsTrigger>
                          <TabsTrigger value="examples" className="text-sm">Examples</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="space-y-4">
                          <div className="prose max-w-none">
                            <p className="text-muted-foreground">{guidance.overview}</p>
                          </div>
                        </TabsContent>
                        <TabsContent value="steps" className="space-y-4">
                          <div className="space-y-3">
                            {guidance.steps?.map((step: string, index: number) => (
                              <div key={index} className="flex gap-3 items-start">
                                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium">
                                  {index + 1}
                                </div>
                                <p className="text-sm text-muted-foreground leading-normal">{step}</p>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        <TabsContent value="examples" className="space-y-4">
                          <div className="space-y-3">
                            {guidance.examples?.map((example: string, index: number) => (
                              <div key={index} className="flex gap-3 items-start">
                                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium">
                                  {index + 1}
                                </div>
                                <p className="text-sm text-muted-foreground leading-normal">{example}</p>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Icons.book className="h-12 w-12 text-muted-foreground/50 mx-auto" />
                    <h3 className="text-lg font-medium text-muted-foreground">Select a control to view details</h3>
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}
