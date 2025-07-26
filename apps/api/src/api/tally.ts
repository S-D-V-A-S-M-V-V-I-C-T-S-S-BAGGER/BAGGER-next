import {
  TallyEvent,
  TallyEventRow,
  TallyEventSubmit,
  TallyRowSubmit,
} from "@repo/types";
import express, { Request, Response } from "express";
import { appendSheetValues, getSheetValues } from "../lib/PersonalGoogleApi.ts";

const router = express.Router();

type TallySubmitRequest = Request<never, string, TallyRowSubmit, never, never>;

router.post("/entries", async function (req: TallySubmitRequest, res) {
  const tallyRow = req.body;
  const entryStrings = tallyRow.entries.flatMap((entry) => [
    entry.name,
    entry.price.toFixed(),
    entry.amount.toFixed(),
  ]);

  // TODO add type
  const row: string[] = [
    tallyRow.person,
    tallyRow.eventId.toFixed(),
    tallyRow.total.toFixed(),
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

  const response: TallyEvent[] = (values as TallyEventRow[]).map(
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

  const row: TallyEventRow = [tallyevent.date, tallyevent.description];

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
