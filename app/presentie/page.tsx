"use client";
import {FC, useEffect, useRef, useState} from "react";
import './presentie.css';
import {AttendanceButton} from "@/components/presentie/AttendanceButton";
import {io} from "socket.io-client";

type AttendanceState = {
    [name: string] : boolean,
}

// TODO define events
const socket = io({
    path: '/api/websocket/presentie',
    addTrailingSlash: false,
});

const Attendance: FC = () => {
    const [attendance, setAttendance] = useState<AttendanceState>({});
    const newNameRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState();

    const buttons = [];

    for (const attendanceName in attendance) {
        const onClick = () => {
            socket.emit('togglePerson', attendanceName);
        };
        buttons.push(<AttendanceButton key={attendanceName} name={attendanceName} present={attendance[attendanceName]} onClick={onClick}/>);
    }

    useEffect(() => {
        socket.on('connect', () => console.log('WS Connected'));
        socket.on('disconnect', () => console.log('WS disconnected'));
        socket.on('pong', () => console.log('pong'));
        socket.on('error', (err) => {
            console.error(err);
            setError(err);
        });
        socket.on('attendanceUpdate', (newAttendance) => {
            console.log('Attendance update:', newAttendance);
            setAttendance(newAttendance);
            setError(undefined);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className={'section'}>
            {error}
            {buttons}
            <div>
                <input ref={newNameRef} placeholder={'Anders...'}/><button onClick={() => {
                socket.emit(
                    'addPerson',
                    newNameRef.current!.value
                );
                newNameRef.current!.value = '';
            }}>+</button>
            </div>
            <button onClick={() => socket.emit('newAttendance')}>Nieuwe Lijst</button>
        </div>
    );
};

export default Attendance;
