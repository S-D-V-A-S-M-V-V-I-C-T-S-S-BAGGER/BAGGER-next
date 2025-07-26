import {
  TallyEntrySheetRow,
  TallyEvent,
  TallyEventSheetRow,
  TallyEventSubmit,
  TallyRowSheetRow,
  TallyRowSubmit,
} from "@repo/types";
import express, { Request, Response } from "express";
import { appendSheetValues, getSheetValues } from "../lib/PersonalGoogleApi.ts";

const router = express.Router();

type TallySubmitRequest = Request<never, string, TallyRowSubmit, never, never>;

router.post("/entries", async function (req: TallySubmitRequest, res) {
  const tallyRow = req.body;
  const entryStrings = tallyRow.entries.flatMap(
    (entry): TallyEntrySheetRow => [entry.name, entry.price, entry.amount],
  );

  const row: TallyRowSheetRow = [
    tallyRow.person,
    tallyRow.eventId,
    tallyRow.total,
    ...entryStrings,
  ];

  await appendSheetValues(
    req,
    res,
    process.env.TURF_SHEET_ID!,
    process.env.TURF_SHEET_RANGE!,
    [row],
  );

  res.sendStatus(201);
});

const getTallyEvents = async function (
  req: Request<never, TallyEvent[]>,
  res: Response,
) {
  const values = await getSheetValues(
    req,
    res,
    process.env.TURF_SHEET_ID!,
    process.env.TURF_EVENT_SHEET_RANGE!,
  ).catch((err) => {
    console.error(req, err);
    return null;
  });

  if (values === undefined || values === null) {
    res.status(500).send("Could not connect to database");
    return;
  }

  const response: TallyEvent[] = (values as TallyEventSheetRow[]).map(
    (value, index) => {
      const [date, description] = value;
      return {
        id: index,
        date: date,
        description: description,
      };
    },
  );

  res.json(response);
};

router.get("/events", getTallyEvents);

type TallyEventSubmitRequest = Request<
  never,
  TallyEvent[],
  TallyEventSubmit,
  never,
  never
>;

router.post("/events", async function (req: TallyEventSubmitRequest, res) {
  const tallyevent = req.body;

  const row: TallyEventSheetRow = [tallyevent.date, tallyevent.description];

  await appendSheetValues(
    req,
    res,
    process.env.TURF_SHEET_ID!,
    process.env.TURF_EVENT_SHEET_RANGE!,
    [row],
  );

  await getTallyEvents(req, res);
});

export default router;
