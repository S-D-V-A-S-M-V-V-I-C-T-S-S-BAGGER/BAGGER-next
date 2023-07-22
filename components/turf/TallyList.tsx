import React, {FC, useRef, useState} from 'react';
import TallyRow from '@/components/turf/TallyRow';

type TallyListProps = {
    finishTally: (value: number) => void;
}

const TallyList: FC<TallyListProps> = ({finishTally}) => {
    const [customEntries, setCustomEntries] = useState<React.ReactElement[]>([]);

    const tallyValueRef = useRef(0);

    const addCustomEntry = () => {
        const newEntry = (<TallyRow totalValueRef={tallyValueRef}/>);
        setCustomEntries([...customEntries, newEntry]);
    };

    return (
        <main className='tallyListMain'>
            <div className='turfRow'>
                <div>Hoeveel</div>
                <div>Prijs</div>
                <div>Wat</div>
            </div>
            <TallyRow totalValueRef={tallyValueRef} pils={true}/>
            {customEntries}
            <div className='addEntryButtonBar'>
                <button className='addEntryButton' onClick={addCustomEntry}>+</button>
            </div>
            <div className='addEntryButtonBar'>
                <button className='addEntryButton' onClick={
                    () => finishTally(tallyValueRef.current / 100)
                }>Klaar!</button>
            </div>
        </main>
    );
};

export default TallyList;
