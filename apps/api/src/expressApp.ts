import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import apiRouter from "./api.ts";
import authRouter from "./auth.ts";

const expressApp = express();

expressApp.use(logger("dev"));
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: false }));
expressApp.use(cookieParser(process.env.COOKIE_SIGN_SECRET));
// TODO configure static files
// app.use(express.static(path.join(__dirname, "public")));
// TODO configure CORS
expressApp.use(cors());

const api_version_prefix = "v0";
expressApp.use(`/api/${api_version_prefix}/`, apiRouter);
expressApp.use("/api/auth", authRouter);

export default expressApp;
