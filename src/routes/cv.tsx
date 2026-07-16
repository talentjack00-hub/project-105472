import { createFileRoute } from "@tanstack/react-router";
import { PageHtml } from "@/lib/page-html";
import html from "../pages-html/cv.body.html?raw";

export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [
      { title: "CV | Talent Jack" },
      { name: "description", content: "Curriculum vitae and professional experience." },
    ],
  }),
  component: () => (
    <PageHtml
      html={html}
      bodyClass="bg-background text-on-surface font-body-md overflow-x-hidden"
    />
  ),
});
