"use client";
import {FC, useEffect, useState} from "react";
import {getAuthorizationUrl} from "@/lib/GoogleAuth";
import {usePathname} from "next/navigation";

export const AuthButton: FC = () => {
    const [url, setUrl] = useState<string>();

    const pathname = usePathname();

    useEffect(() => {
        getAuthorizationUrl(pathname).then(setUrl);
    }, []);

    return (
        <a href={url}>Login</a>
    );
};
