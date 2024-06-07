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

    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getQuoteSheet().then(res => setQuotes(res as QuoteData[])).finally(() => setLoading(false));
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

    const onSubmitQuote = async () => {
        setSubmitting(true);
        await submitQuote(
            newQuoteDate.format("M/D/YYYY"),
            newQuotePerson,
            newQuoteText
        )
            .then(res => {
                setQuotes(res as QuoteData[]);
                setNewQuoteDate(dayjs());
                setNewQuotePerson("");
                setNewQuoteText("");
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <div className="App">
            <h1><span className="avoidwrap">BAGGER ZEGT</span> <span className="avoidwrap">VULGAIRE DINGEN</span></h1>
            <div className="new-quote-block">
                <NewQuote
                    date={newQuoteDate}
                    name={newQuotePerson}
                    text={newQuoteText}
                    nameCallback={setNewQuotePerson}
                    textCallback={setNewQuoteText}
                    dateCallback={(newDate: Date) => {
                        setNewQuoteDate(dayjs(newDate));
                    }}
                    disabled={submitting}
                 />
                <button
                    disabled={submitting}
                    onClick={onSubmitQuote}
                >
                    {submitting ? "Bezig met toevoegen..." : "Nieuwe quote toevoegen!"}
                </button>
            </div>
            <h2>we kramen een hoop troep uit, zoals:</h2>
            {loading ? "Laden..." : quoteRows}
        </div>
    );
};

export default QuoteList;
