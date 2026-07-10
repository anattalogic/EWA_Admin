import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
