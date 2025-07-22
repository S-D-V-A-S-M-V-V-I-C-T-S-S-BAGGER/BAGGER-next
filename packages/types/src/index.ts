type QuoteDate = string;
type QuoteName = string;
type QuoteText = string;

export type QuoteRow = [
  // date
  QuoteDate,
  // name
  QuoteName,
  // text
  QuoteText,
];

export type Quote = {
  id: number;
  name: string;
  text: string;
  date: string;
};
export type QuoteSubmit = {
  name: string;
  text: string;
  // M/D/YYYY
  date: string;
};

export type TallyEvent = {
  id: number;
  description: string;
  // ISO8601, without fraction seconds e.g. '2020-04-02T08:02:17-05:00'
  date: string;
};

export type TallyEventSubmit = Omit<TallyEvent, "id">;
