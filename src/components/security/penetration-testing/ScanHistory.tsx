import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ScanResult } from '@/services/security/ScanningService'

interface ScanHistoryProps {
  scans: {
    id: string
    name: string
    type: string
    status: string
    start_date: string
    findings: number
    critical: number
    high: number
  }[]
  onViewResults: (scanId: string) => void
  onRerunScan: (scanId: string) => void
}

export function ScanHistory({ scans, onViewResults, onRerunScan }: ScanHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Findings</TableHead>
                <TableHead>Critical/High</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scans.map((scan) => (
                <TableRow key={scan.id}>
                  <TableCell>{scan.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{scan.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        scan.status === 'COMPLETED'
                          ? 'bg-green-500'
                          : scan.status === 'FAILED'
                          ? 'bg-red-500'
                          : 'bg-yellow-500'
                      }
                    >
                      {scan.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(scan.start_date).toLocaleString()}</TableCell>
                  <TableCell>{scan.findings}</TableCell>
                  <TableCell>
                    <span className="text-red-500 font-semibold">
                      {scan.critical + scan.high}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewResults(scan.id)}
                      >
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRerunScan(scan.id)}
                      >
                        Rerun
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
