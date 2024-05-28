"use client";
import {FC} from "react";
import '@/styling/baggerButton.css';
import {deleteSession} from "@/lib/session";

export const DeAuthButton: FC = () => {
    return (
        <button
            className='baggerButton'
            onClick={() => deleteSession()}
        >Logout</button>
    );
};
