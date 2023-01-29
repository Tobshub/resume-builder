import { initTRPC, TRPCError } from "@trpc/server";

const trpc = initTRPC.create();

export const tRouter = trpc.router;
export const tProcedure = trpc.procedure;
export const tError = TRPCError;
