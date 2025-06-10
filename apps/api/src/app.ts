import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// TODO configure signed cookies
app.use(cookieParser());
// TODO configure static files
// app.use(express.static(path.join(__dirname, "public")));
// TODO configure CORS
app.use(cors());

export default app;
