'use client';
import React, {FC, KeyboardEventHandler, useContext, useRef, useState} from 'react';
import Modal from '@/components/modal/Modal';
import {formatEuros, parseCents, parseEuros} from '@/components/turf/euroUtil';
import {AuthContext} from "@/components/auth/AuthContext";
import LogoutButton from "@/components/auth/LogoutButton";
import LoginButton from "@/components/auth/LoginButton";

type TallyDirectAmountProps = {
    finishTally: (value: number) => Promise<void>;
    tallyEvent: string;
    tallyStartDate: string;
}

enum SubmittingState {
    not_started,
    awaiting_confirmation,
    being_sent,
    awaiting_cancellation,
}

const TallyDirectAmount: FC<TallyDirectAmountProps> = ({finishTally, tallyEvent, tallyStartDate}) => {
    const hoeveelRef = useRef<HTMLInputElement>(null);

    const [submittingState, setSubmittingState] = useState<SubmittingState>(SubmittingState.not_started);

    const authContextData = useContext(AuthContext);
    const authenticated = authContextData.isAuthenticated;

    const fixCents = () => {
        if (hoeveelRef.current) {
            const value = parseEuros(hoeveelRef);
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
        setSubmittingState(SubmittingState.being_sent);
        if (hoeveelRef.current) {
            const value = parseCents(hoeveelRef);
            await finishTally(value);
        }
        setSubmittingState(SubmittingState.not_started);
    };

    const cancel = async () => {
        await finishTally(0);
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
            {authenticated && <div className="logout"><LogoutButton/></div>}
            <Modal open={submittingState == SubmittingState.awaiting_cancellation}>
                <div className="submittingModal cancel">
                    <p>Weet je zeker dat je wil resetten?</p>
                    <button className="no submittingModalButton" onClick={() => setSubmittingState(SubmittingState.not_started)}>Nee</button>
                    <button className="yes submittingModalButton" onClick={() => cancel()}>Reset</button>
                </div>
            </Modal>
            <div className="tallyListHeader">Totaal voor {tallyEvent} op {tallyStartDate}</div>
            <div className='cancelButtonBar'>
                <button className='cancelButton' onClick={
                    () => setSubmittingState(SubmittingState.awaiting_cancellation)
                }>Reset
                </button>
            </div>
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
