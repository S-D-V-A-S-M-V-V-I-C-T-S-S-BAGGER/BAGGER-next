import express, { Request, Response } from "express";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekOfYear);

const router = express.Router();

router.get("/week", async function (req, res, next) {
  res.json(dayjs().week());
});

router.get("/bak", async function (req, res, next) {
  res.json(Math.random() < 0.17 ? "Trek bak" : "No spang");
});

export default router;
