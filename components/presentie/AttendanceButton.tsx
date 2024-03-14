"use client";
import {FC} from "react";
import '@/app/presentie/presentie.css';

type AttendanceButtonProps = {
    name: string,
    present: boolean,
    onClick: () => void;
}

export const AttendanceButton: FC<AttendanceButtonProps> = ({name, present, onClick}) => {
    const className = 'presentieButton ' + (present ? 'present' : 'absent');
    return (
        <button onClick={onClick} className={className}>{name}</button>
    );
};
