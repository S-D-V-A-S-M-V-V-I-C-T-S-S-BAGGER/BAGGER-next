import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

const expressApp = express();

expressApp.use(logger("dev"));
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: false }));
// TODO configure signed cookies
expressApp.use(cookieParser());
// TODO configure static files
// app.use(express.static(path.join(__dirname, "public")));
// TODO configure CORS
expressApp.use(cors());

export default expressApp;
