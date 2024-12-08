'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Icons } from '@/components/ui/icons'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ReportsPage() {
  const reports = [
    {
      id: 1,
      name: 'Monthly Compliance Summary',
      type: 'Compliance',
      frequency: 'Monthly',
      lastRun: '2023-12-01',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Security Controls Assessment',
      type: 'Security',
      frequency: 'Weekly',
      lastRun: '2023-12-02',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Framework Gap Analysis',
      type: 'Framework',
      frequency: 'Quarterly',
      lastRun: '2023-12-03',
      status: 'Inactive',
    },
    {
      id: 4,
      name: 'Audit Trail Report',
      type: 'Audit',
      frequency: 'Daily',
      lastRun: '2023-12-04',
      status: 'Active',
    },
  ]

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Generate and manage compliance reports.
          </p>
        </div>
        <Button>
          <Icons.plus className="mr-2 h-4 w-4" />
          New Report
        </Button>
      </div>

      <Tabs defaultValue="scheduled" className="space-y-4">
        <TabsList>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="adhoc">Ad-hoc Reports</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>
                View and manage your scheduled reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{report.type}</Badge>
                      </TableCell>
                      <TableCell>{report.frequency}</TableCell>
                      <TableCell>{report.lastRun}</TableCell>
                      <TableCell>
                        <Badge
                          variant={report.status === 'Active' ? 'default' : 'secondary'}
                        >
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="sm">
                          <Icons.play className="h-4 w-4" />
                          <span className="sr-only">Run</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icons.settings className="h-4 w-4" />
                          <span className="sr-only">Settings</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adhoc">
          <Card>
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
              <CardDescription>
                Generate one-time reports
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Compliance Summary</CardTitle>
                  <CardDescription>
                    Overview of compliance status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Generate</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Control Assessment</CardTitle>
                  <CardDescription>
                    Detailed control evaluation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Generate</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Audit Report</CardTitle>
                  <CardDescription>
                    Complete audit trail
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Generate</Button>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>
                Manage report templates
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Executive Summary</CardTitle>
                  <CardDescription>
                    High-level overview template
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Edit Template</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Technical Report</CardTitle>
                  <CardDescription>
                    Detailed technical assessment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Edit Template</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Custom Template</CardTitle>
                  <CardDescription>
                    Create a new template
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Create Template</Button>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
