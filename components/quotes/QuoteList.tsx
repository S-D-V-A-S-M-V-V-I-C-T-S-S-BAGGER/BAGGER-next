"use client";
import {FC, useEffect, useState} from "react";
import {getQuoteSheet, Quote, QuoteData, submitQuote} from "@/components/quotes/quoteSheet";
import dayjs from "dayjs";
import QuoteRow from "@/components/quotes/QuoteRow";
import NewQuote from "@/components/quotes/NewQuote";

const QuoteList: FC = () => {
    const [quotes, setQuotes] = useState<QuoteData[]>();

    const [newQuoteDate, setNewQuoteDate] = useState(dayjs());
    const [newQuotePerson, setNewQuotePerson] = useState("");
    const [newQuoteText, setNewQuoteText] = useState("");

    useEffect(() => {
        getQuoteSheet().then(res => setQuotes(res as QuoteData[]));
    }, []);

    const parsedQuotes = quotes?.map((value, index): Quote => {
        const [date, name, quote] = value;
        const parsedDate = dayjs(date, "M/D/YYYY");
        return {
            name,
            text: quote,
            date: parsedDate,
            id: index,
        };
    }).sort((a, b) => {
        return a.date.isBefore(b.date) ? 1 : -1;
    });

    const quoteRows = parsedQuotes?.map((value) => {
        return <QuoteRow key={value.id} name={value.name} text={value.text} date={value.date}/>;
    });

    const onSubmitQuote = () => submitQuote(
        newQuoteDate.format("M/D/YYYY"),
        newQuotePerson,
        newQuoteText
    ).then(res => {
        setQuotes(res as QuoteData[]);
        setNewQuoteDate(dayjs());
        setNewQuotePerson("");
        setNewQuoteText("");
    });

    return (
        <div className="App">
            <h1>BAGGER ZEGT VULGAIRE DINGEN</h1>
            <NewQuote
                date={newQuoteDate}
                name={newQuotePerson}
                text={newQuoteText}
                nameCallback={setNewQuotePerson}
                textCallback={setNewQuoteText}
                dateCallback={(newDate: Date) => {
                    setNewQuoteDate(dayjs(newDate));
                }}
             />
            <button
                onClick={onSubmitQuote}
            >
                Nieuwe quote toevoegen!
            </button>
            <h2>we kramen een hoop troep uit, zoals:</h2>
            {quoteRows}
        </div>
    );
};

export default QuoteList;
