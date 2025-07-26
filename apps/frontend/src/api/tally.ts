import { post } from "./api.ts";
import { getEnv } from "../lib/environment.ts";
import { TallyRowSubmit } from "@repo/types";

const API_BASE_URL = getEnv().VITE_API_BASE_URL;

export async function addTallyEntry(entry: TallyRowSubmit): Promise<void> {
  await post(`${API_BASE_URL}/api/v0/tally/entries`, entry);
}
