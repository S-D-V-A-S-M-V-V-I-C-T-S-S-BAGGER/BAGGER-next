import {FC, useRef} from 'react';
import './turf.css';

type TallyCreationProps = {
    person: string | null,
    event: string | null,
    startTally: (person: string, event: string) => void,
    enterAmount: (person: string, event: string) => void,
}

const TallyCreation: FC<TallyCreationProps> = ({startTally, enterAmount, person, event}) => {
    const wieRef = useRef<HTMLInputElement>(null);
    const watRef = useRef<HTMLInputElement>(null);

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

    return (
        <main className="tallyCreationMain">
            <div className="rowFlex gap5vw">
                <input className="tallyCreationInput" ref={wieRef} type="text" placeholder="Wie"
                       defaultValue={person ?? undefined}/>
                <input className="tallyCreationInput" ref={watRef} type="text" placeholder="Wat"
                       defaultValue={event ?? undefined}/>
            </div>
            <div className="rowFlex gap10vw">
                <button className="tallyCreationButton" onClick={() => {
                    if (checkValues()) {
                        enterAmount(wieRef.current?.value ?? '', watRef.current?.value ?? '');
                    }
                }}>
                    Eindbedrag invoeren
                </button>
                <button className="tallyCreationButton" onClick={() => {
                    if (checkValues()) {
                        startTally(wieRef.current?.value ?? '', watRef.current?.value ?? '');
                    }
                }}>
                    Turven
                </button>
            </div>
        </main>
    );
};

export default TallyCreation;
