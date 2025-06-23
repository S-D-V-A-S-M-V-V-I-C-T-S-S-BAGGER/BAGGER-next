import { createFileRoute } from "@tanstack/react-router";
import QuotePage from "../components/quotes/QuotePage.tsx";

export const Route = createFileRoute("/quotes")({
  component: QuotePage,
});
