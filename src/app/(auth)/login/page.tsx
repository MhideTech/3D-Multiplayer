"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";

export default function LoginPage() {
  const { signInWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await signInWithEmail(email, pass);
    console.log("Login:", res);
  }

  return (
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

        <a
          href="/signup"
          className="block text-center mt-4 text-indigo-600 underline"
        >
          Create an account
        </a>
      </form>
    </div>
  );
}
