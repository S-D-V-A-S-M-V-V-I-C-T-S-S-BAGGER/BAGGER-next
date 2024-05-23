'use client';
import {Dispatch, FC, SetStateAction, useRef, useState} from 'react';
import './turf.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencil} from "@fortawesome/free-solid-svg-icons/faPencil";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import {faCoins} from "@fortawesome/free-solid-svg-icons/faCoins";
import {faListOl} from "@fortawesome/free-solid-svg-icons/faListOl";
import '@/styling/baggerButton.css';
import '@/styling/roundNeoButton.css';

type TallyCreationProps = {
    person: string | null,
    setPerson: Dispatch<SetStateAction<string | null>>,
    event: string | null,
    setEvent: Dispatch<SetStateAction<string | null>>,
    startTally: () => void,
    enterAmount: () => void,
}

const TallyCreation: FC<TallyCreationProps> = ({startTally, enterAmount, person, setPerson, event, setEvent}) => {
    const wieRef = useRef<HTMLInputElement>(null);
    const watRef = useRef<HTMLInputElement>(null);
    const [isEditing, setEditing] = useState(false);

    const checkValues = () => {
        if (wieRef.current && wieRef.current.value.length < 1) {
            wieRef.current.focus();
            return false;
        }
        if (watRef.current && watRef.current.value.length < 1) {
            watRef.current.focus();
            return false;
        }
        return true;
    };

    const toggleEdit = () => {
        if (isEditing) {
            setPerson(wieRef?.current?.value ?? null);
        }
        setEditing(!isEditing);
    };

    return (
        <main className="tallyCreationMain">
            <div className="rowFlex gap1rem center">
                <h3 className="rowFlex">{isEditing? 'Naam: ': person? `Hallo ${person}!`: 'Vul je naam in ->'}</h3>
                {isEditing
                    ? (
                        <input
                            className="tallyCreationInput baggerInput noMargin"
                            ref={wieRef}
                            type="text"
                            placeholder="Wie"
                            defaultValue={person ?? undefined}
                        />
                    ) : undefined
                }
                <button className={person? "roundNeoButton" : "roundNeoButton green"} onClick={() => toggleEdit()}>
                    <FontAwesomeIcon icon={isEditing ? faCheck : faPencil} />
                </button>
            </div>
            <div className="centeredColContent">
                <label htmlFor="activity" className="baggerInputLabel">Wat is de gelegenheid?</label>
                <input id="activity" className="tallyCreationInput baggerInput" ref={watRef} type="text" placeholder="Stanislaus ofzo 🍻"
                    defaultValue={event ?? undefined} onChange={(event) => {
                                setEvent(event.target.value);
                        }}/>
            </div>
            <div className="buttonContainer">
                <button className="baggerButton" onClick={() => {
                    if (checkValues()) {
                        enterAmount();
                    }
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
                    if (checkValues()) {
                        startTally();
                    }
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
