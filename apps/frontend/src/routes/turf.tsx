import { createFileRoute } from "@tanstack/react-router";
import Tally from "../components/turf/Tally.tsx";

export const Route = createFileRoute("/turf")({
  component: Tally,
  head: () => ({
    meta: [
      { title: "BAGGER turflijst" },
      {
        name: "description",
        content: "Hier kun je bijhouden wat je besteld hebt!",
      },
    ],
  }),
});
