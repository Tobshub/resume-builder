import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BuilderPage from "./builder";
import { appQueryClient, appTRPCClient } from "./context/query";
import trpc from "./utils/trpc";

const router = createBrowserRouter([
  {
    path: "/builder",
    element: <BuilderPage />,
  },
]);

export default function App() {
  return (
    <trpc.Provider client={appTRPCClient} queryClient={appQueryClient}>
      <QueryClientProvider client={appQueryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

