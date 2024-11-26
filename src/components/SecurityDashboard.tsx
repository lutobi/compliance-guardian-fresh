import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Table } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { useSecurity } from '@/hooks/useSecurity'
import { timeAgo } from '@/utils/date'
import { AuditEventType } from '@/types/security'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { ErrorAlert } from '@/components/common/ErrorAlert'
import Link from 'next/link'
import { ShieldCheck, AlertTriangle, Scan } from 'react-feather'

export function SecurityAuditDashboard() {
  const [selectedEventType, setSelectedEventType] = useState<AuditEventType>()
  const {
    auditLogs,
    mfaStatus,
    rateLimits,
    isLoadingAuditLogs,
    isLoadingMFA,
    isLoadingRateLimits,
    enableMFA,
    disableMFA,
    resetRateLimit,
    pagination,
  } = useSecurity({
    eventType: selectedEventType,
    page: 1,
    limit: 10,
  })

  return (
    <div className="space-y-6">
      {/* MFA Section */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-medium">Multi-Factor Authentication</h3>
          <p className="text-sm text-gray-500 mt-1">
            Enable or disable two-factor authentication for your account
          </p>
          <div className="mt-4 flex items-center space-x-4">
            {isLoadingMFA ? (
              <LoadingSpinner />
            ) : (
              <>
                <Button
                  variant={mfaStatus?.data?.enabled ? 'destructive' : 'default'}
                  onClick={() => {
                    if (mfaStatus?.data?.enabled) {
                      disableMFA.mutate()
                    } else {
                      enableMFA.mutate()
                    }
                  }}
                  disabled={disableMFA.isPending || enableMFA.isPending}
                >
                  {mfaStatus?.data?.enabled ? 'Disable MFA' : 'Enable MFA'}
                </Button>
                <span className="text-sm">
                  {mfaStatus?.data?.enabled ? 'MFA is enabled' : 'MFA is disabled'}
                </span>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Rate Limits Section */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-medium">Rate Limits</h3>
          <p className="text-sm text-gray-500 mt-1">
            View and manage API rate limits
          </p>
          <div className="mt-4">
            {isLoadingRateLimits ? (
              <LoadingSpinner />
            ) : (
              <Table>
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Count</th>
                    <th>Last Reset</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rateLimits?.data?.map((limit: any) => (
                    <tr key={limit.key}>
                      <td>{limit.key}</td>
                      <td>{limit.count}</td>
                      <td>
                        {timeAgo(new Date(limit.last_reset))}
                      </td>
                      <td>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => resetRateLimit.mutate(limit.key)}
                          disabled={resetRateLimit.isPending}
                        >
                          Reset
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </Card>

      {/* Vulnerability Scanner Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/security/controls">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Controls</CardTitle>
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                0 controls implemented
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/security/vulnerabilities">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vulnerabilities</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                0 critical issues
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/security/scanner">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vulnerability Scanner</CardTitle>
              <Scan className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                Active scans in progress
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Audit Logs Section */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-medium">Audit Logs</h3>
          <p className="text-sm text-gray-500 mt-1">
            View security events and user activities
          </p>
          <div className="mt-4">
            <div className="mb-4">
              <Select
                value={selectedEventType}
                onChange={(e) => setSelectedEventType(e.target.value as AuditEventType)}
                className="w-full max-w-xs"
              >
                <option value="">All Events</option>
                <option value="LOGIN">Login</option>
                <option value="LOGOUT">Logout</option>
                <option value="MFA_ENABLE">MFA Enable</option>
                <option value="MFA_DISABLE">MFA Disable</option>
                <option value="SECURITY_ALERT">Security Alert</option>
                <option value="API_ACCESS">API Access</option>
              </Select>
            </div>

            {isLoadingAuditLogs ? (
              <LoadingSpinner />
            ) : (
              <>
                <Table>
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>User</th>
                      <th>IP Address</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs?.data?.map((log: any) => (
                      <tr key={log.id}>
                        <td>{log.event_type}</td>
                        <td>{log.user_id}</td>
                        <td>{log.ip_address}</td>
                        <td>
                          {timeAgo(new Date(log.created_at))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => pagination.onPageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                    >
                      Previous
                    </Button>
                    <span className="text-sm">Page {pagination.page}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => pagination.onPageChange(pagination.page + 1)}
                      disabled={!auditLogs?.data?.length}
                    >
                      Next
                    </Button>
                  </div>
                  <Select
                    value={pagination.limit.toString()}
                    onChange={(e) =>
                      pagination.onLimitChange(parseInt(e.target.value, 10))
                    }
                    className="w-[100px]"
                  >
                    <option value="10">10 / page</option>
                    <option value="25">25 / page</option>
                    <option value="50">50 / page</option>
                  </Select>
                </div>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
