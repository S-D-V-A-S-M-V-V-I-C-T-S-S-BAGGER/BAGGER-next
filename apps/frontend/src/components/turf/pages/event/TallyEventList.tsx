import { FC, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { AuthContext } from "../../../auth/AuthContext.ts";
import TallyEventRow from "./TallyEventRow.tsx";
import LogoutButton from "../../../auth/LogoutButton.tsx";
import LoginButton from "../../../auth/LoginButton.tsx";
import NewTallyEvent from "./NewTallyEvent.tsx";
import { TallyEvent } from "@repo/types";
import { DeserializedTallyEvent } from "../../Tally.tsx";
import { addTallyEvent, getTallyEvents } from "../../../../api/tallyEvent.ts";

type TallyEventListProps = {
  finishSelection: () => void;
  tallyEvent: TallyEvent | null;
  setTallyEvent: (event: TallyEvent | null) => void;
};

function deserializeAndSortTallyEvents(
  serializedEvents: TallyEvent[],
): DeserializedTallyEvent[] {
  return serializedEvents
    .map<DeserializedTallyEvent>((serializedEvent) => ({
      ...serializedEvent,
      date: dayjs(serializedEvent.date),
    }))
    .sort((a, b) => {
      if (a.date.isSame(b.date)) return 0;
      return a.date.isBefore(b.date) ? 1 : -1;
    });
}

const TallyEventList: FC<TallyEventListProps> = ({
  tallyEvent,
  setTallyEvent,
  finishSelection,
}) => {
  const [tallyEvents, setTallyEvents] = useState<DeserializedTallyEvent[]>();

  const { isAuthenticated } = useContext(AuthContext);

  const [newTallyEventDate, setNewTallyEventDate] = useState(dayjs());
  const [newTallyEventDescription, setNewTallyEventDescription] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTallyEvents()
      .then((res) => setTallyEvents(deserializeAndSortTallyEvents(res)))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  const parsedTallyEvents = tallyEvents;

  const tallyEventRows = parsedTallyEvents?.map((value) => {
    const selected = tallyEvent?.id === value.id;
    const selectedCallback = () => {
      setTallyEvent(selected ? null : { ...value, date: value.date.format() });
    };
    return (
      <TallyEventRow
        key={value.id}
        selected={tallyEvent?.id == value.id}
        id={value.id}
        description={value.description}
        date={value.date}
        selectedCallback={selectedCallback}
      />
    );
  });

  const onSubmitTallyEvent = async () => {
    setSubmitting(true);
    await addTallyEvent({
      date: newTallyEventDate.format(),
      description: newTallyEventDescription,
    })
      .then((res) => {
        setTallyEvents(deserializeAndSortTallyEvents(res));
        setNewTallyEventDate(dayjs());
        setNewTallyEventDescription("");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="App">
      {isAuthenticated && (
        <div className="logout">
          <LogoutButton />
        </div>
      )}
      {isAuthenticated ? (
        <button
          disabled={tallyEvent === null}
          className="baggerButton"
          onClick={finishSelection}
        >
          Volgende
        </button>
      ) : (
        <LoginButton />
      )}
      <h1>
        <span className="avoidwrap">Wat is de</span>{" "}
        <span className="avoidwrap">gelegenheid?</span>
      </h1>
      <div className="new-tally-event-block">
        <NewTallyEvent
          date={newTallyEventDate}
          text={newTallyEventDescription}
          textCallback={setNewTallyEventDescription}
          dateCallback={(newDate: Date) => {
            setNewTallyEventDate(dayjs(newDate));
          }}
          disabled={submitting}
        />
        <button disabled={submitting} onClick={onSubmitTallyEvent}>
          {submitting ? "Bezig..." : "Nieuwe aanmaken"}
        </button>
      </div>
      <h2>we turven voor een hoop dingen, zoals:</h2>
      {loading ? "Laden..." : tallyEventRows}
    </div>
  );
};

export default TallyEventList;
