"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { useRouter } from "next/navigation";
import PublicOnlyRoute from "@/components/PublicOnlyRoute";

export default function LoginPage() {
  const { signInWithEmail, signUpWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin"); // Added mode state

  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "signin") {
      const { error } = await signInWithEmail(email, pass); // Removed redundant declaration
      if (!error) router.push("/dashboard"); // Simplified conditional
    } else {
      const { error } = await signUpWithEmail(email, pass);
      if (!error) router.push("/dashboard");
    }
  }

  return (
    <PublicOnlyRoute>
      <div className="min-h-screen flex items-center justify-center">
        <form
          onSubmit={submit}
          className="p-6 bg-white rounded shadow w-full max-w-sm"
        >
          <h2 className="text-lg mb-4 text-black">Sign In</h2>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="w-full mb-2 p-2 border rounded text-black"
          />

          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="password"
            type="password"
            className="w-full mb-4 p-2 border rounded text-black"
          />

          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded w-full"
            type="submit"
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="block text-center mt-4 text-indigo-600 underline"
          >
            {mode === "signin"
              ? "Create an account"
              : "Already have an account?"}
          </button>
        </form>
      </div>
    </PublicOnlyRoute>
  );
}
