import {FC, useRef, useState} from 'react';
import './turf.css';
import BaggerButton from '../BaggerButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPencil} from "@fortawesome/free-solid-svg-icons/faPencil";
import RoundNeoButton from "@/components/RoundNeoButton";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";

type TallyCreationProps = {
    person: string | null,
    event: string | null,
    startTally: (person: string, event: string) => void,
    enterAmount: (person: string, event: string) => void,
}

const TallyCreation: FC<TallyCreationProps> = ({startTally, enterAmount, person, event}) => {
    const wieRef = useRef<HTMLInputElement>(null);
    const watRef = useRef<HTMLInputElement>(null);
    const [isEditing, setEditing] = useState(false);

    const [name, setName] = useState(person ?? undefined);

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
            // TODO: save this name in localstorage?
            setName(wieRef?.current?.value);
        }
        setEditing(!isEditing);
    };

    return (
        <main className="tallyCreationMain">
            <div className="rowFlex gap1rem center">
                <h3 className="rowFlex">Hallo {
                    isEditing ? undefined : `${name}!`
                }</h3>
                {isEditing
                    ? (
                        <input
                            className="tallyCreationInput baggerInput noMargin"
                            ref={wieRef}
                            type="text"
                            placeholder="Wie"
                            defaultValue={name ?? undefined}
                        />
                    ) : undefined
                }
                <RoundNeoButton onClick={() => toggleEdit()}>
                    <FontAwesomeIcon icon={isEditing ? faCheck : faPencil} />
                </RoundNeoButton>
            </div>
            <div>
                <div className="centeredContent">
                    <div>
                        <label htmlFor="activity" className="baggerInputLabel">Wat is de gelegenheid?</label>
                        <input id="activity" className="tallyCreationInput baggerInput" ref={watRef} type="text" placeholder="Bier Stanislaus [DATUM] ofzo"
                            defaultValue={event ?? undefined}/>
                    </div>
                </div>
            </div>
            <div className="rowFlex gap10vw">
                <BaggerButton onClick={() => {
                    if (checkValues()) {
                        enterAmount(name ?? '', watRef.current?.value ?? '');
                    }
                }}>
                    Eindbedrag invoeren
                </BaggerButton>
                <BaggerButton onClick={() => {
                    if (checkValues()) {
                        startTally(name ?? '', watRef.current?.value ?? '');
                    }
                }}>
                    Turven
                </BaggerButton>
            </div>
        </main>
    );
};

export default TallyCreation;
