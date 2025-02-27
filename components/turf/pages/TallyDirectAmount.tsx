'use client';
import React, {FC, KeyboardEventHandler, useContext, useRef, useState} from 'react';
import Modal from '@/components/modal/Modal';
import {formatEuros, parseCents, parseEuros} from '@/components/turf/euroUtil';
import {AuthContext} from "@/components/auth/AuthContext";
import LogoutButton from "@/components/auth/LogoutButton";
import LoginButton from "@/components/auth/LoginButton";

type TallyDirectAmountProps = {
    finishTally: (total: number) => void;
    tallyTotal: number;
    setTallyTotal: (total: number) => void;
}

enum SubmittingState {
    not_started,
    awaiting_confirmation,
    awaiting_cancellation,
}

const TallyDirectAmount: FC<TallyDirectAmountProps> = ({finishTally, tallyTotal, setTallyTotal}) => {
    const hoeveelRef = useRef<HTMLInputElement>(null);
    const defaultValue = formatEuros(tallyTotal / 100);

    const [submittingState, setSubmittingState] = useState<SubmittingState>(SubmittingState.not_started);

    const authContextData = useContext(AuthContext);
    const authenticated = authContextData.isAuthenticated;

    const fixCents = () => {
        if (hoeveelRef.current) {
            const value = parseEuros(hoeveelRef);
            const cents = parseCents(hoeveelRef);
            setTallyTotal(cents);
            if (!isNaN(value)) {
                hoeveelRef.current.value = formatEuros(value);
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
        if (hoeveelRef.current) {
            finishTally(parseCents(hoeveelRef));
        }
    };

    const cancel = async () => {
        finishTally(0);
    };

    return (
        <main className="tallyCreationMain">
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
            <div className='cancelButtonBar'>
                <button className='cancelButton' onClick={
                    () => setSubmittingState(SubmittingState.awaiting_cancellation)
                }>Reset
                </button>
            </div>
            <div className="rowFlex">
                <input
                    ref={hoeveelRef}
                    defaultValue={defaultValue}
                    type="text"
                    placeholder="Hoeveel"
                    className="tallyDirectInput"
                    onKeyUp={euroDecimals}
                    onBlur={fixCents}
                />
            </div>
            <div className="submitButtonBar">
                {authenticated ? (
                    <button
                        className='submitButton'
                        onClick={() => setSubmittingState(SubmittingState.awaiting_confirmation)}
                    >
                        Verstuur
                    </button>
                ) : <LoginButton/>}
            </div>
        </main>
    );
};

export default TallyDirectAmount;
