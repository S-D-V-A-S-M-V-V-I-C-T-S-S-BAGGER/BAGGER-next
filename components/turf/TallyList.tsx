'use client';
import React, {FC, useContext, useEffect, useState} from 'react';
import TallyRow from '@/components/turf/TallyRow';
import {useLocalStorage} from '@/lib/useLocalStorage';
import Modal from '@/components/modal/Modal';
import {formatEuros} from "@/components/turf/euroUtil";
import {AuthContext} from "@/components/auth/AuthContext";
import LogoutButton from "@/components/auth/LogoutButton";
import LoginButton from "@/components/auth/LoginButton";

type TallyListProps = {
    finishTally: (value: number, additionalEntries?: string[]) => Promise<void>;
    pilsPrijs: number;
    tallyEvent: string;
    tallyStartDate: string;
}

export type TallyEntry = {
    fixed: boolean,
    amount: number,
    price: number, // integer cents
    name: string,
}

enum SubmittingState {
    not_started,
    awaiting_confirmation,
    being_sent,
    awaiting_cancellation,
}

const TallyList: FC<TallyListProps> = ({finishTally, pilsPrijs, tallyEvent, tallyStartDate}) => {
    const defaultTally = [
        {fixed: true, amount: 0, price: pilsPrijs, name: 'Pils'},
    ];

    const tallyListLocalStorageKey = 'turf-lijst';
    const [tallyEntries, setTallyEntries] = useLocalStorage<TallyEntry[]>(tallyListLocalStorageKey, defaultTally);
    const [submittingState, setSubmittingState] = useState<SubmittingState>(SubmittingState.not_started);

    const authContextData = useContext(AuthContext);
    const authenticated = authContextData.isAuthenticated;

    const addCustomEntry = () => {
        const newEntry: TallyEntry = {
            fixed: false,
            amount: 1,
            price: 0,
            name: '',
        };
        setTallyEntries([...tallyEntries, newEntry]);
    };

    const setCustomEntry = (index: number, entry: TallyEntry) => {
        const newEntries = tallyEntries.slice();
        newEntries[index] = entry;
        setTallyEntries(newEntries);
    };

    const [totalValue, setTotalValue] = useState<number>(0);
    const [additionalEntries, setAdditionalEntries] = useState<string[]>([]);

    useEffect(() => {
        let _totalValue = 0;
        let _additionalEntries: string[] = [];
        for (const tallyEntry of tallyEntries) {
            _totalValue += tallyEntry.amount * tallyEntry.price;
            _additionalEntries = _additionalEntries.concat(tallyEntry.name, tallyEntry.price.toString(), tallyEntry.amount.toString());
        }
        setTotalValue(_totalValue);
        setAdditionalEntries(_additionalEntries);
    }, [tallyEntries]);

    const tallyUp = async () => {
        setSubmittingState(SubmittingState.being_sent);

        await finishTally(totalValue, additionalEntries);

        localStorage.setItem(tallyListLocalStorageKey, JSON.stringify(defaultTally));

        setSubmittingState(SubmittingState.not_started);
    };

    const cancel = async () => {
        await finishTally(0, []);

        localStorage.setItem(tallyListLocalStorageKey, JSON.stringify(defaultTally));

        setSubmittingState(SubmittingState.not_started);
    };

    return (
        <main className='tallyListMain'>
            <Modal open={submittingState == SubmittingState.being_sent}>
                <div className="submittingModal sending">
                    <p>Aan het verzenden...</p>
                </div>
            </Modal>
            <Modal open={submittingState == SubmittingState.awaiting_confirmation}>
                <div className="submittingModal confirm">
                    <p>Weet je zeker dat je dit op wil sturen?</p>
                    <button className="no submittingModalButton" onClick={() => setSubmittingState(SubmittingState.not_started)}>Nee</button>
                    <button className="yes submittingModalButton" onClick={() => tallyUp()}>Ja</button>
                </div>
            </Modal>
            {authenticated && <div className="logout"><LogoutButton/></div>}
            <Modal open={submittingState == SubmittingState.awaiting_cancellation}>
                <div className="submittingModal cancel">
                    <p>Weet je zeker dat je wil resetten?</p>
                    <button className="no submittingModalButton" onClick={() => setSubmittingState(SubmittingState.not_started)}>Nee</button>
                    <button className="yes submittingModalButton" onClick={() => cancel()}>Reset</button>
                </div>
            </Modal>
            <div className="tallyListHeader">Turven voor {tallyEvent} op {tallyStartDate}</div>
            <div className='cancelButtonBar'>
                <button className='cancelButton' onClick={
                    () => setSubmittingState(SubmittingState.awaiting_cancellation)
                }>Reset
                </button>
            </div>
            <div className='totalBar'>
                <button className='total' disabled={true}>Totaal: €{formatEuros(totalValue / 100)}</button>
            </div>
            <div className='turfRow'>
                <div className='tallyCount'>Hoeveel</div>
                <div className='tallyPrice'>Prijs</div>
                <div className='tallyName'>Wat</div>
            </div>
            {tallyEntries.map((entry: TallyEntry, index: number) =>
                <TallyRow key={index} entry={entry} changeEntry={(newEntry) => {setCustomEntry(index, newEntry);}}/>
            )}
            <div className='addEntryButtonBar'>
                <button className='addEntryButton' onClick={addCustomEntry}>+</button>
            </div>
            <div className='submitButtonBar'>
                {authenticated ? (
                    <button
                        className='submitButton'
                        onClick={() => setSubmittingState(SubmittingState.awaiting_confirmation)}
                    >
                        Klaar!
                    </button>
                ) : <LoginButton/>}
            </div>
        </main>
    );
};

export default TallyList;
