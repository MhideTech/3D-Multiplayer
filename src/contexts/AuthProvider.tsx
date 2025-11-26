"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Session, User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  signInWithEmail: (email: string, password: string) => Promise<unknown>;
  signUpWithEmail: (email: string, password: string) => Promise<unknown>;
  signOut: () => Promise<unknown>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, sess) => {
        setSession(sess ?? null);
        setUser(sess?.user ?? null);
      }
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  async function signInWithEmail(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password });
  }
  async function signUpWithEmail(email: string, password: string) {
    return supabase.auth.signUp({ email, password });
  }
  async function signOut() {
    return supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider
      value={{ user, session, signInWithEmail, signUpWithEmail, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
