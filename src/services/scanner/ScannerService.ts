import { ScanTarget, ScanConfig, ScanResult, Vulnerability } from './types';
import axios from 'axios';

export class ScannerService {
  private scanners: Map<string, Scanner> = new Map();
  
  constructor(private apiKey: string, private baseUrl: string) {
    // Initialize different types of scanners
    this.scanners.set('web', new WebScanner(apiKey, baseUrl));
    this.scanners.set('network', new NetworkScanner(apiKey, baseUrl));
    this.scanners.set('system', new SystemScanner(apiKey, baseUrl));
    this.scanners.set('cloud', new CloudScanner(apiKey, baseUrl));
  }

  async startScan(target: ScanTarget, config: ScanConfig): Promise<string> {
    const scanner = this.scanners.get(target.type);
    if (!scanner) {
      throw new Error(`Unsupported scan type: ${target.type}`);
    }
    return await scanner.startScan(target, config);
  }

  async getScanStatus(scanId: string, type: string): Promise<ScanResult> {
    const scanner = this.scanners.get(type);
    if (!scanner) {
      throw new Error(`Unsupported scan type: ${type}`);
    }
    return await scanner.getScanStatus(scanId);
  }

  async stopScan(scanId: string, type: string): Promise<void> {
    const scanner = this.scanners.get(type);
    if (!scanner) {
      throw new Error(`Unsupported scan type: ${type}`);
    }
    await scanner.stopScan(scanId);
  }

  async getVulnerabilities(scanId: string, type: string): Promise<Vulnerability[]> {
    const scanner = this.scanners.get(type);
    if (!scanner) {
      throw new Error(`Unsupported scan type: ${type}`);
    }
    return await scanner.getVulnerabilities(scanId);
  }
}

abstract class Scanner {
  constructor(protected apiKey: string, protected baseUrl: string) {}

  protected async request<T>(endpoint: string, method: string, data?: any): Promise<T> {
    try {
      const response = await axios({
        method,
        url: `${this.baseUrl}${endpoint}`,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        data
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Scanner API error: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  abstract startScan(target: ScanTarget, config: ScanConfig): Promise<string>;
  abstract getScanStatus(scanId: string): Promise<ScanResult>;
  abstract stopScan(scanId: string): Promise<void>;
  abstract getVulnerabilities(scanId: string): Promise<Vulnerability[]>;
}

class WebScanner extends Scanner {
  async startScan(target: ScanTarget, config: ScanConfig): Promise<string> {
    const response = await this.request<{ scanId: string }>(
      '/web/scan',
      'POST',
      { target, config }
    );
    return response.scanId;
  }

  async getScanStatus(scanId: string): Promise<ScanResult> {
    return await this.request<ScanResult>(`/web/scan/${scanId}/status`, 'GET');
  }

  async stopScan(scanId: string): Promise<void> {
    await this.request<void>(`/web/scan/${scanId}/stop`, 'POST');
  }

  async getVulnerabilities(scanId: string): Promise<Vulnerability[]> {
    return await this.request<Vulnerability[]>(`/web/scan/${scanId}/vulnerabilities`, 'GET');
  }
}

class NetworkScanner extends Scanner {
  async startScan(target: ScanTarget, config: ScanConfig): Promise<string> {
    const response = await this.request<{ scanId: string }>(
      '/network/scan',
      'POST',
      { target, config }
    );
    return response.scanId;
  }

  async getScanStatus(scanId: string): Promise<ScanResult> {
    return await this.request<ScanResult>(`/network/scan/${scanId}/status`, 'GET');
  }

  async stopScan(scanId: string): Promise<void> {
    await this.request<void>(`/network/scan/${scanId}/stop`, 'POST');
  }

  async getVulnerabilities(scanId: string): Promise<Vulnerability[]> {
    return await this.request<Vulnerability[]>(`/network/scan/${scanId}/vulnerabilities`, 'GET');
  }
}

class SystemScanner extends Scanner {
  async startScan(target: ScanTarget, config: ScanConfig): Promise<string> {
    const response = await this.request<{ scanId: string }>(
      '/system/scan',
      'POST',
      { target, config }
    );
    return response.scanId;
  }

  async getScanStatus(scanId: string): Promise<ScanResult> {
    return await this.request<ScanResult>(`/system/scan/${scanId}/status`, 'GET');
  }

  async stopScan(scanId: string): Promise<void> {
    await this.request<void>(`/system/scan/${scanId}/stop`, 'POST');
  }

  async getVulnerabilities(scanId: string): Promise<Vulnerability[]> {
    return await this.request<Vulnerability[]>(`/system/scan/${scanId}/vulnerabilities`, 'GET');
  }
}

class CloudScanner extends Scanner {
  async startScan(target: ScanTarget, config: ScanConfig): Promise<string> {
    const response = await this.request<{ scanId: string }>(
      '/cloud/scan',
      'POST',
      { target, config }
    );
    return response.scanId;
  }

  async getScanStatus(scanId: string): Promise<ScanResult> {
    return await this.request<ScanResult>(`/cloud/scan/${scanId}/status`, 'GET');
  }

  async stopScan(scanId: string): Promise<void> {
    await this.request<void>(`/cloud/scan/${scanId}/stop`, 'POST');
  }

  async getVulnerabilities(scanId: string): Promise<Vulnerability[]> {
    return await this.request<Vulnerability[]>(`/cloud/scan/${scanId}/vulnerabilities`, 'GET');
  }
}
