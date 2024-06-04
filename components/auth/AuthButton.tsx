"use server";
import {FC} from "react";
import '@/styling/baggerButton.css';
import LoginButton from "@/components/auth/LoginButton";
import LogoutButton from "@/components/auth/LogoutButton";
import {hasSessionUser} from "@/lib/session";

const AuthButton: FC = async () => {
    if (await hasSessionUser()) {
        return <LogoutButton/>;
    } else {
        return <LoginButton/>;
    }
};

export default AuthButton;
