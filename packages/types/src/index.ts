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
