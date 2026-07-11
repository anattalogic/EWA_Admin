import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { ErrorBoundaryComponent } from "../components/layout/ErrorBoundaryComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    errorElement: <ErrorBoundaryComponent />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
