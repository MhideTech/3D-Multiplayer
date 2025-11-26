import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4 text-white">
          Welcome to your Dashboard
        </h1>

        <div className="mt-6">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Enter Shared 3D World
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
