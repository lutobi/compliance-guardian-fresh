'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Icons } from '@/components/ui/icons'
import { Switch } from '@/components/ui/switch'

export default function APISettingsPage() {
  const apiKeys = [
    {
      id: 1,
      name: 'Production API Key',
      key: '•••• •••• •••• 1234',
      created: '2023-12-01',
      lastUsed: '2 minutes ago',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Development API Key',
      key: '•••• •••• •••• 5678',
      created: '2023-12-02',
      lastUsed: '1 day ago',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Test API Key',
      key: '•••• •••• •••• 9012',
      created: '2023-12-03',
      lastUsed: '1 week ago',
      status: 'Inactive',
    },
  ]

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">API Settings</h1>
        <p className="text-muted-foreground">
          Manage your API keys and access settings.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>
              View and manage your API keys
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Button>
                <Icons.plus className="mr-2 h-4 w-4" />
                Generate New API Key
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>API Key</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((key) => (
                  <TableRow key={key.id}>
                    <TableCell className="font-medium">{key.name}</TableCell>
                    <TableCell>
                      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                        {key.key}
                      </code>
                    </TableCell>
                    <TableCell>{key.created}</TableCell>
                    <TableCell>{key.lastUsed}</TableCell>
                    <TableCell>
                      <Badge
                        variant={key.status === 'Active' ? 'default' : 'secondary'}
                      >
                        {key.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="sm">
                        <Icons.copy className="h-4 w-4" />
                        <span className="sr-only">Copy</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Icons.trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Access Settings</CardTitle>
            <CardDescription>
              Configure API access and security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Rate Limiting</Label>
                <p className="text-sm text-muted-foreground">
                  Limit the number of API requests per minute
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  className="w-20"
                  defaultValue="60"
                />
                <span className="text-sm text-muted-foreground">requests/min</span>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>IP Whitelist</Label>
                <p className="text-sm text-muted-foreground">
                  Restrict API access to specific IP addresses
                </p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>API Usage Logs</Label>
                <p className="text-sm text-muted-foreground">
                  Track and monitor API usage
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Documentation</CardTitle>
            <CardDescription>
              Access API documentation and resources
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>API Reference</Label>
                <p className="text-sm text-muted-foreground">
                  View detailed API documentation
                </p>
              </div>
              <Button variant="outline">View Docs</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Postman Collection</Label>
                <p className="text-sm text-muted-foreground">
                  Download Postman collection for testing
                </p>
              </div>
              <Button variant="outline">Download</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SDK Examples</Label>
                <p className="text-sm text-muted-foreground">
                  View example code for different languages
                </p>
              </div>
              <Button variant="outline">View Examples</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
