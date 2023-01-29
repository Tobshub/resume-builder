import { tRouter, tProcedure } from "../config/trpc";

const userRouter = tRouter({
  create: tProcedure.query(() => {
    return "hello world";
  }),
  get: tProcedure.query(() => {
    return "no user found";
  }),
});

export default userRouter;
