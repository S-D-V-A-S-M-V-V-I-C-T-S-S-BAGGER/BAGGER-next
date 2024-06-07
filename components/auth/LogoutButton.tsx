"use client";
import {FC} from "react";
import '@/styling/baggerButton.css';
import {deleteSession} from "@/lib/session";

const LogoutButton: FC = () => {
    return (
        <button
            className='baggerButton'
            onClick={() => deleteSession()}
        >Logout</button>
    );
};

export default LogoutButton;
