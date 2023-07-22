'use client';
import {FC, KeyboardEventHandler, MutableRefObject, useRef} from 'react';
import './turf.css';

type TurfRowProps = {
    pils?: true;
    totalValueRef: MutableRefObject<number>;
}

const TallyRow: FC<TurfRowProps> = ({pils, totalValueRef}) => {
    const euroRef  = useRef<HTMLInputElement>(null);
    const countRef = useRef<HTMLInputElement>(null);

    const previousCentRef  = useRef(0);
    const previousCountRef = useRef(0);

    const onCountChanged = () => {
        const count = countRef.current ? parseInt(countRef.current.value) : 0;
        const cents = euroRef.current ? Math.round(parseFloat(euroRef.current.value) * 100) : 0;

        const newValue      = count * cents;
        const previousValue = previousCentRef.current * previousCountRef.current;

        totalValueRef.current -= previousValue;
        totalValueRef.current += newValue;

        console.log('New total value:', totalValueRef.current / 100);

        previousCountRef.current = count;
        previousCentRef.current  = cents;
    };

    const fixCents = () => {
        if (euroRef.current) {
            euroRef.current.value = parseFloat(euroRef.current.value).toFixed(2);
        }
    };

    const euroDecimals: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key == 'Enter') {
            fixCents();
            onCountChanged();
            euroRef.current?.blur();
        }
    };

    return (
        <div className="turfRow">
            <input
                ref={countRef}
                type="number"
                min={0}
                step={1}
                defaultValue={pils ? 0 : 1}
                className="tallyInput"
                onChange={onCountChanged}
            />
            {
                pils
                    ? (
                        <input
                            ref={euroRef}
                            type="number"
                            value={'3.38'}
                            readOnly
                            className="tallyInput"
                        />
                    ) : (
                        <input
                            ref={euroRef}
                            type="number"
                            min={0}
                            step={0.01}
                            defaultValue={'0.00'}
                            className="tallyInput"
                            onKeyUp={euroDecimals}
                        />
                    )
            }
            {
                pils
                    ? <input type="text" className="tallyInput" value="Pils" readOnly/>
                    : <input type="text" className="tallyInput"/>
            }
        </div>
    );
};

export default TallyRow;
