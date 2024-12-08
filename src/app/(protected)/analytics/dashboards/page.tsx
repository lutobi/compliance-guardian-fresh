'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Icons } from '@/components/ui/icons'

export default function DashboardsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboards</h1>
          <p className="text-muted-foreground">
            Create and manage custom compliance dashboards.
          </p>
        </div>
        <Button>
          <Icons.plus className="mr-2 h-4 w-4" />
          New Dashboard
        </Button>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search dashboards..."
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Compliance Overview</CardTitle>
            <CardDescription>
              High-level compliance metrics and trends
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Last updated: 2 hours ago
            </div>
            <Button variant="outline" size="sm">
              View
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Metrics</CardTitle>
            <CardDescription>
              Security controls and vulnerability tracking
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Last updated: 1 day ago
            </div>
            <Button variant="outline" size="sm">
              View
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Progress</CardTitle>
            <CardDescription>
              Compliance tasks and completion rates
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Last updated: 3 hours ago
            </div>
            <Button variant="outline" size="sm">
              View
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Framework Compliance</CardTitle>
            <CardDescription>
              Compliance status across frameworks
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Last updated: 5 hours ago
            </div>
            <Button variant="outline" size="sm">
              View
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audit History</CardTitle>
            <CardDescription>
              Recent audit logs and findings
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Last updated: 12 hours ago
            </div>
            <Button variant="outline" size="sm">
              View
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>
              Team metrics and task completion
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Last updated: 1 day ago
            </div>
            <Button variant="outline" size="sm">
              View
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
