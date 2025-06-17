import { google, sheets_v4 } from "googleapis";
import { GaxiosError, GaxiosResponse } from "gaxios";
import { deleteSession, getSessionUser } from "./session.ts";
import { Request, Response } from "express";
import { SheetContent } from "./GoogleApi.ts";

async function handleAuthError<T>(
  req: Request,
  res: Response,
  promise: Promise<T>,
): Promise<T | undefined> {
  return promise.catch(async (err: GaxiosError) => {
    if (
      (err.status !== undefined && [401, 403].includes(err.status)) ||
      err.message === "No refresh token is set."
    ) {
      await deleteSession(req, res, false).catch();
      return undefined;
    } else {
      throw err;
    }
  });
}

export async function getSheet(
  req: Request,
  res: Response,
  spreadsheetId: string,
  range: string,
): Promise<SheetContent> {
  const sessionUser = await getSessionUser(req);

  if (!sessionUser) {
    return null;
  }

  const sheets = google.sheets({ version: "v4", auth: sessionUser });

  return handleAuthError(
    req,
    res,
    sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    }),
  );
}

export type SheetValues =
  GaxiosResponse<sheets_v4.Schema$ValueRange>["data"]["values"];

export async function getSheetValues(
  req: Request,
  res: Response,
  spreadsheetId: string,
  range: string,
): Promise<SheetValues | null> {
  const sheetData = await getSheet(req, res, spreadsheetId, range);
  return sheetData?.data.values;
}

export async function appendSheetValues(
  req: Request,
  res: Response,
  spreadsheetId: string,
  range: string,
  values: string[][],
  valueInputOption: "RAW" | "USER_ENTERED" = "RAW",
) {
  const sessionUser = await getSessionUser(req);

  if (!sessionUser) {
    return null;
  }

  const sheets = google.sheets({ version: "v4", auth: sessionUser });

  return handleAuthError(
    req,
    res,
    sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption,
      requestBody: {
        values,
      },
    }),
  );
}
