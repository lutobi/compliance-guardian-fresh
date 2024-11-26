'use client';

import { useEffect, useState } from 'react';
import { 
  ComplianceFramework, 
  ComplianceAlert, 
  ComplianceMetric 
} from '@/types/compliance';
import { ComplianceMonitoringService } from '@/services/compliance/ComplianceMonitoringService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ComplianceMonitoringDashboardProps {
  frameworkId: string;
}

export function ComplianceMonitoringDashboard({ frameworkId }: ComplianceMonitoringDashboardProps) {
  const [framework, setFramework] = useState<ComplianceFramework | null>(null);
  const [alerts, setAlerts] = useState<ComplianceAlert[]>([]);
  const [metrics, setMetrics] = useState<ComplianceMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const monitoringService = ComplianceMonitoringService.getInstance();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [frameworkData, alertsData, metricsData] = await Promise.all([
          monitoringService.getFrameworkStatus(frameworkId),
          monitoringService.getActiveAlerts(),
          monitoringService.getComplianceMetrics(frameworkId),
        ]);

        setFramework(frameworkData);
        setAlerts(alertsData);
        setMetrics(metricsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [frameworkId]);

  if (loading) {
    return <div>Loading compliance data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!framework) {
    return <div>No framework data available</div>;
  }

  return (
    <div className="space-y-6">
      {/* Framework Overview */}
      <Card>
        <CardHeader>
          <CardTitle>{framework.name} Compliance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Overall Compliance</span>
                <span>{framework.completionPercentage}%</span>
              </div>
              <Progress value={framework.completionPercentage} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Status</div>
                <div className="text-2xl font-bold">{framework.overallStatus}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Requirements</div>
                <div className="text-2xl font-bold">{framework.requirements.length}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Last Updated</div>
                <div className="text-2xl font-bold">
                  {format(new Date(framework.lastUpdated), 'MMM d, yyyy')}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.length === 0 ? (
              <div className="text-muted-foreground">No active alerts</div>
            ) : (
              alerts.map((alert) => (
                <Alert 
                  key={alert.id}
                  variant={alert.severity === 'high' ? 'destructive' : 'default'}
                >
                  <AlertTitle>{alert.type}</AlertTitle>
                  <AlertDescription>
                    {alert.message}
                    <div className="mt-2 text-xs text-muted-foreground">
                      {format(new Date(alert.timestamp), 'MMM d, yyyy h:mm a')}
                    </div>
                  </AlertDescription>
                </Alert>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
