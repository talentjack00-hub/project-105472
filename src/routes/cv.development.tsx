import { createFileRoute } from "@tanstack/react-router";
import { PageHtml } from "@/lib/page-html";
import html from "../pages-html/cv-development.body.html?raw";

export const Route = createFileRoute("/cv/development")({
  head: () => ({
    meta: [
      { title: "Development & Certificates | Talent Jack" },
      { name: "description", content: "Development track record and certificates." },
    ],
  }),
  component: () => (
    <PageHtml
      html={html}
      bodyClass="bg-background text-on-surface font-body-md text-body-md overflow-x-hidden"
    />
  ),
});
