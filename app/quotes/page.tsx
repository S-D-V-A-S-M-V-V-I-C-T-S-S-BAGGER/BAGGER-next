"use server";
import {FC} from "react";
import "./quotes.css";
import LoginButton from "@/components/auth/LoginButton";
import QuoteList from "@/components/quotes/QuoteList";
import LogoutButton from "@/components/auth/LogoutButton";
import {hasSessionUser} from "@/lib/session";

const QuotePage: FC = async () => {
    const isAuthenticated = await hasSessionUser();

    if (isAuthenticated) {
        return (
            <div>
                <div className="auth">
                    <LogoutButton/>
                </div>
                <QuoteList/>
            </div>);
    } else {
        return <div className="loginPage"><LoginButton/></div>;
    }
};

export default QuotePage;
