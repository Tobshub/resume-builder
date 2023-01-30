import { QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import BuilderPage from "./builder";
import { appQueryClient, appTRPCClient } from "./context/query";
import LandingPage from "./landing";
import trpc from "./utils/trpc";
import * as storage from "./lib/localstorage";
import Login from "./auth";

const router = createBrowserRouter([
  {
    path: "/builder",
    element: <BuilderPage />,
    loader: () => {
      const token = storage.get("token");
      if (!token) {
        return redirect("/auth");
      }
      return token;
    },
  },
  {
    path: "/auth",
    element: <Login />,
  },
  {
    path: "/",
    element: <LandingPage />,
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

