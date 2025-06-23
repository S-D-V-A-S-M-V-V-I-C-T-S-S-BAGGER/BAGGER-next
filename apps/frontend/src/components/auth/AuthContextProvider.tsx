import { FC, PropsWithChildren, useEffect, useState } from "react";
import { AuthContext, AuthContextData } from "./AuthContext.ts";

const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const context: AuthContextData = {
    isAuthenticated: isAuthenticated,
    setAuthenticated: setAuthenticated,
  };

  useEffect(() => {
    const splitCookies = document.cookie.split(";");
    let authenticated = false;
    for (const cookie of splitCookies) {
      if (cookie.trim() === "isAuthenticated=true") {
        authenticated = true;
        break;
      }
    }
    setAuthenticated(authenticated);
  }, []);

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
