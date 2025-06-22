import express, { Request, Response } from "express";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { getSheetValues, SheetValues } from "./lib/GoogleApi.ts";
import quotesRouter from "./api/quotes.ts";

dayjs.extend(weekOfYear);

const router = express.Router();

router.get("/week", async function (req, res, next) {
  res.json(dayjs().week());
});

router.get("/bak", async function (req, res, next) {
  res.json(Math.random() < 0.17 ? "Trek bak" : "No spang");
});

const getBafkos = async (): Promise<SheetValues | null> => {
  if (process?.env?.BAFKO_SHEET_ID && process?.env?.BAFKO_SHEET_RANGE) {
    return getSheetValues(
      process.env.BAFKO_SHEET_ID,
      process.env.BAFKO_SHEET_RANGE,
    );
  }
  return null;
};

router.get("/bafko", async function (req, res, next) {
  const data = await getBafkos();
  if (data) {
    const random_index = Math.floor(Math.random() * data.length);
    const random_bafko = data[random_index];
    res.json({
      BAfko: random_bafko[0],
      betekenis: random_bafko[2],
    });
  } else {
    res.status(404).json({ error: "Could not find the sheet" });
  }
});

router.use("/quotes", quotesRouter);

export default router;
