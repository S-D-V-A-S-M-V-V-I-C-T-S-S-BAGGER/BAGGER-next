import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import apiRouter from "./api.ts";
import authRouter from "./auth.ts";
import publicRouter from "./public.ts";

const expressApp = express();

expressApp.use(logger("dev"));
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: false }));
expressApp.use(cookieParser(process.env.COOKIE_SIGN_SECRET));
// TODO configure CORS
expressApp.use(cors());

expressApp.use("/public", publicRouter);
expressApp.use("/api/v0/", apiRouter);
expressApp.use("/api/auth", authRouter);

export default expressApp;
