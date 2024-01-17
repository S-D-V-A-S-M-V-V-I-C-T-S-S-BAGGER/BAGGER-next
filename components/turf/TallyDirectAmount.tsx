import React, {FC, KeyboardEventHandler, useRef, useState} from 'react';
import Modal from '@/components/modal/Modal';

type TallyDirectAmountProps = {
    finishTally: (value: number) => Promise<void>;
}

enum SubmittingState {
    not_started,
    awaiting_confirmation,
    being_sent,
}

const TallyDirectAmount: FC<TallyDirectAmountProps> = ({finishTally}) => {
    const hoeveelRef = useRef<HTMLInputElement>(null);

    const [submittingState, setSubmittingState] = useState<SubmittingState>(SubmittingState.not_started);

    const fixCents = () => {
        if (hoeveelRef.current) {
            const value = parseFloat(hoeveelRef.current.value);
            if (!isNaN(value)) {
                hoeveelRef.current.value = value.toFixed(2);
            }
        }
    };

    const euroDecimals: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key == 'Enter') {
            fixCents();
            hoeveelRef.current?.blur();
        }
    };

    const tallyUp = async () => {
        setSubmittingState(SubmittingState.being_sent);
        if (hoeveelRef.current) {
            const value = Math.round(parseFloat(hoeveelRef.current.value) * 100);
            await finishTally(value);
        }
        setSubmittingState(SubmittingState.not_started);
    };

    return (
        <main className="tallyCreationMain">
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
            <div className="rowFlex">
                <input
                    ref={hoeveelRef}
                    type="text"
                    placeholder="Hoeveel"
                    className="tallyDirectInput"
                    onKeyUp={euroDecimals}
                    onBlur={fixCents}
                />
            </div>
            <div className="submitButtonBar">
                <button className='submitButton' onClick={() => setSubmittingState(SubmittingState.awaiting_confirmation)}>Verstuur
                </button>
            </div>
        </main>
    );
};

export default TallyDirectAmount;
