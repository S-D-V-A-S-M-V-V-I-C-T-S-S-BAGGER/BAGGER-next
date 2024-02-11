import {Dispatch, FC, SetStateAction, useRef, useState} from 'react';
import './turf.css';
import BaggerButton from '../BaggerButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencil} from "@fortawesome/free-solid-svg-icons/faPencil";
import RoundNeoButton from "@/components/RoundNeoButton";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import {faCoins} from "@fortawesome/free-solid-svg-icons/faCoins";
import {faListOl} from "@fortawesome/free-solid-svg-icons/faListOl";

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
                <h3 className="rowFlex">Hallo {
                    isEditing ? undefined : `${person ?? undefined}!`
                }</h3>
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
                <RoundNeoButton onClick={() => toggleEdit()}>
                    <FontAwesomeIcon icon={isEditing ? faCheck : faPencil} />
                </RoundNeoButton>
            </div>
            <div className="centeredColContent">
                <label htmlFor="activity" className="baggerInputLabel">Wat is de gelegenheid?</label>
                <input id="activity" className="tallyCreationInput baggerInput" ref={watRef} type="text" placeholder="Bier Stanislaus ofzo 🍻"
                    defaultValue={event ?? undefined} onChange={(event) => {
                                setEvent(event.target.value);
                        }}/>
            </div>
            <div className="buttonContainer">
                <BaggerButton onClick={() => {
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
                </BaggerButton>
                <BaggerButton onClick={() => {
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
                </BaggerButton>
            </div>
        </main>
    );
};

export default TallyCreation;
