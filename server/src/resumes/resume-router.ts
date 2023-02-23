import { z } from "zod";
import { tRouter, tProcedure } from "../config/trpc";
import { getAllResumes, getResume } from "./controllers";

const resumeRouter = tRouter({
  getAll: tProcedure.query(async ({ ctx }) => {
    const { token } = ctx.auth;
    if (!token) {
      return { ok: false, message: "no_token" } as const;
    }

    const res = await getAllResumes(token);
    res;
  }),
  getOne: tProcedure.input(z.string({ description: "Unique resume ID" })).query(async ({ ctx, input }) => {
    const { token } = ctx.auth;
    if (!token) {
      return { ok: false, message: "no_token" } as const;
    }

    const res = await getResume(token, input);
    res;
  }),
});

export default resumeRouter;
