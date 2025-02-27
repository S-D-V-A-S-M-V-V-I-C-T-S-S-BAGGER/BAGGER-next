"use client";
import * as React from "react";
import {FC} from "react";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./tallyEvent.css";
import {Dayjs} from "dayjs";
import {nl} from "date-fns/locale";

registerLocale("nl", nl);

export interface NewTallyEventProps {
    text: string;
    date: Dayjs;
    textCallback: (text: string) => void;
    dateCallback: (date: Date) => void;
    disabled?: boolean;
}

const NewTallyEvent: FC<NewTallyEventProps> = ({disabled = false, textCallback, text, date, dateCallback}) => {
    return (
        <>
            <input
                disabled={disabled}
                placeholder="Beschrijving"
                value={text}
                onChange={event => {
                    textCallback(event.target.value);
                }}
            />
            <div className="datepicker">
                <DatePicker
                    disabled={disabled}
                    selected={date.toDate()}
                    onChange={(date: Date | null) => {
                        dateCallback(date!);
                    }}
                    withPortal={true}
                    dateFormat="d/M/yyyy"
                    locale="nl"
                />
            </div>

        </>
    );
};

export default NewTallyEvent;
