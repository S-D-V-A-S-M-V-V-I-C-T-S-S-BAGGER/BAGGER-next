"use client";
import {FC, useEffect, useState} from "react";
import {getAuthorizationUrl} from "@/lib/GoogleAuth";

export const AuthButton: FC = () => {
    const [url, setUrl] = useState<string>();

    useEffect(() => {
        getAuthorizationUrl().then(setUrl);
    }, []);

    return (
        <a href={url}>Test</a>
    );
};
