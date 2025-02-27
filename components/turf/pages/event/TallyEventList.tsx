"use client";
import {FC, useContext, useEffect, useState} from "react";
import {
    getTallyEventSheet,
    SerializedTallyEvent,
    submitTallyEvent,
    TallyEvent,
    TallyEventData,
} from "@/components/turf/pages/event/tallyEventSheet";
import dayjs from "dayjs";
import TallyEventRow from "@/components/turf/pages/event/TallyEventRow";
import NewTallyEvent from "@/components/turf/pages/event/NewTallyEvent";
import {AuthContext} from "@/components/auth/AuthContext";
import LogoutButton from "@/components/auth/LogoutButton";
import LoginButton from "@/components/auth/LoginButton";

type TallyEventListProps = {
    finishSelection: () => void;
    tallyEvent: SerializedTallyEvent | null;
    setTallyEvent: (event: SerializedTallyEvent | null) => void;
}

const TallyEventList: FC<TallyEventListProps> = ({tallyEvent, setTallyEvent, finishSelection}) => {
    const [tallyEvents, setTallyEvents] = useState<TallyEventData[]>();

    const authContextData = useContext(AuthContext);
    const authenticated = authContextData.isAuthenticated;

    const [newTallyEventDate, setNewTallyEventDate] = useState(dayjs());
    const [newTallyEventDescription, setNewTallyEventDescription] = useState("");

    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTallyEventSheet().then(res => setTallyEvents(res as TallyEventData[])).finally(() => setLoading(false));
    }, [authenticated]);

    const parsedTallyEvents = tallyEvents?.map((value, index): TallyEvent => {
        const [date, description] = value;
        const parsedDate = dayjs(date);
        return {
            description: description,
            date: parsedDate,
            id: index,
        };
    }).sort((a, b) => {
        if (a.date.isSame(b.date)) return 0;
        return a.date.isBefore(b.date) ? 1 : -1;
    });

    const tallyEventRows = parsedTallyEvents?.map((value) => {
        const selected = tallyEvent?.id === value.id;
        const selectedCallback = () => {
            setTallyEvent(selected ? null : {...value, date: value.date.format()});
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
        await submitTallyEvent(
            newTallyEventDate.format(),
            newTallyEventDescription
        )
            .then(res => {
                setTallyEvents(res as TallyEventData[]);
                setNewTallyEventDate(dayjs());
                setNewTallyEventDescription("");
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <div className="App">
            {authenticated && <div className="logout"><LogoutButton/></div>}
            {authenticated ? (
                <button
                    disabled={tallyEvent === null}
                    className="baggerButton"
                    onClick={finishSelection}
                >Volgende</button>
            ) : <LoginButton/>}
            <h1><span className="avoidwrap">Wat is de</span> <span className="avoidwrap">gelegenheid?</span></h1>
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
                <button
                    disabled={submitting}
                    onClick={onSubmitTallyEvent}
                >
                    {submitting ? "Bezig..." : "Nieuwe aanmaken"}
                </button>
            </div>
            <h2>we turven voor een hoop dingen, zoals:</h2>
            {loading ? "Laden..." : tallyEventRows}
        </div>
    );
};

export default TallyEventList;
