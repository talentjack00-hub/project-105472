import { createFileRoute } from "@tanstack/react-router";
import { PageHtml } from "@/lib/page-html";
import html from "../pages-html/contact.body.html?raw";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Talent Jack" },
      { name: "description", content: "Get in touch with Talent Jack — email, phone, LinkedIn, and address." },
      { property: "og:title", content: "Contact | Talent Jack" },
      { property: "og:description", content: "Reach Talent Jack by email, phone, or LinkedIn." },
    ],
  }),
  component: () => (
    <PageHtml
      html={html}
      bodyClass="bg-background text-on-surface font-body-md text-body-md selection:bg-primary selection:text-on-primary"
    />
  ),
});
