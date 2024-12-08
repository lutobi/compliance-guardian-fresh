'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Icons } from '@/components/ui/icons'

export default function ExportsPage() {
  const exports = [
    {
      id: 1,
      name: 'Compliance Report - Q4 2023',
      type: 'PDF',
      status: 'Completed',
      created: '2023-12-01 14:30',
      size: '2.4 MB',
    },
    {
      id: 2,
      name: 'Security Metrics Export',
      type: 'CSV',
      status: 'Processing',
      created: '2023-12-02 09:15',
      size: '1.1 MB',
    },
    {
      id: 3,
      name: 'Audit Logs - November 2023',
      type: 'JSON',
      status: 'Failed',
      created: '2023-12-03 16:45',
      size: '3.7 MB',
    },
    {
      id: 4,
      name: 'Framework Assessment Data',
      type: 'XLSX',
      status: 'Completed',
      created: '2023-12-04 11:20',
      size: '5.2 MB',
    },
  ]

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Data Exports</h1>
          <p className="text-muted-foreground">
            Export and download compliance data in various formats.
          </p>
        </div>
        <Button>
          <Icons.plus className="mr-2 h-4 w-4" />
          New Export
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Exports</CardTitle>
          <CardDescription>
            View and download your recent data exports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exports.map((export_) => (
                <TableRow key={export_.id}>
                  <TableCell className="font-medium">{export_.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{export_.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        export_.status === 'Completed'
                          ? 'default'
                          : export_.status === 'Processing'
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {export_.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{export_.created}</TableCell>
                  <TableCell>{export_.size}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={export_.status !== 'Completed'}
                    >
                      <Icons.download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Export Settings</CardTitle>
          <CardDescription>
            Configure your data export preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Automatic Exports</h4>
              <p className="text-sm text-muted-foreground">
                Schedule regular data exports
              </p>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Export Formats</h4>
              <p className="text-sm text-muted-foreground">
                Manage supported export formats
              </p>
            </div>
            <Button variant="outline">Customize</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
