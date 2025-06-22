import express, { Request, Response } from "express";
import { appendSheetValues, getSheetValues } from "../lib/PersonalGoogleApi.ts";
import { QuoteSubmit, QuoteRow } from "@repo/types";

const router = express.Router();

// TODO forward in nicer format?
const getQuotes = async function (req: Request, res: Response) {
  const values = await getSheetValues(
    req,
    res,
    process.env.QUOTE_SHEET_ID!,
    process.env.QUOTE_SHEET_RANGE!,
  );

  if (values === undefined || values === null) {
    res.status(500).send("Could not connect to database");
    return;
  }

  res.json(values);
};
router.get("/", getQuotes);

router.post("/", async function (req: QuoteSubmitRequest, res, next) {
  const quote = req.body;

  const row = [quote.date, quote.name, quote.text];

  await appendSheetValues(
    req,
    res,
    process.env.QUOTE_SHEET_ID!,
    process.env.QUOTE_SHEET_RANGE!,
    [row],
  );
});

type QuoteSubmitRequest = Request<never, QuoteRow[], QuoteSubmit, never, never>;

export default router;
