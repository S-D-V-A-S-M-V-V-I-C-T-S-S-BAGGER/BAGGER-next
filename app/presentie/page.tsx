"use client";
import {FC, useRef} from "react";
import './presentie.css';
import {PresentieButton} from "@/components/presentie/PresentieButton";
import {useLocalStorage} from "@/lib/useLocalStorage";
import dayjs from "dayjs";

// TODO get from sheet
const testNames = ['Darrell', 'Carlijn', 'Cato', 'Oliver', 'Margot', 'Max', 'Minke', 'Dilan', 'Masha', 'Tessa'];

type PresentieState = {
    [name: string] : boolean,
}

const initialPresentieCalculator = (names: string[]): PresentieState => {
    const state: PresentieState = {};

    for (const name of names) {
        state[name] = false;
    }

    return state;
};

const togglePerson = (state: Readonly<PresentieState>, name:string): PresentieState => {
    const newState = {...state};
    newState[name] = !state[name];
    return newState;
};

const addNewPerson = (state: Readonly<PresentieState>, name:string): PresentieState => {
    const newState = {...state};
    newState[name] = true;
    return newState;
};

const Presentie: FC = () => {
    const [presentie, setPresentie] = useLocalStorage<PresentieState>('presentie', initialPresentieCalculator(testNames));
    const newNameRef = useRef<HTMLInputElement>(null);

    const buttons = [];

    for (const presentieName in presentie) {
        const onClick = () => setPresentie(togglePerson(presentie, presentieName));
        buttons.push(<PresentieButton key={presentieName} name={presentieName} present={presentie[presentieName]} onClick={onClick}/>);
    }

    return (
        <div className={'section'}>
            {buttons}
            <div>
                <input ref={newNameRef} placeholder={'Anders...'}/><button onClick={
                () => {
                    setPresentie(addNewPerson(presentie, newNameRef.current!.value));
                    newNameRef.current!.value = "";
                }
            }>+</button>
            </div>
            <button onClick={() => {
                // TODO save to sheet
                console.log('Save:', dayjs().format('DD-MM-YYYY'), presentie);
                setPresentie(initialPresentieCalculator(testNames));
            }}>Opslaan</button>
        </div>
    );
};

export default Presentie;
