import React, {FC, useState} from 'react';
import TallyRow from '@/components/turf/TallyRow';
import {useLocalStorage} from '@/lib/useLocalStorage';
import Modal from '@/components/modal/Modal';

type TallyListProps = {
    finishTally: (value: number, additionalEntries?: string[]) => Promise<void>;
    pilsPrijs: number;
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
}

const TallyList: FC<TallyListProps> = ({finishTally, pilsPrijs}) => {
    const defaultTally = [
        {fixed: true, amount: 0, price: pilsPrijs, name: 'Pils'},
    ];

    const tallyListLocalStorageKey = 'turf-lijst';
    const [tallyEntries, setTallyEntries] = useLocalStorage<TallyEntry[]>(tallyListLocalStorageKey, defaultTally);
    const [submittingState, setSubmittingState] = useState<SubmittingState>(SubmittingState.not_started);

    const addCustomEntry = () => {
        const newEntry: TallyEntry = {
            fixed: false,
            amount: 0,
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

    const tallyUp = async () => {
        setSubmittingState(SubmittingState.being_sent);
        let totalValue = 0;
        let additionalEntries: string[] = [];
        for (const tallyEntry of tallyEntries) {
            totalValue += tallyEntry.amount * tallyEntry.price;
            additionalEntries = additionalEntries.concat(tallyEntry.name, tallyEntry.price.toString(), tallyEntry.amount.toString());
        }

        await finishTally(totalValue, additionalEntries);

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
                    <p>Weet je het zeker?</p>
                    <button className="no submittingModalButton" onClick={() => setSubmittingState(SubmittingState.not_started)}>Nee</button>
                    <button className="yes submittingModalButton" onClick={() => tallyUp()}>Ja</button>
                </div>
            </Modal>
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
            <div className='addEntryButtonBar'>
                <button className='addEntryButton' onClick={
                    () => setSubmittingState(SubmittingState.awaiting_confirmation)
                }>Klaar!</button>
            </div>
        </main>
    );
};

export default TallyList;
