import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { LooseAuthProp } from "@clerk/clerk-sdk-node";

import { router } from "./routes";
import { corsOptions } from "./corsOptions/corsOptions";
import clerk, { createClerkClient } from "@clerk/clerk-sdk-node";

const clerkCLient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

dotenv.config({ path: __dirname + "/.env.local" });
const app = express();
const port = process.env.PORT;

declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  res.json({ message: "Blog!" });
});

const CONNECTION_URL = process.env.MONGODB_URI;

mongoose
  .connect(`${CONNECTION_URL}`)
  .then(() => {
    app.listen(port, () => console.log(`App listening at port ${port}`));
  })
  .catch((error) => console.error(error));
