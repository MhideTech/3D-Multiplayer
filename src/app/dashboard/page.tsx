import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="text-white">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
    </ProtectedRoute>
  );
}
