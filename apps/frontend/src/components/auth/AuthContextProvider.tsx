import { FC, PropsWithChildren, useEffect, useState } from "react";
import { AuthContext, AuthContextData } from "./AuthContext.ts";

const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string>();

  const context: AuthContextData = {
    isAuthenticated: isAuthenticated,
    userName: userName,
    setAuthenticated: setAuthenticated,
  };

  useEffect(() => {
    const splitCookies = document.cookie.split(";");
    let authenticated = false;
    let userName = undefined;
    for (const cookie of splitCookies) {
      if (cookie.trim().startsWith("isAuthenticated=")) {
        userName = cookie.trim().substring("isAuthenticated=".length);
        authenticated = true;
        break;
      }
    }
    setAuthenticated(authenticated);
    setUserName(userName);
  }, []);

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
