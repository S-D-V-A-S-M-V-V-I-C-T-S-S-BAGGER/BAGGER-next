import { post } from "./api.ts";
import { getEnv } from "../lib/environment.ts";

const API_BASE_URL = getEnv().VITE_API_BASE_URL;

// TODO create endpoint and improve typing
export async function addTallyEntry(entry: string[][]): Promise<void> {
  await post(`${API_BASE_URL}/api/v0/tally/entries`, entry);
}
