import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthUser } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (u: AuthUser) => setUser(u);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
