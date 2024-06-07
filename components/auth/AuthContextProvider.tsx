"use client";
import {FC, PropsWithChildren} from "react";
import {AuthContext, AuthContextData} from "@/components/auth/AuthContext";

type AuthContextProviderProps = {
    authContextData: AuthContextData;
}

const AuthContextProvider: FC<PropsWithChildren<AuthContextProviderProps>> = ({authContextData, children}) => {
    return (<AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>);
};

export default AuthContextProvider;
