'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Icons } from '@/components/ui/icons'

export default function SecurityMonitoringPage() {
  const [timeRange, setTimeRange] = useState('24h')

  const alerts = [
    {
      id: 1,
      severity: 'Critical',
      type: 'Unauthorized Access',
      source: 'Authentication Service',
      timestamp: '2023-12-07 14:30:00',
      status: 'Open',
    },
    {
      id: 2,
      severity: 'High',
      type: 'Failed Login Attempts',
      source: 'User Authentication',
      timestamp: '2023-12-07 14:15:00',
      status: 'Investigating',
    },
    {
      id: 3,
      severity: 'Medium',
      type: 'Configuration Change',
      source: 'System Settings',
      timestamp: '2023-12-07 13:45:00',
      status: 'Resolved',
    },
  ]

  const metrics = [
    {
      title: 'Active Alerts',
      value: '12',
      change: '+2',
      trend: 'up',
    },
    {
      title: 'Failed Logins',
      value: '45',
      change: '-5',
      trend: 'down',
    },
    {
      title: 'System Health',
      value: '98%',
      change: '+1%',
      trend: 'up',
    },
    {
      title: 'API Errors',
      value: '23',
      change: '+3',
      trend: 'up',
    },
  ]

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Security Monitoring</h1>
          <p className="text-muted-foreground">
            Monitor security events and system health in real-time.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Icons.refresh className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              {metric.trend === 'up' ? (
                <Icons.trendingUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Icons.trendingDown className="h-4 w-4 text-muted-foreground" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={cn(
                "text-xs",
                metric.trend === 'up'
                  ? "text-destructive"
                  : "text-green-500"
              )}>
                {metric.change} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Security Alerts</CardTitle>
            <CardDescription>
              Recent security alerts and events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Severity</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell>
                      <Badge variant={
                        alert.severity === 'Critical'
                          ? 'destructive'
                          : alert.severity === 'High'
                          ? 'default'
                          : 'secondary'
                      }>
                        {alert.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>{alert.type}</TableCell>
                    <TableCell>{alert.source}</TableCell>
                    <TableCell>{alert.timestamp}</TableCell>
                    <TableCell>
                      <Badge variant={
                        alert.status === 'Open'
                          ? 'destructive'
                          : alert.status === 'Investigating'
                          ? 'default'
                          : 'secondary'
                      }>
                        {alert.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Icons.moreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>
              Current system status and health metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">CPU Usage</div>
                  <div className="text-sm text-muted-foreground">45%</div>
                </div>
                <div className="w-48 h-2 bg-muted rounded overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '45%' }} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Memory Usage</div>
                  <div className="text-sm text-muted-foreground">68%</div>
                </div>
                <div className="w-48 h-2 bg-muted rounded overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '68%' }} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Disk Usage</div>
                  <div className="text-sm text-muted-foreground">32%</div>
                </div>
                <div className="w-48 h-2 bg-muted rounded overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '32%' }} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Network Load</div>
                  <div className="text-sm text-muted-foreground">78%</div>
                </div>
                <div className="w-48 h-2 bg-muted rounded overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '78%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
