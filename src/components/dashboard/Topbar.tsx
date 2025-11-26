"use client";

import { useAuth } from "@/contexts/AuthProvider";
import { User } from "@supabase/supabase-js";

export default function Topbar() {
  const { user } = useAuth();
  const typedUser = user as User | null;

  return (
    <div className="h-14 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6">
      <div className="text-lg font-medium">Dashboard</div>

      <div className="text-sm text-gray-300">
        {typedUser?.email ? `Logged in as ${typedUser.email}` : ""}
      </div>
    </div>
  );
}
