import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audit Logs | Compliance Guardian",
  description: "View and analyze compliance audit logs",
};

export default function AuditLogsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Audit Logs</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Audit logs interface coming soon...</p>
      </div>
    </div>
  );
}
