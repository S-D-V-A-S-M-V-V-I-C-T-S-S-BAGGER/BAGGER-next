'use client';
import {FC, useEffect} from 'react';
import TallyCreation from '@/components/turf/pages/TallyCreation';
import TallyList, {TallyEntry} from '@/components/turf/pages/TallyList';
import TallyDirectAmount from '@/components/turf/pages/TallyDirectAmount';
import {addTallyRow} from '@/components/turf/tallySheet';
import {useLocalStorage} from '@/lib/useLocalStorage';
import TallyEventList from "@/components/turf/pages/event/TallyEventList";
import {getSessionName} from "@/lib/session";
import TallySubmit from "@/components/turf/pages/TallySubmit";
import {SerializedTallyEvent} from "@/components/turf/pages/event/tallyEventSheet";

export const enum TallyState {
    not_started,
    direct_amount,
    tally_started,
    finishing,
    submitting,
}

const Tally: FC = () => {
    const [tallyEvent, setTallyEvent]   = useLocalStorage<SerializedTallyEvent | null>('turf-gelegenheid', null);
    const [tallyState, setTallyState]   = useLocalStorage<TallyState>('turf-status', TallyState.not_started);
    const [tallyEntries, setTallyEntries] = useLocalStorage<TallyEntry[]>('turf-lijst', []);
    const [tallyTotal, setTallyTotal] = useLocalStorage<number>('turf-totaal', 0);

    useEffect(() => {
        console.log('Tally:', tallyEvent, tallyState, tallyTotal, tallyEntries);
    }, [tallyState]);

    const finishTally = (total: number, entries: TallyEntry[] = []) => {
        setTallyTotal(total);
        setTallyEntries(entries);
        if (total > 0) {
            setTallyState(TallyState.finishing);
        } else {
            setTallyState(TallyState.not_started);
        }
    };

    const resetTally = () => {
        setTallyTotal(0);
        setTallyEntries([]);
        setTallyEvent(null);
        setTallyState(TallyState.not_started);
    };

    const submitTally = async () => {
        if (tallyTotal > 0) {
            const tallyPerson = await getSessionName();
            const additionalEntries: string[] = tallyEntries.flatMap(entry => [entry.name, entry.price.toString(), entry.amount.toString()]);
            await addTallyRow([[tallyPerson ?? 'error', tallyEvent?.id.toString() ?? 'error', tallyTotal.toString() ?? 'error', ...additionalEntries]])
                .catch(err => {
                    console.log('Add pages row error:', err);
                }).then(() => {
                    console.log('Sent Tally:', tallyEvent, tallyTotal);
                    resetTally();
                });
        } else {
            resetTally();
        }
    };

    let tallyPage;
    switch (tallyState) {
        case TallyState.not_started:
            tallyPage = (
                <TallyCreation
                    enterAmount={() => setTallyState(TallyState.direct_amount)}
                    startTally={() => {
                        setTallyEntries([{
                            amount: 0,
                            price: 0,
                            name: '',
                        }]);
                        setTallyState(TallyState.tally_started);
                    }}
                />
            );
            break;
        case TallyState.tally_started:
            tallyPage = (
                <TallyList
                    finishTally={finishTally}
                    tallyTotal={tallyTotal}
                    setTallyTotal={setTallyTotal}
                    tallyEntries={tallyEntries}
                    setTallyEntries={setTallyEntries}
                />
            );
            break;
        case TallyState.direct_amount:
            tallyPage = <TallyDirectAmount
                finishTally={finishTally}
                tallyTotal={tallyTotal}
                setTallyTotal={setTallyTotal}
            />;
            break;
        case TallyState.finishing:
            tallyPage = <TallyEventList
                finishSelection={() => setTallyState(TallyState.submitting)}
                tallyEvent={tallyEvent}
                setTallyEvent={setTallyEvent}
            />;
            break;
        case TallyState.submitting:
            tallyPage = <TallySubmit tallyEvent={tallyEvent!} tallyEntries={tallyEntries} tallyTotal={tallyTotal} setTallyState={setTallyState} submitTally={submitTally}/>;
            break;
        default:
            tallyPage = <div>error</div>;
            break;
    }
    return <div className="tallyPage">{ tallyPage }</div>;
};

export default Tally;
