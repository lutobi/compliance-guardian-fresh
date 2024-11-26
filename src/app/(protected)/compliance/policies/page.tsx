import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policies | Compliance Guardian",
  description: "Manage compliance policies and guidelines",
};

export default function PoliciesPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Compliance Policies</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Policy management interface coming soon...</p>
      </div>
    </div>
  );
}
