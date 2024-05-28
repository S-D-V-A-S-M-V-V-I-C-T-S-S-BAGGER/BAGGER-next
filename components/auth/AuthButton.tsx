"use client";
import {FC, useContext} from "react";
import '@/styling/baggerButton.css';
import {deleteSession} from "@/lib/session";
import {AuthContext} from "@/components/auth/AuthContext";
import LoginButton from "@/components/auth/LoginButton";

const AuthButton: FC = () => {
    const authContextData = useContext(AuthContext);

    if (!authContextData?.isAuthenticated) {
        return <LoginButton/>;
    } else {
        return (
            <button
                className='baggerButton'
                onClick={() => deleteSession()}
            >Logout</button>
        );
    }
};

export default AuthButton;
