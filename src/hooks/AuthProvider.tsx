import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthUser } from "./AuthContext";

const LOCAL_KEY = "auth_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  });

  const login = (u: AuthUser) => {
    setUser(u);
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(u.data.user));
    } catch {
      console.error("Failed to save auth user to localStorage");
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(LOCAL_KEY);
    } catch {
      console.error("Failed to remove auth user from localStorage");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
