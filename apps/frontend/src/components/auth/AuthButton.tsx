import { FC, useContext } from "react";
import { AuthContext } from "./AuthContext.ts";
import LogoutButton from "./LogoutButton.tsx";
import LoginButton from "./LoginButton.tsx";

const AuthButton: FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <LogoutButton />;
  } else {
    return <LoginButton />;
  }
};

export default AuthButton;
