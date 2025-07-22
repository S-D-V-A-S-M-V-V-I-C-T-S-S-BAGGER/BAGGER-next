import { FC, useState } from "react";
import "../../../../styling/baggerButton.css";
import { TallyEvent } from "@repo/types";
import { TallyEntry } from "../TallyList.tsx";
import { TallyState } from "../../Tally.tsx";
import Modal from "../../../modal/Modal.tsx";
import { formatEuros } from "../../../../lib/euroUtil.ts";
import TallyReviewRow from "./TallyReviewRow.tsx";
import dayjs from "dayjs";

import("dayjs/locale/nl");

enum SubmittingState {
  not_started,
  awaiting_confirmation,
  being_sent,
  awaiting_cancellation,
}

type TallySubmitProps = {
  tallyEvent: TallyEvent;
  tallyEntries: TallyEntry[];
  tallyTotal: number;
  setTallyState: (state: TallyState) => void;
  submitTally: () => void;
};

const TallyReview: FC<TallySubmitProps> = ({
  tallyEvent,
  tallyEntries,
  tallyTotal,
  setTallyState,
  submitTally,
}) => {
  const [submittingState, setSubmittingState] = useState<SubmittingState>(
    SubmittingState.not_started,
  );

  const tallyUp = () => {};
  const cancel = () => {};

  const entryRows = tallyEntries.map((entry, index) => (
    <TallyReviewRow key={index} entry={entry} />
  ));

  return (
    <div>
      <Modal open={submittingState == SubmittingState.being_sent}>
        <div className="submittingModal sending">
          <p>Aan het verzenden...</p>
        </div>
      </Modal>
      <Modal open={submittingState == SubmittingState.awaiting_confirmation}>
        <div className="submittingModal confirm">
          <p>Weet je zeker dat je dit op wil sturen?</p>
          <button
            className="no submittingModalButton"
            onClick={() => setSubmittingState(SubmittingState.not_started)}
          >
            Nee
          </button>
          <button
            className="yes submittingModalButton"
            onClick={() => tallyUp()}
          >
            Ja
          </button>
        </div>
      </Modal>
      <Modal open={submittingState == SubmittingState.awaiting_cancellation}>
        <div className="submittingModal cancel">
          <p>Weet je zeker dat je wil resetten?</p>
          <button
            className="no submittingModalButton"
            onClick={() => setSubmittingState(SubmittingState.not_started)}
          >
            Nee
          </button>
          <button
            className="yes submittingModalButton"
            onClick={() => cancel()}
          >
            Reset
          </button>
        </div>
      </Modal>
      <div className="result">
        Je hebt <b>€{formatEuros(tallyTotal / 100)}</b> geturfd voor{" "}
        <b>{tallyEvent.description}</b> op{" "}
        <i>{dayjs(tallyEvent.date).locale("nl").format("dddd D MMMM YYYY")}</i>
      </div>
      <div className="tallySubmitButtons">
        <button
          className="baggerButton"
          onClick={() => setTallyState(TallyState.tally_started)}
        >
          Pas turven aan
        </button>
        <button
          className="baggerButton"
          onClick={() => setTallyState(TallyState.direct_amount)}
        >
          Pas eindbedrag aan
        </button>
        <button
          className="baggerButton"
          onClick={() => setTallyState(TallyState.finishing)}
        >
          Pas gelegenheid aan
        </button>
        <button className="baggerButton" onClick={submitTally}>
          Klaar!
        </button>
      </div>
      {entryRows.length > 0 && <div>Je hebt geturfd:</div>}
      {entryRows}
    </div>
  );
};

export default TallyReview;
