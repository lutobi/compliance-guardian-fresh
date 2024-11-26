import React, { useState, useEffect } from 'react';
import { ScannerService } from '../../services/scanner/ScannerService';
import { ScanTarget, ScanConfig, ScanResult, Vulnerability } from '../../services/scanner/types';
import { ChartPieIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface ScannerComponentProps {
  apiKey: string;
  baseUrl: string;
}

export const ScannerComponent: React.FC<ScannerComponentProps> = ({ apiKey, baseUrl }) => {
  const [scannerService] = useState(() => new ScannerService(apiKey, baseUrl));
  const [activeScans, setActiveScans] = useState<Map<string, ScanResult>>(new Map());
  const [selectedScan, setSelectedScan] = useState<string | null>(null);
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);

  const startNewScan = async (target: ScanTarget, config: ScanConfig) => {
    try {
      const scanId = await scannerService.startScan(target, config);
      const initialStatus: ScanResult = {
        id: scanId,
        targetId: target.id,
        configId: config.id,
        status: 'running',
        startTime: new Date().toISOString(),
        progress: 0,
        stats: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        vulnerabilities: []
      };
      setActiveScans(prev => new Map(prev).set(scanId, initialStatus));
    } catch (error) {
      console.error('Failed to start scan:', error);
    }
  };

  const updateScanStatus = async (scanId: string, type: string) => {
    try {
      const status = await scannerService.getScanStatus(scanId, type);
      setActiveScans(prev => new Map(prev).set(scanId, status));
      
      if (status.status === 'completed') {
        const vulns = await scannerService.getVulnerabilities(scanId, type);
        if (selectedScan === scanId) {
          setVulnerabilities(vulns);
        }
      }
    } catch (error) {
      console.error('Failed to update scan status:', error);
    }
  };

  const stopScan = async (scanId: string, type: string) => {
    try {
      await scannerService.stopScan(scanId, type);
      updateScanStatus(scanId, type);
    } catch (error) {
      console.error('Failed to stop scan:', error);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Scans */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Active Scans</h2>
          <div className="space-y-4">
            {Array.from(activeScans.values()).map((scan) => (
              <div
                key={scan.id}
                className={`p-4 border rounded-lg ${
                  selectedScan === scan.id ? 'border-blue-500' : 'border-gray-200'
                } cursor-pointer`}
                onClick={() => setSelectedScan(scan.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {scan.status === 'running' ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent" />
                    ) : scan.status === 'completed' ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    ) : (
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                    )}
                    <span className="font-medium">Scan #{scan.id}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {scan.progress}% Complete
                  </span>
                </div>
                
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 rounded-full h-2"
                      style={{ width: `${scan.progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 flex justify-between items-center">
                  <div className="flex space-x-4">
                    <span className="text-red-600">{scan.stats.critical} Critical</span>
                    <span className="text-orange-500">{scan.stats.high} High</span>
                    <span className="text-yellow-500">{scan.stats.medium} Medium</span>
                  </div>
                  {scan.status === 'running' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        stopScan(scan.id, 'web'); // Replace with actual scan type
                      }}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      Stop Scan
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vulnerability Details */}
        {selectedScan && (
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Vulnerabilities</h2>
            <div className="space-y-4">
              {vulnerabilities.map((vuln) => (
                <div key={vuln.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium ${getSeverityColor(vuln.severity)}`}>
                      {vuln.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(vuln.severity)} bg-opacity-10`}>
                      {vuln.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{vuln.description}</p>
                  {vuln.cvss && (
                    <div className="mt-2 text-sm">
                      <span className="font-medium">CVSS Score:</span> {vuln.cvss}
                    </div>
                  )}
                  <div className="mt-3">
                    <h4 className="font-medium text-sm">Remediation</h4>
                    <p className="text-sm text-gray-600 mt-1">{vuln.remediation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
