import { tRouter, tProcedure } from "../config/trpc";
import z from "zod";
import { ParserWithInputOutput } from "@trpc/server/dist/core/parser";
import signUpController from "./controllers/sign-up";

const userRouter = tRouter({
  signUp: tProcedure
    .input<
      ParserWithInputOutput<
        { email: string; name: string; password: string },
        { email: string; name: string; password: string }
      >
    >(
      z.object({
        email: z.string().email(),
        name: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const signUp = await signUpController(input);
      return signUp;
    }),
  get: tProcedure.query(() => {
    return "no user found";
  }),
});

export default userRouter;
