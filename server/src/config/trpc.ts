import { initTRPC, TRPCError } from "@trpc/server";

const trpc = initTRPC.context<{ auth: { token: string } }>().create();

export const tRouter = trpc.router;
export const tProcedure = trpc.procedure;
export const tMiddleWare = trpc.middleware;
export const tError = TRPCError;
