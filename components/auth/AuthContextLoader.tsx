"use server";
import {FC, PropsWithChildren} from "react";
import {AuthContextData} from "@/components/auth/AuthContext";
import AuthContextProvider from "@/components/auth/AuthContextProvider";
import {hasSessionUser} from "@/lib/session";

const AuthContextLoader: FC<PropsWithChildren> = async ({children}) => {
    const authContextData: AuthContextData = {
        isAuthenticated: await hasSessionUser(),
    };

    return (<AuthContextProvider authContextData={authContextData}>{children}</AuthContextProvider>);
};

export default AuthContextLoader;
