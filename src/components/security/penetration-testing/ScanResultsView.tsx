import { ScanResult } from '@/services/security/ScanningService'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'

interface ScanResultsViewProps {
  result: ScanResult
}

export function ScanResultsView({ result }: ScanResultsViewProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-red-500'
      case 'high':
        return 'bg-orange-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'low':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan Results</CardTitle>
        <CardDescription>
          {result.target.type.toUpperCase()} scan completed at {new Date(result.timestamp).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Total Findings</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-3xl font-bold">{result.summary.totalVulnerabilities}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Critical/High</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-3xl font-bold text-red-500">
                  {result.summary.criticalCount + result.summary.highCount}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Target</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm font-medium truncate">{result.target.target}</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Findings</h3>
            <ScrollArea className="h-[600px] rounded-md border p-4">
              <Accordion type="single" collapsible className="space-y-4">
                {result.findings.map((finding) => (
                  <AccordionItem key={finding.id} value={finding.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center space-x-4">
                        <Badge className={getSeverityColor(finding.severity)}>
                          {finding.severity.toUpperCase()}
                        </Badge>
                        <span className="text-left">{finding.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 p-4">
                        <div>
                          <h4 className="font-semibold">Description</h4>
                          <p className="text-sm">{finding.description}</p>
                        </div>

                        {finding.evidence && (
                          <div>
                            <h4 className="font-semibold">Evidence</h4>
                            <pre className="mt-2 rounded-md bg-slate-950 p-4">
                              <code className="text-sm text-white">{finding.evidence}</code>
                            </pre>
                          </div>
                        )}

                        {finding.remediation && (
                          <div>
                            <h4 className="font-semibold">Remediation</h4>
                            <p className="text-sm">{finding.remediation}</p>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                          {finding.cvss && (
                            <div>
                              <h4 className="font-semibold">CVSS Score</h4>
                              <p className="text-sm">{finding.cvss}</p>
                            </div>
                          )}

                          {finding.cwe && (
                            <div>
                              <h4 className="font-semibold">CWE ID</h4>
                              <p className="text-sm">{finding.cwe}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
