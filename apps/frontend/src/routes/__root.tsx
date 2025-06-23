import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import AuthContextProvider from "../components/auth/AuthContextProvider.tsx";
import "../styling/tailwind.css";
import "../styling/globals.css";

export const Route = createRootRoute({
  component: () => (
    <>
      <AuthContextProvider>
        <Outlet />
      </AuthContextProvider>
      <TanStackRouterDevtools />
    </>
  ),
});
