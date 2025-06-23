import { FC, useEffect, useState } from "react";
import { Quote, QuoteSubmit } from "@repo/types";
import { getQuotes, submitQuote } from "../../api/quotes.ts";
import dayjs, { Dayjs } from "dayjs";
import QuoteRow from "./QuoteRow.tsx";
import NewQuote from "./NewQuote.tsx";

type DeserializedQuote = Omit<Quote, "date"> & { date: Dayjs };

const QuoteList: FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>();

  const [newQuoteDate, setNewQuoteDate] = useState(dayjs());
  const [newQuotePerson, setNewQuotePerson] = useState("");
  const [newQuoteText, setNewQuoteText] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuotes()
      .then((res) => setQuotes(res))
      .finally(() => setLoading(false));
  }, []);

  const parsedQuotes = quotes
    ?.map((value): DeserializedQuote => {
      const { date, name, text, id } = value;
      const parsedDate = dayjs(date, "M/D/YYYY");
      return {
        name,
        text: text,
        date: parsedDate,
        id: id,
      };
    })
    .sort((a, b) => {
      return a.date.isBefore(b.date) ? 1 : -1;
    });

  const quoteRows = parsedQuotes?.map((value) => {
    return (
      <QuoteRow
        key={value.id}
        name={value.name}
        text={value.text}
        date={value.date}
      />
    );
  });

  const onSubmitQuote = async () => {
    setSubmitting(true);
    const serializedQuote: QuoteSubmit = {
      date: newQuoteDate.format("M/D/YYYY"),
      name: newQuotePerson,
      text: newQuoteText,
    };
    await submitQuote(serializedQuote)
      .then((res) => {
        setQuotes(res);
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
      <h1>
        <span className="avoidwrap">BAGGER ZEGT</span>{" "}
        <span className="avoidwrap">VULGAIRE DINGEN</span>
      </h1>
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
        <button disabled={submitting} onClick={onSubmitQuote}>
          {submitting ? "Bezig met toevoegen..." : "Nieuwe quote toevoegen!"}
        </button>
      </div>
      <h2>we kramen een hoop troep uit, zoals:</h2>
      {loading ? "Laden..." : quoteRows}
    </div>
  );
};

export default QuoteList;
