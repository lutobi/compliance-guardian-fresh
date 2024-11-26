import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | Compliance Guardian",
  description: "Configure compliance monitoring settings",
};

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Compliance Settings</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Settings configuration interface coming soon...</p>
      </div>
    </div>
  );
}
