'use client';
import {ChangeEventHandler, FC, KeyboardEventHandler, useRef} from 'react';
import './turf.css';
import {TallyEntry} from '@/components/turf/TallyList';
import TallyCounter from '@/components/turf/TallyCounter';

type TurfRowProps = {
    entry: TallyEntry,
    changeEntry: (newEntry: TallyEntry) => void,
}

const TallyRow: FC<TurfRowProps> = ({entry, changeEntry}) => {
    const euroRef  = useRef<HTMLInputElement>(null);
    const countRef = useRef<HTMLInputElement>(null);

    const {
              fixed,
              amount,
              price,
              name,
          } = entry;

    const onCountChanged = () => {
        const count = countRef.current ? parseInt(countRef.current.value) : 0;
        const cents = euroRef.current ? Math.round(parseFloat(euroRef.current.value) * 100) : 0;

        console.log(`New ${name} value:`, count * cents);

        entry.price = cents;
        entry.amount = count;
        changeEntry(entry);
    };

    const fixCents = () => {
        if (euroRef.current) {
            euroRef.current.value = parseFloat(euroRef.current.value).toFixed(2);
        }
    };

    const keyEuroDecimals: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key == 'Enter') {
            euroRef.current?.blur();
        }
    };

    const euroDecimals = () => {
        fixCents();
        onCountChanged();
    };

    const onNameChanged: ChangeEventHandler<HTMLInputElement> = (event) => {
        entry.name = event.target.value;
        changeEntry(entry);
    };

    return (
        <div className="turfRow">
            <TallyCounter countRef={countRef} amount={amount} onCountChanged={onCountChanged}/>
            <input
                ref={euroRef}
                min={0}
                step={0.01}
                defaultValue={(price/100).toFixed(2)}
                readOnly={fixed}
                className="tallyInput tallyPrice"
                onKeyUp={keyEuroDecimals}
                onBlur={euroDecimals}
            />
            <input type="text" className="tallyInput tallyName" defaultValue={name} readOnly={fixed} onChange={onNameChanged}/>
        </div>
    );
};

export default TallyRow;
