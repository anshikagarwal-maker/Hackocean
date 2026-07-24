import { createFileRoute } from "@tanstack/react-router";
import SubmergeApp from "@/submerge/App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SUBMERGE — Deep Ocean Intelligence Platform" },
      {
        name: "description",
        content:
          "Live deep-sea telemetry: chemical indexes, coral ecosystems, marine biodiversity and AI-driven ocean recovery.",
      },
      { property: "og:title", content: "SUBMERGE — Deep Ocean Intelligence Platform" },
      {
        property: "og:description",
        content:
          "Hyperrealistic ocean intelligence: telemetry, biodiversity, chemistry and recovery plans in real time.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: () => <SubmergeApp />,
});
