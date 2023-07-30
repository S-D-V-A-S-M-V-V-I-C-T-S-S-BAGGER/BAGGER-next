import React, {FC, useState} from 'react';
import TallyRow from '@/components/turf/TallyRow';

type TallyListProps = {
    finishTally: (value: number, additionalEntries?: string[]) => void;
    pilsPrijs: number;
}

export type TallyEntry = {
    fixed: boolean,
    amount: number,
    price: number, // integer cents
    name: string,
}

const TallyList: FC<TallyListProps> = ({finishTally, pilsPrijs}) => {
    const [tallyEntries, setTallyEntries] = useState<TallyEntry[]>([
        {fixed: true, amount: 0, price: pilsPrijs, name: 'Pils'},
    ]);

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

    const tallyUp = () => {
        let totalValue = 0;
        let additionalEntries: string[] = [];
        for (const tallyEntry of tallyEntries) {
            totalValue += tallyEntry.amount * tallyEntry.price;
            additionalEntries = additionalEntries.concat(tallyEntry.name, tallyEntry.price.toString(), tallyEntry.amount.toString());
        }

        finishTally(totalValue, additionalEntries);
    };

    return (
        <main className='tallyListMain'>
            <div className='turfRow'>
                <div>Hoeveel</div>
                <div>Prijs</div>
                <div>Wat</div>
            </div>
            {tallyEntries.map((entry, index) =>
                <TallyRow key={index} entry={entry} changeEntry={(newEntry) => {setCustomEntry(index, newEntry);}}/>
            )}
            <div className='addEntryButtonBar'>
                <button className='addEntryButton' onClick={addCustomEntry}>+</button>
            </div>
            <div className='addEntryButtonBar'>
                <button className='addEntryButton' onClick={
                    () => tallyUp()
                }>Klaar!</button>
            </div>
        </main>
    );
};

export default TallyList;
