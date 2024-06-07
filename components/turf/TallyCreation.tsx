'use client';
import {Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState} from 'react';
import './turf.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCoins} from "@fortawesome/free-solid-svg-icons/faCoins";
import {faListOl} from "@fortawesome/free-solid-svg-icons/faListOl";
import '@/styling/baggerButton.css';
import '@/styling/roundNeoButton.css';
import {AuthContext} from "@/components/auth/AuthContext";
import {getSessionName} from "@/lib/session";
import LoginButton from "@/components/auth/LoginButton";
import LogoutButton from "@/components/auth/LogoutButton";

type TallyCreationProps = {
    person: string | null,
    setPerson: Dispatch<SetStateAction<string | null>>,
    event: string | null,
    setEvent: Dispatch<SetStateAction<string | null>>,
    startTally: () => void,
    enterAmount: () => void,
}

const TallyCreation: FC<TallyCreationProps> = ({startTally, enterAmount, person, setPerson, event, setEvent}) => {
    const watRef = useRef<HTMLInputElement>(null);
    const [validWat, setValidWat] = useState<boolean>(event !== null && event.length > 1);

    const authContextData = useContext(AuthContext);
    const authenticated = authContextData.isAuthenticated;

    useEffect(() => {
        if (authenticated) {
            getSessionName().then(res => setPerson(res!));
        }
        // Leave person unchanged if not logged in
    }, [authenticated, setPerson]);

    return (
        <main className="tallyCreationMain">
            {authenticated && <div className="logout"><LogoutButton/></div>}
            <div className="rowFlex gap1rem center">
                {
                    authenticated
                    ? <h3 className="rowFlex">Hallo {person}!</h3>
                    : <LoginButton/>
                }
            </div>
            <div className="centeredColContent">
            <label htmlFor="activity" className="baggerInputLabel">Wat is de gelegenheid?</label>
                <input
                    disabled={!authenticated}
                    id="activity"
                    className="tallyCreationInput baggerInput"
                    ref={watRef}
                    type="text"
                    placeholder="Stanislaus ofzo 🍻"
                    defaultValue={event ?? undefined}
                    onChange={(event) => {
                        const watValue = event.target.value;
                        setEvent(watValue);
                        setValidWat(watValue.length > 1);
                    }}
                />
            </div>
            <div className="buttonContainer">
                <button disabled={!authenticated || !validWat} className="baggerButton" onClick={() => {
                    enterAmount();
                }}>
                    <div className="cardButtonContent">
                        <span className="buttonIconBig">
                            <FontAwesomeIcon icon={faCoins}/>
                        </span>
                        <h5>Eindbedrag invoeren</h5>
                        <p>Tel het zelf op</p>
                    </div>
                </button>
                <button disabled={!authenticated || !validWat} className="baggerButton" onClick={() => {
                    startTally();
                }}>
                    <div className="cardButtonContent">
                        <span className="buttonIconBig">
                            <FontAwesomeIcon icon={faListOl}/>
                        </span>
                        <h5>Turven</h5>
                        <p>Laat het voor je doen</p>
                    </div>
                </button>
            </div>
        </main>
    );
};

export default TallyCreation;
