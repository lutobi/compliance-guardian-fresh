import React, { useState } from 'react';
import { ScanTarget, ScanConfig } from '../../services/scanner/types';

interface NewScanFormProps {
  onSubmit: (target: ScanTarget, config: ScanConfig) => void;
  onCancel: () => void;
}

export const NewScanForm: React.FC<NewScanFormProps> = ({ onSubmit, onCancel }) => {
  const [target, setTarget] = useState<ScanTarget>({
    id: crypto.randomUUID(),
    name: '',
    type: 'web',
    target: '',
    scope: [],
    excludes: []
  });

  const [config, setConfig] = useState<ScanConfig>({
    id: crypto.randomUUID(),
    targetId: target.id,
    scanType: 'full',
    modules: [],
    options: {
      intensity: 'medium',
      concurrent: 5,
      timeout: 30000,
      followRedirects: true
    }
  });

  const [scope, setScope] = useState('');
  const [excludes, setExcludes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTarget = {
      ...target,
      scope: scope.split('\n').filter(Boolean),
      excludes: excludes.split('\n').filter(Boolean)
    };
    onSubmit(finalTarget, config);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Configure New Scan</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Target Configuration */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Target Configuration</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Target Name</label>
            <input
              type="text"
              value={target.name}
              onChange={(e) => setTarget({ ...target, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Target Type</label>
            <select
              value={target.type}
              onChange={(e) => setTarget({ ...target, type: e.target.value as any })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="web">Web Application</option>
              <option value="network">Network</option>
              <option value="system">System</option>
              <option value="cloud">Cloud Infrastructure</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Target URL/IP</label>
            <input
              type="text"
              value={target.target}
              onChange={(e) => setTarget({ ...target, target: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Scope (one per line)
            </label>
            <textarea
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              placeholder="/api/*&#10;/admin/*"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Excludes (one per line)
            </label>
            <textarea
              value={excludes}
              onChange={(e) => setExcludes(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              placeholder="/api/health&#10;/static/*"
            />
          </div>
        </div>

        {/* Scan Configuration */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Scan Configuration</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700">Scan Type</label>
            <select
              value={config.scanType}
              onChange={(e) => setConfig({ ...config, scanType: e.target.value as any })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="quick">Quick Scan</option>
              <option value="full">Full Scan</option>
              <option value="custom">Custom Scan</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Scan Intensity</label>
            <select
              value={config.options.intensity}
              onChange={(e) => setConfig({
                ...config,
                options: { ...config.options, intensity: e.target.value as any }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Concurrent Requests
            </label>
            <input
              type="number"
              value={config.options.concurrent}
              onChange={(e) => setConfig({
                ...config,
                options: { ...config.options, concurrent: parseInt(e.target.value) }
              })}
              min="1"
              max="10"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={config.options.followRedirects}
              onChange={(e) => setConfig({
                ...config,
                options: { ...config.options, followRedirects: e.target.checked }
              })}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label className="ml-2 block text-sm text-gray-700">
              Follow Redirects
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Start Scan
          </button>
        </div>
      </form>
    </div>
  );
};
