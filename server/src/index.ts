import { config } from "dotenv";
import express from "express";
import cors from "cors";
import usePrisma, { PrismaConnect } from "./config/prisma";
import trpcExpress from "./router";

config(); /** load environment variables */
PrismaConnect(); /** connect to mongodb cluster */

export const env = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET_KEY,
};

const app = express();

app.use(cors(), express.json());

app.use("/", trpcExpress, (req, res) => {
  res.send("no specified handler for this request");
});

const PORT = env.port || 3000;

app.listen(PORT, () => {
  console.log(`live (port ${PORT})`);
});
