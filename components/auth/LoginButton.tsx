"use client";
import {FC, useEffect, useState} from "react";
import {getAuthorizationUrl} from "@/lib/GoogleAuth";
import {usePathname, useRouter} from "next/navigation";
import '@/styling/baggerButton.css';

const LoginButton: FC = () => {
    const [url, setUrl] = useState<string>();

    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        getAuthorizationUrl(pathname).then(setUrl);
    }, []);

    return (
        <button
            className='baggerButton'
            onClick={() => { if (url !== undefined) router.push(url); }}
        >Login</button>
    );
};

export default LoginButton;
