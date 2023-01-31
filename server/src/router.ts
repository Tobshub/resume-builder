import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext, tRouter } from "./config/trpc";
import userRouter from "./users/user-router";
import resumeRouter from "./resumes/resume-router";

// merge trpc routers
const mergeRouter = tRouter({
  user: userRouter,
  resume: resumeRouter,
});

export type AppRouter = typeof mergeRouter;

const trpcRouter = trpcExpress.createExpressMiddleware({
  router: mergeRouter,
  createContext,
});

export default trpcRouter;
