import { FC, useContext } from "react";
import "../../styling/baggerButton.css";
import { AuthContext } from "./AuthContext.ts";

const LogoutButton: FC = () => {
  const { setAuthenticated } = useContext(AuthContext);
  const deleteSession = () => {
    document.cookie = "isAuthenticated=;Max-Age=0";
    setAuthenticated(false);
  };
  return (
    <button className="baggerButton" onClick={() => deleteSession()}>
      Logout
    </button>
  );
};

export default LogoutButton;
