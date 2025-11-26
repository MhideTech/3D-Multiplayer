"use client";
import { useAuth } from "@/contexts/AuthProvider";

export default function LogoutButton() {
  const { signOut } = useAuth();

  return (
    <button
      onClick={() => signOut()}
      className="px-3 py-2 bg-red-600 text-white rounded"
    >
      Logout
    </button>
  );
}
