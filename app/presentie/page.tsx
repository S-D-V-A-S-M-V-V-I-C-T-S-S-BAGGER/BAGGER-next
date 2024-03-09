"use client";
import {FC, useEffect, useRef} from "react";
import './presentie.css';
import {useLocalStorage} from "@/lib/useLocalStorage";
import dayjs from "dayjs";
import {AttendanceButton} from "@/components/presentie/AttendanceButton";
import {getActieveLeden} from "@/components/presentie/attendanceSheet";

type AttendanceState = {
    [name: string] : boolean,
}

const initialAttendanceCalculator = async (): Promise<AttendanceState> => {
    const actieveLedenResponse = await getActieveLeden() as string[] | null;

    const state: AttendanceState = {};

    if (!actieveLedenResponse) {
        return state;
    }

    for (const name of actieveLedenResponse) {
        state[name] = false;
    }

    return state;
};

const togglePerson = (state: Readonly<AttendanceState>, name:string): AttendanceState => {
    const newState = {...state};
    newState[name] = !state[name];
    return newState;
};

const addNewPerson = (state: Readonly<AttendanceState>, name:string): AttendanceState => {
    // TODO add 26 person limit
    const newState = {...state};
    newState[name] = true;
    return newState;
};

const Attendance: FC = () => {
    const [attendance, setAttendance] = useLocalStorage<AttendanceState>('attendance', {});
    const newNameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        initialAttendanceCalculator().then(res => setAttendance(res));
        // getCurrentAttendance().then(res => console.log('Presentie:', res));
    }, []);

    const buttons = [];

    for (const attendanceName in attendance) {
        const onClick = () => setAttendance(togglePerson(attendance, attendanceName));
        buttons.push(<AttendanceButton key={attendanceName} name={attendanceName} present={attendance[attendanceName]} onClick={onClick}/>);
    }

    return (
        <div className={'section'}>
            {buttons}
            <div>
                <input ref={newNameRef} placeholder={'Anders...'}/><button onClick={
                () => {
                    setAttendance(addNewPerson(attendance, newNameRef.current!.value));
                    newNameRef.current!.value = "";
                }
            }>+</button>
            </div>
            <button onClick={async () => {
                // TODO save to sheet
                console.log('Save:', dayjs().format('DD-MM-YYYY'), attendance);
                setAttendance(await initialAttendanceCalculator());
            }}>Opslaan</button>
        </div>
    );
};

export default Attendance;
