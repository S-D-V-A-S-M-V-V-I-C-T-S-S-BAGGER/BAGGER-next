"use server";
import {FC} from "react";
import "./quotes.css";
import {hasSessionUser} from "@/lib/session";
import LoginButton from "@/components/auth/LoginButton";
import QuoteList from "@/components/quotes/QuoteList";

const QuotePage: FC = async () => {
    const isAuthenticated = await hasSessionUser();

    if (isAuthenticated) {
        return <QuoteList/>;
    } else {
        return <div className="loginPage"><LoginButton/></div>;
    }
};

export default QuotePage;
