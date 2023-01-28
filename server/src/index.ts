import { config } from "dotenv";
import express from "express";
import cors from "cors";
import usePrisma, { PrismaConnect } from "./config/mongodb";

config(); /** load environment variables */
PrismaConnect(); /** connect to mongodb cluster */

const app = express();

app.use(cors(), express.json());

app.use("/", async (req, res) => {
  const users = await usePrisma.user.findMany();
  res.send({ users });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`live (port ${PORT})`);
});
