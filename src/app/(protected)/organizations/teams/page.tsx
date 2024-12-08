'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'

export default function TeamsPage() {
  const [teams] = useState([
    {
      id: 1,
      name: 'Security Team',
      members: 5,
      lead: 'John Doe',
      created: '2023-12-01',
    },
    {
      id: 2,
      name: 'Compliance Team',
      members: 3,
      lead: 'Jane Smith',
      created: '2023-12-02',
    },
    {
      id: 3,
      name: 'IT Operations',
      members: 8,
      lead: 'Mike Johnson',
      created: '2023-12-03',
    },
  ])

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Teams</h1>
          <p className="text-muted-foreground">
            Manage your organization's teams and their members.
          </p>
        </div>
        <Button>
          <Icons.userPlus className="mr-2 h-4 w-4" />
          Add Team
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Teams</CardTitle>
          <CardDescription>
            A list of all teams in your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Team Lead</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((team) => (
                <TableRow key={team.id}>
                  <TableCell className="font-medium">{team.name}</TableCell>
                  <TableCell>{team.members}</TableCell>
                  <TableCell>{team.lead}</TableCell>
                  <TableCell>{team.created}</TableCell>
                  <TableCell className="text-right">
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
    </div>
  )
}
