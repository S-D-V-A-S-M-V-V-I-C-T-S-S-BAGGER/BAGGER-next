import { createContext } from "react";

export type AuthContextData = {
  isAuthenticated: boolean;
  userName: string | undefined;
  setAuthenticated: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextData>({
  isAuthenticated: false,
  userName: undefined,
  setAuthenticated: () => {},
});
