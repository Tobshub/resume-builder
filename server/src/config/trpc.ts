import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

// created for each request
export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const token = req.headers.authorization;
  return {
    auth: { token },
  };
};

type Context = inferAsyncReturnType<typeof createContext>;

const trpc = initTRPC.context<Context>().create();

export const tRouter = trpc.router;
export const tProcedure = trpc.procedure;
export const tMiddleWare = trpc.middleware;
export const tError = TRPCError;
