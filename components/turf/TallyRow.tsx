'use client';
import {ChangeEventHandler, FC, KeyboardEventHandler, useRef} from 'react';
import './turf.css';
import {TallyEntry} from '@/components/turf/TallyList';
import TallyCounter from '@/components/turf/TallyCounter';
import {formatEuros, parseCents, parseEuros} from '@/components/turf/euroUtil';

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
        const cents = parseCents(euroRef);

        console.log(`New ${name} value:`, count * cents);

        entry.price = cents;
        entry.amount = count;
        changeEntry(entry);
    };

    const fixCents = () => {
        if (euroRef.current) {
            const value = parseEuros(euroRef);
            if (!isNaN(value)) {
                euroRef.current.value = formatEuros(value);
            }
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
                defaultValue={formatEuros(price/100)}
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
