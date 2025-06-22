import { Quote, QuoteSubmit } from "@repo/types";
import { get, post } from "./api.ts";

export async function getQuotes(): Promise<Quote[]> {
  return get("http://localhost/api/v0/quotes");
}

export async function submitQuote(quote: QuoteSubmit): Promise<Quote[]> {
  return post("http://localhost/api/v0/quotes", quote);
}
