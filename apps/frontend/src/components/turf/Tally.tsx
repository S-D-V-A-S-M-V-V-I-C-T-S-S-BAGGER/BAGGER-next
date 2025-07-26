import { FC, useContext, useEffect } from "react";
import { useLocalStorage } from "../../lib/useLocalStorage.ts";
import { AuthContext } from "../auth/AuthContext.ts";
import { TallyEvent, TallyRowSubmit } from "@repo/types";
import TallyReview from "./pages/review/TallyReview.tsx";
import TallyEventList from "./pages/event/TallyEventList.tsx";
import { addTallyEntry } from "../../api/tally.ts";
import TallyDirectAmount from "./pages/TallyDirectAmount.tsx";
import TallyList, { TallyEntry } from "./pages/TallyList.tsx";
import TallyCreation from "./pages/TallyCreation.tsx";
import { Dayjs } from "dayjs";

export const enum TallyState {
  not_started,
  direct_amount,
  tally_started,
  finishing,
  review,
}
export type DeserializedTallyEvent = Omit<TallyEvent, "date"> & {
  date: Dayjs;
};

const Tally: FC = () => {
  const { userName } = useContext(AuthContext);

  // TODO move all to a context
  const [tallyEvent, setTallyEvent] = useLocalStorage<TallyEvent | null>(
    "turf-gelegenheid",
    null,
  );
  const [tallyState, setTallyState] = useLocalStorage<TallyState>(
    "turf-status",
    TallyState.not_started,
  );
  const [tallyEntries, setTallyEntries] = useLocalStorage<TallyEntry[]>(
    "turf-lijst",
    [],
  );
  const [tallyTotal, setTallyTotal] = useLocalStorage<number>("turf-totaal", 0);

  useEffect(() => {
    console.log("Tally:", tallyEvent, tallyState, tallyTotal, tallyEntries);
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
      const rowSubmit: TallyRowSubmit = {
        person: userName ?? "error",
        eventId: tallyEvent?.id ?? -1,
        total: tallyTotal,
        entries: tallyEntries,
      };

      await addTallyEntry(rowSubmit)
        .catch((err: unknown) => {
          console.log("Add pages row error:", err);
        })
        .then(() => {
          console.log("Sent Tally:", tallyEvent, tallyTotal);
          resetTally();
        });
    } else {
      resetTally();
    }
  };

  let tallyPage;
  switch (tallyState) {
    default:
    case TallyState.not_started:
      tallyPage = (
        <TallyCreation
          enterAmount={() => setTallyState(TallyState.direct_amount)}
          startTally={() => {
            setTallyEntries([
              {
                amount: 0,
                price: 0,
                name: "",
              },
            ]);
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
      tallyPage = (
        <TallyDirectAmount
          finishTally={finishTally}
          tallyTotal={tallyTotal}
          setTallyTotal={setTallyTotal}
        />
      );
      break;
    case TallyState.finishing:
      tallyPage = (
        <TallyEventList
          finishSelection={() => setTallyState(TallyState.review)}
          tallyEvent={tallyEvent}
          setTallyEvent={setTallyEvent}
        />
      );
      break;
    case TallyState.review:
      tallyPage = (
        <TallyReview
          tallyEvent={tallyEvent!}
          tallyEntries={tallyEntries}
          tallyTotal={tallyTotal}
          setTallyState={setTallyState}
          submitTally={submitTally}
        />
      );
      break;
  }
  return <div className="tallyPage">{tallyPage}</div>;
};

export default Tally;
