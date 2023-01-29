import { QueryClient } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import trpc from "../utils/trpc";
import env from "../data/env.json";

// create react-query client
export const appQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false /** add to individual queries is needed */,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 /** 1 minute */,
    },
  },
});
// create trpc client
export const appTRPCClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: env.SERVER_URL,
    }),
  ],
});
