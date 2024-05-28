"use client";
import {FC, useContext} from "react";
import '@/styling/baggerButton.css';
import {AuthContext} from "@/components/auth/AuthContext";
import LoginButton from "@/components/auth/LoginButton";
import LogoutButton from "@/components/auth/LogoutButton";

const AuthButton: FC = () => {
    const authContextData = useContext(AuthContext);

    if (!authContextData?.isAuthenticated) {
        return <LoginButton/>;
    } else {
        return <LogoutButton/>;
    }
};

export default AuthButton;
