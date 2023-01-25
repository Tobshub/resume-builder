import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BuilderPage from "./builder";

const router = createBrowserRouter([
  {
    path: "/builder",
    element: <BuilderPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

