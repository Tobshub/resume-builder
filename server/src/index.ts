import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { PrismaConnect } from "./config/prisma";
import trpcExpress from "./router";

config(); /** load environment variables */
PrismaConnect(); /** connect to mongodb cluster */

const app = express();

app.use(cors(), express.json());

app.use("/", trpcExpress, (req, res) => {
  res.send("no specified handler for this request");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`live (port ${PORT})`);
});
