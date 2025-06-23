import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext.ts";
import QuoteList from "./QuoteList.tsx";
import LoginButton from "../auth/LoginButton.tsx";
import "./quotes.css";
import LogoutButton from "../auth/LogoutButton.tsx";

const QuotePage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return (
      <div>
        <div className="auth">
          <LogoutButton />
        </div>
        <QuoteList />
      </div>
    );
  } else {
    return (
      <div className="loginPage">
        <LoginButton />
      </div>
    );
  }
};

export default QuotePage;
