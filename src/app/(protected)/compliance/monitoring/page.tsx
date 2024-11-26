'use client';

import { useState } from 'react';
import { ComplianceMonitoringDashboard } from '@/components/compliance/ComplianceMonitoringDashboard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ComplianceMonitoringService } from '@/services/compliance/ComplianceMonitoringService';

const frameworks = [
  { id: 'iso27001', name: 'ISO 27001' },
  { id: 'soc2', name: 'SOC 2' },
  { id: 'pci-dss', name: 'PCI DSS' },
  { id: 'hipaa', name: 'HIPAA' },
];

export default function ComplianceMonitoringPage() {
  const [selectedFramework, setSelectedFramework] = useState(frameworks[0].id);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [generating, setGenerating] = useState(false);

  const monitoringService = ComplianceMonitoringService.getInstance();

  const handleGenerateReport = async () => {
    try {
      setGenerating(true);
      const report = await monitoringService.generateComplianceReport(
        selectedFramework,
        startDate,
        endDate
      );

      // Create a download link for the report
      const url = window.URL.createObjectURL(report);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `compliance-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Failed to generate report:', error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Compliance Monitoring</h1>
        <div className="flex items-center gap-4">
          <Select
            value={selectedFramework}
            onValueChange={setSelectedFramework}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectContent>
              {frameworks.map((framework) => (
                <SelectItem key={framework.id} value={framework.id}>
                  {framework.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={handleGenerateReport}
            disabled={generating}
          >
            {generating ? 'Generating...' : 'Generate Report'}
          </Button>
        </div>
      </div>

      {/* Main Dashboard */}
      <ComplianceMonitoringDashboard frameworkId={selectedFramework} />

      {/* Date Range Selector */}
      <Card className="p-4">
        <div className="flex gap-8">
          <div>
            <h3 className="text-sm font-medium mb-2">Start Date</h3>
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={(date) => date && setStartDate(date)}
              className="rounded-md border"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">End Date</h3>
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={(date) => date && setEndDate(date)}
              className="rounded-md border"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
