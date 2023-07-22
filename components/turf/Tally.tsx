import {FC, useEffect} from 'react';
import {useLocalStorage} from '@/lib/useLocalStorage';
import TallyCreation from '@/components/turf/TallyCreation';
import TallyList from '@/components/turf/TallyList';
import TallyDirectAmount from '@/components/turf/TallyDirectAmount';

enum TallyState {
    not_started,
    direct_amount,
    tally_started,
}

const Tally: FC = () => {
    const [tallyPerson, setTallyPerson] = useLocalStorage<string | null>('turf-persoon', null);
    const [tallyEvent, setTallyEvent]   = useLocalStorage<string | null>('turf-gelegenheid', null);
    const [tallyState, setTallyState]   = useLocalStorage<TallyState>('turf-status', TallyState.not_started);

    const setValues = (person: string, event: string): boolean => {
        if (person.length < 1) {
            return false;
        }
        if (event.length < 1) {
            return false;
        }
        setTallyPerson(person);
        setTallyEvent(event);
        // TODO set start datetime
        return true;
    };

    useEffect(() => {
        console.log('Tally:', tallyPerson, tallyEvent, TallyState[tallyState]);
    }, [tallyState]);

    const enterAmount = (person: string, event: string) => {
        if (setValues(person, event)) {
            setTallyState(TallyState.direct_amount);
        }
    };

    const startTally = (person: string, event: string) => {
        if (setValues(person, event)) {
            setTallyState(TallyState.tally_started);
        }
    };

    const finishTally = (value: number) => {
        if (value > 0) {
            console.log('Send Tally:', tallyPerson, tallyEvent, value);
        }
        setTallyEvent(null);
        setTallyState(TallyState.not_started);
    };

    switch (tallyState) {
        case TallyState.not_started:
            return (
                <TallyCreation
                    enterAmount={enterAmount}
                    startTally={startTally}
                    person={tallyPerson}
                    event={tallyEvent}
                />
            );
        case TallyState.tally_started:
            return <TallyList finishTally={finishTally}/>;
        case TallyState.direct_amount:
            return <TallyDirectAmount finishTally={finishTally}/>;
        default:
            return <div>error</div>;
    }
};

export default Tally;
