import { createFileRoute } from "@tanstack/react-router";
import SiteMap from "../components/sitemap/SiteMap.tsx";

export const Route = createFileRoute("/sitemap")({
  component: SiteMap,
  head: () => ({
    meta: [
      { title: "BAGGER sitemap" },
      {
        name: "description",
        content: "Een overzicht van de beschikbare paginas",
      },
    ],
  }),
});
