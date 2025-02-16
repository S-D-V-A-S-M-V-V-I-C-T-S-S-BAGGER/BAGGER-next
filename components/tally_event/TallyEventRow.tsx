"use client";
import {FC} from "react";
import "./tallyEvent.css";
import {Dayjs} from "dayjs";

require('dayjs/locale/nl');

type QuoteRowProps = {
    id: number;
    description: string;
    date: Dayjs;
    selectedCallback: (text: number) => void;
    selected: boolean;
}

const TallyEventRow: FC<QuoteRowProps> = ({id, date, description, selectedCallback, selected}) => {
    return (
        <div className={selected ? "tally-event-block selected" : "tally-event-block"} onClick={() => {
            selectedCallback(id);
        }}>
            <p className="tally-event-top">
                {date.locale("nl").format("dddd D MMMM YYYY")}
            </p>
            <p className="tally-event-bottom">{description}</p>
        </div>
    );
};

export default TallyEventRow;
