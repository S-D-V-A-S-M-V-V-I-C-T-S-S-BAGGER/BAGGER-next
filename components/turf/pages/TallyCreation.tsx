'use client';
import {FC, useContext, useEffect, useState} from 'react';
import '../turf.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCoins} from "@fortawesome/free-solid-svg-icons/faCoins";
import {faListOl} from "@fortawesome/free-solid-svg-icons/faListOl";
import '@/styling/baggerButton.css';
import '@/styling/roundNeoButton.css';
import {AuthContext} from "@/components/auth/AuthContext";
import {getSessionName} from "@/lib/session";
import LogoutButton from "@/components/auth/LogoutButton";
import LoginButton from "@/components/auth/LoginButton";

type TallyCreationProps = {
    startTally: () => void,
    enterAmount: () => void,
}

const TallyCreation: FC<TallyCreationProps> = ({startTally, enterAmount}) => {
    const [person, setPerson] = useState('');

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
            <div className="buttonContainer">
                <button className="baggerButton" onClick={() => {
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
                <button className="baggerButton" onClick={() => {
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
