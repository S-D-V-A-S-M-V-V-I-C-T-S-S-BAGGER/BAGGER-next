import { get, post } from "./api.ts";
import { getEnv } from "../lib/environment.ts";
import { TallyEvent, TallyEventSubmit } from "@repo/types";

const API_BASE_URL = getEnv().VITE_API_BASE_URL;

// TODO create endpoint and improve typing
export async function getTallyEvents(): Promise<TallyEvent[]> {
  return get(`${API_BASE_URL}/api/v0/tally/events`);
}

// TODO create endpoint and improve typing
export async function addTallyEvent(
  event: TallyEventSubmit,
): Promise<TallyEvent[]> {
  return post(`${API_BASE_URL}/api/v0/tally/events`, event);
}
