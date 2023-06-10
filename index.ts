import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { LooseAuthProp } from "@clerk/clerk-sdk-node";

import dotenv from "dotenv";
import { router } from "./routes";

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(router);

app.get("/", (req, res) => {
  res.json({ message: "Blog!" });
});

const CONNECTION_URL = process.env.MONGODB_URI;
console.log(process.env.PORT);

mongoose
  .connect(`${CONNECTION_URL}`)
  .then(() => {
    app.listen(port, () => console.log(`App listening at port ${port}`));
  })
  .catch((error) => console.error(error));
