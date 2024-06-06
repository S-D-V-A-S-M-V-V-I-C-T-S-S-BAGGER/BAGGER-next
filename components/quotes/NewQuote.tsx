"use client";
import * as React from "react";
import {FC} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./quotes.css";
import {Dayjs} from "dayjs";

export interface NewQuoteProps {
  name: string;
  text: string;
  date: Dayjs;
}

export interface NewQuoteElementProps extends NewQuoteProps {
  nameCallback: (name: string) => void;
  textCallback: (text: string) => void;
  dateCallback: (date: Date) => void;
}

const NewQuote: FC<NewQuoteElementProps> = (props) => {
  return (
    <>
      <input
        placeholder="Naam"
        value={props.name}
        onChange={event => props.nameCallback(event.target.value)}
      />
      <input
        placeholder="Quote"
        value={props.text}
        onChange={event => {
          props.textCallback(event.target.value);
        }}
      />
      <DatePicker
        selected={props.date.toDate()}
        onChange={(date: Date | null) => {
          props.dateCallback(date!);
        }}
      />
    </>
  );
};

export default NewQuote;
