import { createFileRoute } from "@tanstack/react-router";
import QuotePage from "../components/quotes/QuotePage.tsx";

export const Route = createFileRoute("/quotes")({
  component: QuotePage,
  head: () => ({
    meta: [
      { title: "BAGGER quotelijst" },
      {
        name: "description",
        content: "Alle vuige dingen die BAGGER zegt",
      },
    ],
  }),
});
