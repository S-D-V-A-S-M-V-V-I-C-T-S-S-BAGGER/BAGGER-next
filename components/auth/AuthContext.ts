import {createContext} from "react";

export type AuthContextData = {
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextData>({isAuthenticated: false});
