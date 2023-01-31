import { tRouter, tProcedure } from "../config/trpc";
import z from "zod";
import getAllResumes from "./controllers/get-all";

const resumeRouter = tRouter({
  getAll: tProcedure.query(async ({ ctx }) => {
    const token = ctx.auth.token;
    if (token) {
      const res = await getAllResumes(token);
      return res;
    } else {
      return { ok: false as const, message: "no_token" as const };
    }
  }),
});

export default resumeRouter;
