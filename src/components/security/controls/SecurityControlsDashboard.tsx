'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ShieldCheckIcon, 
  ClipboardDocumentCheckIcon, 
  ChartBarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

export function SecurityControlsDashboard() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="controls">Controls</TabsTrigger>
        <TabsTrigger value="compliance">Compliance</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Controls</CardTitle>
              <ShieldCheckIcon className="h-4 w-4 text-text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-text-secondary">Across all frameworks</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Implementation Rate</CardTitle>
              <ChartBarIcon className="h-4 w-4 text-text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-text-secondary">+5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Controls</CardTitle>
              <ExclamationTriangleIcon className="h-4 w-4 text-text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-text-secondary">92% implemented</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
              <ClipboardDocumentCheckIcon className="h-4 w-4 text-text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-text-secondary">Target: 95%</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Control Implementation Status</CardTitle>
              <CardDescription>Progress across security domains</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add ControlStatusChart component here */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Updates</CardTitle>
              <CardDescription>Latest control implementations and changes</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add ControlUpdatesList component here */}
              <Button className="w-full mt-4">View All Updates</Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="controls" className="space-y-4">
        {/* Add SecurityControlsList component here */}
      </TabsContent>

      <TabsContent value="compliance" className="space-y-4">
        {/* Add ComplianceReports component here */}
      </TabsContent>
    </Tabs>
  )
}
