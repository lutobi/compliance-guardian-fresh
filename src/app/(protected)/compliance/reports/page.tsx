import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports | Compliance Guardian",
  description: "Generate and view compliance reports",
};

export default function ReportsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Compliance Reports</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Report generation interface coming soon...</p>
      </div>
    </div>
  );
}
