import { createContext } from "react";

export interface AuthUser {
  id: string;
  fullName?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
}
export type AuthContextType = {
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  login: (user: AuthUser) => void;
  logout: () => void;
};

const noop = () => {};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: (() => {}) as React.Dispatch<React.SetStateAction<AuthUser | null>>,
  login: noop,
  logout: noop,
});
