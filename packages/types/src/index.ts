export type QuoteRow = [string, string, string];
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
