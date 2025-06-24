import express from "express";
import path from "node:path";

const router = express.Router();
export default router;

const PUBLIC_FOLDER_PATH = process.env.PUBLIC_FOLDER_PATH!;

// Serve paths of the form /public/lichtingfotos/file.extension
router.get(/\/lichtingfotos\/\w+\.\w+$/, function (req, res) {
  const fileNameRe = /(?<=\/lichtingfotos\/)\w+\.\w+$/;
  const fileNameResult = fileNameRe.exec(req.url);
  if (fileNameResult === null) {
    console.log("Attempt to access", req.url);
    res.sendStatus(404);
    return;
  }
  const fileName = fileNameResult[0];

  const filePath = path.join(PUBLIC_FOLDER_PATH, "lichtingfotos", fileName);

  res.sendFile(filePath);
});

// Serve paths of the form /public/file.extension
router.get(/\/\w+\.\w+$/, function (req, res) {
  const fileNameRe = /\w+\.\w+$/;
  const fileNameResult = fileNameRe.exec(req.url);
  if (fileNameResult === null) {
    console.log("Attempt to access", req.url);
    res.sendStatus(404);
    return;
  }
  const fileName = fileNameResult[0];

  const filePath = path.join(PUBLIC_FOLDER_PATH, fileName);

  res.sendFile(filePath);
});
