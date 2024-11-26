import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks | Compliance Guardian",
  description: "Manage and track compliance-related tasks",
};

export default function TasksPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Compliance Tasks</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Task management interface coming soon...</p>
      </div>
    </div>
  );
}
