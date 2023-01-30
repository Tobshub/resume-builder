import { tRouter, tProcedure } from "../config/trpc";
import z from "zod";
import signUpController from "./controllers/sign-up";
import loginController from "./controllers/login";

const userRouter = tRouter({
  signUp: tProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string(),
        password: z.string().min(8).max(64 /** all for opusbopus */),
      })
    )
    .mutation(async ({ input }) => {
      const signUp = await signUpController(input);
      return signUp;
    }),
  login: tProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const login = await loginController(input);
      return login;
    }),
});

export default userRouter;
