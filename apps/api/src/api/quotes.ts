import express, { Request, Response } from "express";
import { appendSheetValues, getSheetValues } from "../lib/PersonalGoogleApi.ts";
import { Quote, QuoteSubmit, QuoteRow } from "@repo/types";

const router = express.Router();

// TODO add pagination?
const getQuotes = async function (req: Request, res: Response) {
  const values = await getSheetValues(
    req,
    res,
    process.env.QUOTE_SHEET_ID!,
    process.env.QUOTE_SHEET_RANGE!,
  ).catch((err) => {
    console.error(req, err);
    return null;
  });

  if (values === undefined || values === null) {
    res.status(500).send("Could not connect to database");
    return;
  }

  const response: Quote[] = (values as QuoteRow[]).map((value, index) => {
    const [date, name, text] = value;
    return {
      id: index,
      name: name,
      text: text,
      date: date,
    };
  });

  res.json(response);
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

  await getQuotes(req, res);
});

type QuoteSubmitRequest = Request<never, QuoteRow[], QuoteSubmit, never, never>;

export default router;
