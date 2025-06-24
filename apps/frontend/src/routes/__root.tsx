import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import AuthContextProvider from "../components/auth/AuthContextProvider.tsx";
import "../styling/tailwind.css";
import "../styling/globals.css";

export const Route = createRootRoute({
  component: () => (
    <>
      <HeadContent />
      <AuthContextProvider>
        <Outlet />
      </AuthContextProvider>
      <TanStackRouterDevtools />
    </>
  ),
  head: () => ({
    meta: [
      { title: "BAGGER" },
      {
        name: "description",
        content:
          "De website van Studenten Dispuut Voor Alle Studies Maar Vooral Voor Informatie en Communicatie Technologische Soorten Studies BAGGER",
      },
    ],
  }),
});
