import { tRouter, tProcedure } from "../config/trpc";
import getAllResumes from "./controllers/get-all";

const resumeRouter = tRouter({
  getAll: tProcedure.query(async ({ ctx }) => {
    const token = ctx.auth.token;
    if (!token) {
      return { ok: false, message: "no_token" } as const;
    }

    const res = await getAllResumes(token);
    res;
  }),
});

export default resumeRouter;
