"use client";
import {FC, useEffect, useState} from "react";
import {
    getTallyEventSheet,
    submitTallyEvent,
    TallyEvent,
    TallyEventData,
} from "@/components/tally_event/tallyEventSheet";
import dayjs from "dayjs";
import TallyEventRow from "@/components/tally_event/TallyEventRow";
import NewTallyEvent from "@/components/tally_event/NewTallyEvent";

const TallyEventList: FC = () => {
    const [tallyEvents, setTallyEvents] = useState<TallyEventData[]>();

    const [newTallyEventDate, setNewTallyEventDate] = useState(dayjs());
    const [newTallyEventDescription, setNewTallyEventDescription] = useState("");
    const [selectedTallyEvent, setSelectedTallyEvent] = useState<number>();

    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTallyEventSheet().then(res => setTallyEvents(res as TallyEventData[])).finally(() => setLoading(false));
    }, []);

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
        return <TallyEventRow key={value.id} selected={selectedTallyEvent == value.id} id={value.id} description={value.description} date={value.date} selectedCallback={setSelectedTallyEvent}/>;
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
