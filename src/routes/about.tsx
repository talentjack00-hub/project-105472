import { createFileRoute } from "@tanstack/react-router";
import { PageHtml } from "@/lib/page-html";
import html from "../pages-html/about.body.html?raw";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Talent Jack" },
      { name: "description", content: "About Talent Jack — approach, ethos, and story." },
    ],
  }),
  component: () => (
    <PageHtml
      html={html}
      bodyClass="bg-background text-on-surface font-body-md text-body-md selection:bg-primary selection:text-on-primary"
    />
  ),
});
