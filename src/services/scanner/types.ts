export interface ScanTarget {
  id: string;
  name: string;
  type: 'web' | 'network' | 'system' | 'cloud';
  target: string; // URL, IP, hostname, or cloud resource identifier
  scope?: string[];
  excludes?: string[];
}

export interface ScanConfig {
  id: string;
  targetId: string;
  scanType: 'full' | 'quick' | 'custom';
  modules: string[];
  schedule?: {
    frequency: 'once' | 'daily' | 'weekly' | 'monthly';
    startTime: string;
    endTime?: string;
  };
  options: {
    intensity: 'low' | 'medium' | 'high';
    concurrent: number;
    timeout: number;
    followRedirects: boolean;
    authentication?: {
      type: 'basic' | 'bearer' | 'oauth2';
      credentials: Record<string, string>;
    };
  };
}

export interface Vulnerability {
  id: string;
  scanId: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  cvss?: number;
  cve?: string[];
  affected: string;
  evidence: string;
  remediation: string;
  references: string[];
  timestamp: string;
}

export interface ScanResult {
  id: string;
  targetId: string;
  configId: string;
  status: 'running' | 'completed' | 'failed' | 'stopped';
  startTime: string;
  endTime?: string;
  progress: number;
  stats: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
  vulnerabilities: Vulnerability[];
  error?: string;
}
