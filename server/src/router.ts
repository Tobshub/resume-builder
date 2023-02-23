import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext, tRouter } from "./config/trpc";
import userRouter from "./users/user-router";
import resumeRouter from "./resumes/resume-router";

// merge trpc routers
const appRouter = tRouter({
  user: userRouter,
  resume: resumeRouter,
});

export type AppRouter = typeof appRouter;

const trpcRouter = trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
});

export default trpcRouter;
