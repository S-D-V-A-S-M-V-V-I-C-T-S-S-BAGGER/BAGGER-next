'use client';
import React, {FC, useContext, useEffect, useState} from 'react';
import TallyRow from '@/components/turf/TallyRow';
import {formatEuros} from "@/components/turf/euroUtil";
import {AuthContext} from "@/components/auth/AuthContext";
import LoginButton from "@/components/auth/LoginButton";
import Modal from "@/components/modal/Modal";
import LogoutButton from '../auth/LogoutButton';

type TallyListProps = {
    finishTally: (value: number, additionalEntries?: TallyEntry[]) => void;
    tallyTotal: number;
    setTallyTotal: (total: number) => void;
    tallyEntries: TallyEntry[];
    setTallyEntries: (entries: TallyEntry[]) => void;
}

export type TallyEntry = {
    amount: number,
    price: number, // integer cents
    name: string,
}

enum SubmittingState {
    not_started,
    awaiting_confirmation,
    awaiting_cancellation,
}


const TallyList: FC<TallyListProps> = ({ finishTally, tallyTotal, setTallyTotal, tallyEntries, setTallyEntries }) => {
    const [submittingState, setSubmittingState] = useState<SubmittingState>(SubmittingState.not_started);

    const authContextData = useContext(AuthContext);
    const authenticated = authContextData.isAuthenticated;

    const addCustomEntry = () => {
        const newEntry: TallyEntry = {
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

    useEffect(() => {
        let _totalValue = 0;
        let _additionalEntries: string[] = [];
        for (const tallyEntry of tallyEntries) {
            _totalValue += tallyEntry.amount * tallyEntry.price;
            _additionalEntries = _additionalEntries.concat(tallyEntry.name, tallyEntry.price.toString(), tallyEntry.amount.toString());
        }
        setTallyTotal(_totalValue);
    }, [tallyEntries]);

    const tallyUp = async () => {
        finishTally(tallyTotal, tallyEntries);
    };

    const cancel = async () => {
        finishTally(0, []);
    };

    return (
        <main className='tallyListMain'>
            <Modal open={submittingState == SubmittingState.awaiting_confirmation}>
                <div className="submittingModal confirm">
                    <p>Weet je zeker dat je dit op wil sturen?</p>
                    <button className="no submittingModalButton" onClick={() => setSubmittingState(SubmittingState.not_started)}>Nee</button>
                    <button className="yes submittingModalButton" onClick={() => tallyUp()}>Ja</button>
                </div>
            </Modal>
            <Modal open={submittingState == SubmittingState.awaiting_cancellation}>
                <div className="submittingModal cancel">
                    <p>Weet je zeker dat je wil resetten?</p>
                    <button className="no submittingModalButton" onClick={() => setSubmittingState(SubmittingState.not_started)}>Nee</button>
                    <button className="yes submittingModalButton" onClick={() => cancel()}>Reset</button>
                </div>
            </Modal>
            {authenticated && <div className="logout"><LogoutButton/></div>}
            <div className='cancelButtonBar'>
                <button className='cancelButton' onClick={
                    () => setSubmittingState(SubmittingState.awaiting_cancellation)
                }>Reset
                </button>
            </div>
            <div className='totalBar'>
                <button className='total' disabled={true}>Totaal: €{formatEuros(tallyTotal / 100)}</button>
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
