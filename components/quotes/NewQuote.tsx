"use client";
import * as React from "react";
import {FC} from "react";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./quotes.css";
import {Dayjs} from "dayjs";
import {nl} from "date-fns/locale";

registerLocale("nl", nl);

export interface NewQuoteProps {
    name: string;
    text: string;
    date: Dayjs;
    nameCallback: (name: string) => void;
    textCallback: (text: string) => void;
    dateCallback: (date: Date) => void;
    disabled?: boolean;
}

const NewQuote: FC<NewQuoteProps> = ({disabled = false, ...props}) => {
    return (
        <>
            <input
                disabled={disabled}
                placeholder="Naam"
                value={props.name}
                onChange={event => props.nameCallback(event.target.value)}
            />
            <input
                disabled={disabled}
                placeholder="Quote"
                value={props.text}
                onChange={event => {
                    props.textCallback(event.target.value);
                }}
            />
            <DatePicker
                disabled={disabled}
                selected={props.date.toDate()}
                onChange={(date: Date | null) => {
                    props.dateCallback(date!);
                }}
                withPortal={true}
                dateFormat="d/M/yyyy"
                locale="nl"
                excludeDateIntervals={[{start: new Date(), end: new Date(8.64e15)}]}
            />
        </>
    );
};

export default NewQuote;
