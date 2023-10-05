import {FC, KeyboardEventHandler, useRef} from 'react';

type TallyDirectAmountProps = {
    finishTally: (value: number) => void;
}

const TallyDirectAmount: FC<TallyDirectAmountProps> = ({finishTally}) => {
    const hoeveelRef = useRef<HTMLInputElement>(null);

    const fixCents = () => {
        if (hoeveelRef.current) {
            hoeveelRef.current.value = parseFloat(hoeveelRef.current.value).toFixed(2);
        }
    };

    const euroDecimals: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key == 'Enter') {
            fixCents();
            hoeveelRef.current?.blur();
        }
    };

    return (
        <main>
            <main className="tallyCreationMain">
                <div className="rowFlex gap5vw">
                    <input
                        ref={hoeveelRef}
                        type="text"
                        placeholder="Hoeveel"
                        className="tallyDirectInput"
                        onKeyUp={euroDecimals}
                        onBlur={fixCents}
                    />
                </div>
                <div className="rowFlex gap10vw">
                    <button className='tallyDirectButton' onClick={() => {
                        if (hoeveelRef.current) {
                            const value = Math.round(parseFloat(hoeveelRef.current.value) * 100);
                            finishTally(value);
                        }
                    }}>Verstuur
                    </button>
                </div>
            </main>
        </main>
    );
};

export default TallyDirectAmount;
