import { Quote, QuoteSubmit } from "@repo/types";
import { get, post } from "./api.ts";
import { getEnv } from "../lib/environment.ts";

const API_BASE_URL = getEnv().VITE_API_BASE_URL;

export async function getQuotes(): Promise<Quote[]> {
  return get(`${API_BASE_URL}/api/v0/quotes`);
}

export async function submitQuote(quote: QuoteSubmit): Promise<Quote[]> {
  return post(`${API_BASE_URL}/api/v0/quotes`, quote);
}
