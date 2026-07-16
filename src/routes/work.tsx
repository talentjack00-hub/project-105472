import { createFileRoute } from "@tanstack/react-router";
import { PageHtml } from "@/lib/page-html";
import html from "../pages-html/work.body.html?raw";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Talent Jack | Work Portfolio" },
      { name: "description", content: "Selected work across product design, development, and creative direction." },
    ],
  }),
  component: () => (
    <PageHtml
      html={html}
      bodyClass="bg-background text-on-background selection:bg-primary selection:text-on-primary"
    />
  ),
});
