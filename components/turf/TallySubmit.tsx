import React, {FC, useState} from "react";
import Modal from "@/components/modal/Modal";
import {SerializedTallyEvent} from "@/components/tally_event/tallyEventSheet";
import {TallyEntry} from "@/components/turf/TallyList";
import {formatEuros} from "@/components/turf/euroUtil";
import dayjs from "dayjs";
import {TallyState} from "@/components/turf/Tally";

import('dayjs/locale/nl');

enum SubmittingState {
    not_started,
    awaiting_confirmation,
    being_sent,
    awaiting_cancellation,
}

type TallySubmitProps = {
    tallyEvent: SerializedTallyEvent,
    tallyEntries: TallyEntry[],
    tallyTotal: number,
    setTallyState: (state: TallyState) => void;
    submitTally: () => void;
}

const TallySubmit: FC<TallySubmitProps> = ({tallyEvent, tallyEntries, tallyTotal, setTallyState, submitTally}) => {
    const [submittingState, setSubmittingState] = useState<SubmittingState>(SubmittingState.not_started);

    const tallyUp = () => {};
    const cancel = () => {};

    return <div>
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
        <Modal open={submittingState == SubmittingState.awaiting_cancellation}>
            <div className="submittingModal cancel">
                <p>Weet je zeker dat je wil resetten?</p>
                <button className="no submittingModalButton" onClick={() => setSubmittingState(SubmittingState.not_started)}>Nee</button>
                <button className="yes submittingModalButton" onClick={() => cancel()}>Reset</button>
            </div>
        </Modal>
        <div>Je hebt €{formatEuros(tallyTotal/100)} geturfd voor {tallyEvent.description} op {dayjs(tallyEvent.date).locale("nl").format("dddd D MMMM YYYY")}</div>
        <div>TODO entries</div>
        <div className="tallySubmitButtons">
            <button onClick={() => setTallyState(TallyState.tally_started)}>Pas turven aan</button>
            <button onClick={() => setTallyState(TallyState.direct_amount)}>Pas eindbedrag aan</button>
            <button onClick={() => setTallyState(TallyState.finishing)}>Pas gelegenheid aan</button>
            <button onClick={submitTally}>Klaar!</button>
        </div>
    </div>;
};

export default TallySubmit;
