import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'

export interface ScanHistoryProps {
  scans: Array<{
    id: string
    name: string
    type: string
    status: string
    start_date: string
    findings: number
    critical: number
    high: number
  }>
  onScanSelect: (scanId: string) => void
}

export function ScanHistory({ scans, onScanSelect }: ScanHistoryProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Findings</TableHead>
          <TableHead>Critical</TableHead>
          <TableHead>High</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scans.map((scan) => (
          <TableRow 
            key={scan.id} 
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => onScanSelect(scan.id)}
          >
            <TableCell>{scan.name}</TableCell>
            <TableCell>{scan.type}</TableCell>
            <TableCell>
              <Badge variant={scan.status === 'completed' ? 'default' : 'secondary'}>
                {scan.status}
              </Badge>
            </TableCell>
            <TableCell>{format(new Date(scan.start_date), 'PPp')}</TableCell>
            <TableCell>{scan.findings}</TableCell>
            <TableCell>{scan.critical}</TableCell>
            <TableCell>{scan.high}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
