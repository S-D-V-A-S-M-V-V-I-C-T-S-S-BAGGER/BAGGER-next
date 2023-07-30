'use client';
import {FC, useEffect} from 'react';
import TallyCreation from '@/components/turf/TallyCreation';
import TallyList from '@/components/turf/TallyList';
import TallyDirectAmount from '@/components/turf/TallyDirectAmount';
import {addTallyRow} from '@/components/turf/tallySheet';
import dayjs from 'dayjs';
import {useLocalStorage} from '@/lib/useLocalStorage';

type TallyProps = {
    pilsPrijs: number;
}

enum TallyState {
    not_started,
    direct_amount,
    tally_started,
}

const Tally: FC<TallyProps> = ({pilsPrijs}) => {
    const [tallyPerson, setTallyPerson] = useLocalStorage<string | null>('turf-persoon', null);
    const [tallyEvent, setTallyEvent]   = useLocalStorage<string | null>('turf-gelegenheid', null);
    const [tallyState, setTallyState]   = useLocalStorage<TallyState>('turf-status', TallyState.not_started);
    const [tallyStartDate, setTallyStartDate] = useLocalStorage<string | null>('turf-start-date', null);

    const setValues = (person: string, event: string): boolean => {
        if (person.length < 1) {
            return false;
        }
        if (event.length < 1) {
            return false;
        }
        setTallyPerson(person);
        setTallyEvent(event);
        return true;
    };

    useEffect(() => {
        console.log('Tally:', tallyPerson, tallyEvent, tallyStartDate, tallyState);
    }, [tallyState]);

    const enterAmount = (person: string, event: string) => {
        if (setValues(person, event)) {
            setTallyState(TallyState.direct_amount);
        }
    };

    const startTally = (person: string, event: string) => {
        if (setValues(person, event)) {
            setTallyStartDate(dayjs().format('DD-MM-YYYY'));
            setTallyState(TallyState.tally_started);
        }
    };

    const finishTally = async (value: number, additionalEntries: string[] = []) => {
        if (value > 0) {
            await addTallyRow([[tallyPerson ?? 'error', tallyEvent ?? 'error', tallyStartDate ?? 'error', value.toString(), ...additionalEntries]])
                .catch(err => {
                    console.log('Add tally row error:', err);
                }).then(() => {
                    console.log('Sent Tally:', tallyPerson, tallyEvent, value);
                });
        }
        setTallyEvent(null);
        setTallyStartDate(null);
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
            return <TallyList finishTally={finishTally} pilsPrijs={pilsPrijs}/>;
        case TallyState.direct_amount:
            return <TallyDirectAmount finishTally={finishTally}/>;
        default:
            return <div>error</div>;
    }
};

export default Tally;
