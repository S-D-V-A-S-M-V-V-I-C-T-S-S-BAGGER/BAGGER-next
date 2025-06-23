import { createContext } from "react";

export type AuthContextData = {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextData>({
  isAuthenticated: false,
  setAuthenticated: () => {},
});
