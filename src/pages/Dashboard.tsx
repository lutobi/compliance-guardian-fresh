import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheckIcon,
  DocumentSearchIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentCheckIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

const DashboardCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  stats?: { label: string; value: string | number }[];
}> = ({ title, description, icon, to, stats }) => (
  <Link
    to={to}
    className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
  >
    <div className="flex items-center">
      <div className="flex-shrink-0">{icon}</div>
      <div className="ml-5">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </div>
    {stats && (
      <div className="mt-4 grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="border-t pt-4">
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>
    )}
  </Link>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Compliance Frameworks Card */}
          <DashboardCard
            title="Compliance Frameworks"
            description="Manage and track compliance across multiple frameworks"
            icon={<ClipboardDocumentCheckIcon className="h-8 w-8 text-blue-600" />}
            to="/frameworks"
            stats={[
              { label: 'Active Frameworks', value: 7 },
              { label: 'Completion Rate', value: '76%' }
            ]}
          />

          {/* Vulnerability Scanner Card */}
          <DashboardCard
            title="Vulnerability Scanner"
            description="Scan and identify security vulnerabilities"
            icon={<ShieldCheckIcon className="h-8 w-8 text-green-600" />}
            to="/scanner"
            stats={[
              { label: 'Active Scans', value: 2 },
              { label: 'Issues Found', value: 14 }
            ]}
          />

          {/* Risk Assessment Card */}
          <DashboardCard
            title="Risk Assessment"
            description="Evaluate and manage security risks"
            icon={<ExclamationTriangleIcon className="h-8 w-8 text-yellow-600" />}
            to="/risks"
            stats={[
              { label: 'Critical Risks', value: 3 },
              { label: 'Risk Score', value: '82/100' }
            ]}
          />

          {/* Compliance Reports Card */}
          <DashboardCard
            title="Compliance Reports"
            description="Generate and view compliance reports"
            icon={<DocumentSearchIcon className="h-8 w-8 text-purple-600" />}
            to="/reports"
            stats={[
              { label: 'Reports Generated', value: 12 },
              { label: 'Last Updated', value: 'Today' }
            ]}
          />

          {/* Analytics Card */}
          <DashboardCard
            title="Analytics"
            description="Track compliance and security metrics"
            icon={<ChartBarIcon className="h-8 w-8 text-indigo-600" />}
            to="/analytics"
            stats={[
              { label: 'Compliance Score', value: '87%' },
              { label: 'Trend', value: '+5%' }
            ]}
          />

          {/* Improvement Tracking Card */}
          <DashboardCard
            title="Improvement Tracking"
            description="Monitor and track security improvements"
            icon={<ArrowTrendingUpIcon className="h-8 w-8 text-red-600" />}
            to="/improvements"
            stats={[
              { label: 'Open Items', value: 8 },
              { label: 'Completed', value: 45 }
            ]}
          />
        </div>
      </div>
    </div>
  );
};
