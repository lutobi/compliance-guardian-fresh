'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { learnFrameworks } from '@/data/frameworks-learn'
import { getAllControls, getControlGuidance } from '@/utils/control-guidance'
import { ControlItemData, FrameworkData } from '@/types/framework-data.types'

export default function FrameworkLearningPage() {
  const searchParams = useSearchParams()
  const [selectedFramework, setSelectedFramework] = useState<FrameworkData>(learnFrameworks.find(f => f.name === 'ISO 27001:2022') || learnFrameworks[0])
  const [selectedControl, setSelectedControl] = useState<ControlItemData | null>(null)
  const [expandedControls, setExpandedControls] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const controls = useMemo(() => {
    if (!selectedFramework) return []
    try {
      console.log('Selected Framework:', selectedFramework)
      const allControls = getAllControls(selectedFramework.controls)
      console.log('All Controls:', allControls)
      return allControls
    } catch (err) {
      console.error('Error getting controls:', err)
      setError('Failed to load controls')
      return []
    }
  }, [selectedFramework])

  useEffect(() => {
    console.log('Controls in render:', controls)
  }, [controls])

  const evidenceCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    controls.forEach(control => {
      counts[control.id] = Math.floor(Math.random() * 10) // Mock evidence count
    })
    return counts
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
    const frameworkId = searchParams.get('framework')
    const controlId = searchParams.get('control')

    if (frameworkId) {
      const framework = learnFrameworks.find(f => f.name === frameworkId)
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
  }, [searchParams])

  const handleControlClick = (control: ControlItemData) => {
    setSelectedControl(control)
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center space-y-4">
          <Icons.warning className="h-12 w-12 text-destructive mx-auto" />
          <h3 className="text-lg font-medium">Error Loading Framework</h3>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Framework Selection */}
        <div className="w-full lg:w-1/4 space-y-4">
          <div className="bg-card rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Frameworks</h2>
            <div className="space-y-2">
              {learnFrameworks.map((framework) => (
                <button
                  key={framework.name}
                  onClick={() => setSelectedFramework(framework)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                    selectedFramework.name === framework.name
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  {framework.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Control Tree and Details */}
        <div className="flex-1 space-y-6">
          {selectedFramework && (
            <div className="grid lg:grid-cols-5 gap-6">
              {/* Control Tree */}
              <div className="lg:col-span-2 bg-card rounded-lg p-4 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Controls</h2>
                <ScrollArea className="h-[calc(100vh-16rem)]">
                  <div className="space-y-2">
                    {selectedFramework?.controls.map((control) => {
                      const hasSubControls = control.subControls && control.subControls.length > 0
                      return (
                        <div key={control.id} className="space-y-1">
                          <button
                            onClick={() => {
                              if (hasSubControls) {
                                setExpandedControls(prev =>
                                  prev.includes(control.id)
                                    ? prev.filter(id => id !== control.id)
                                    : [...prev, control.id]
                                )
                              }
                              handleControlClick(control)
                            }}
                            className={cn(
                              "w-full text-left px-3 py-2 rounded-md transition-colors hover:bg-muted",
                              selectedControl?.id === control.id && "bg-primary text-primary-foreground"
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{control.id}</span>
                                  {hasSubControls && (
                                    <ChevronDown
                                      className={cn(
                                        "h-4 w-4 transition-transform",
                                        expandedControls.includes(control.id) ? "transform rotate-180" : ""
                                      )}
                                    />
                                  )}
                                </div>
                                <span className="text-sm text-muted-foreground truncate">
                                  {control.title}
                                </span>
                              </div>
                              {hasSubControls && (
                                <Badge variant="outline" className="ml-2">
                                  {control.subControls?.length || 0}
                                </Badge>
                              )}
                            </div>
                          </button>
                          
                          {expandedControls.includes(control.id) && hasSubControls && (
                            <div className="ml-4 space-y-1 border-l-2 border-muted pl-2">
                              {control.subControls?.map((subControl) => (
                                <button
                                  key={subControl.id}
                                  onClick={() => handleControlClick(subControl)}
                                  className={cn(
                                    "w-full text-left px-3 py-2 rounded-md transition-colors hover:bg-muted",
                                    selectedControl?.id === subControl.id && "bg-primary text-primary-foreground"
                                  )}
                                >
                                  <div className="flex flex-col">
                                    <span className="text-sm font-medium">{subControl.id}</span>
                                    <span className="text-xs text-muted-foreground truncate">
                                      {subControl.title}
                                    </span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              </div>

              {/* Control Details */}
              <div className="lg:col-span-3 bg-card rounded-lg p-4 shadow-sm">
                {selectedControl && guidance ? (
                  <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold">{selectedControl.id}</h2>
                        <Badge variant="outline" className="text-sm">
                          {selectedFramework.name}
                        </Badge>
                      </div>
                      <h3 className="text-lg text-muted-foreground">
                        {selectedControl.title}
                      </h3>
                    </div>

                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="w-full justify-start overflow-x-auto">
                        <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
                        <TabsTrigger value="steps" className="text-sm">Implementation Steps</TabsTrigger>
                        <TabsTrigger value="examples" className="text-sm">Examples</TabsTrigger>
                        <TabsTrigger value="evidence" className="text-sm">Evidence Types</TabsTrigger>
                        <TabsTrigger value="resources" className="text-sm">Further Study</TabsTrigger>
                      </TabsList>

                      <div className="mt-6 max-h-[calc(100vh-24rem)] overflow-y-auto">
                        <TabsContent value="overview">
                          <div className="prose max-w-none">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {guidance.overview}
                            </p>
                          </div>
                        </TabsContent>

                        <TabsContent value="steps">
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

                        <TabsContent value="examples">
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

                        <TabsContent value="evidence">
                          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                            {guidance.evidenceTypes?.map((evidence, index) => (
                              <Card key={index} className="p-4">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <h4 className="text-sm font-medium">{evidence.type}</h4>
                                    {evidence.required && (
                                      <Badge variant="secondary" className="text-xs">Required</Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground">{evidence.description}</p>
                                  <div className="pl-4 space-y-1">
                                    {evidence.examples.map((example, i) => (
                                      <p key={i} className="text-sm text-muted-foreground">• {example}</p>
                                    ))}
                                  </div>
                                </div>
                              </Card>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="resources">
                          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                            {guidance.furtherStudy?.map((resource, index) => (
                              <Card key={index} className="p-4">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-medium">{resource.title}</h4>
                                    <Link 
                                      href={resource.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                                    >
                                      Visit <Icons.externalLink className="h-3 w-3" />
                                    </Link>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                                </div>
                              </Card>
                            ))}
                          </div>
                        </TabsContent>
                      </div>
                    </Tabs>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[calc(100vh-24rem)]">
                    <div className="text-center space-y-4">
                      <Icons.book className="h-12 w-12 text-muted-foreground/50" />
                      <h3 className="text-lg font-medium">Select a Control</h3>
                      <p className="text-sm text-muted-foreground">
                        Choose a control from the list to view its guidance.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
