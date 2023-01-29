import * as trpcExpress from "@trpc/server/adapters/express";
import { tRouter } from "./config/trpc";
import userRouter from "./users/user-router";
import { Router } from "express";

// merge trpc routers
const mergeRouter = tRouter({
  user: userRouter,
  // resume: ,
});

export type AppRouter = typeof mergeRouter;

const trpcRouter = trpcExpress.createExpressMiddleware({
  router: mergeRouter,
});

export default trpcRouter;
