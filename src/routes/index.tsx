import { createFileRoute } from "@tanstack/react-router";
import { PageHtml } from "@/lib/page-html";
import html from "../pages-html/home.body.html?raw";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Talent Jack | Multidisciplinary Creative" },
      { name: "description", content: "Scriptwriter, digital marketer, product designer, and developer." },
    ],
  }),
  component: () => (
    <PageHtml
      html={html}
      bodyClass="bg-background text-on-surface selection:bg-primary selection:text-on-primary-container font-body-md"
    />
  ),
});
