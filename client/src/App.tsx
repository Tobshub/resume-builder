import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { appQueryClient, appTRPCClient } from "./context/query";
import LandingPage from "./landing";
import trpc from "./utils/trpc";
import * as storage from "./lib/localstorage";
import Login from "./auth/login";
import SignUp from "./auth/sign-up";
import Resumes, { NewResumeModal } from "./resumes/resume";

const router = createBrowserRouter([
  {
    path: "/builder/:resumeId",
    element: <>Hello world</>,
  },
  {
    path: "/resumes",
    element: <Resumes />,
    loader() {
      const token = storage.get("token");
      if (!token) {
        return redirect("/auth");
      }
      return token;
    },
    children: [
      {
        path: "new",
        element: <NewResumeModal />,
      },
    ],
  },
  {
    path: "/auth",
    loader({ request }) {
      const url = new URL(request.url);
      // go to login route
      if (url.pathname === "/auth") {
        return redirect("/auth/login");
      }
      return null;
    },
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
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
