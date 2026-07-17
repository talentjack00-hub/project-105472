import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { PageHtml } from "@/lib/page-html";
import html from "../pages-html/cv.body.html?raw";

function CvPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("print") === "1") {
      const t = setTimeout(() => window.print(), 600);
      return () => clearTimeout(t);
    }
  }, []);
  return (
    <PageHtml
      html={html}
      bodyClass="bg-background text-on-surface font-body-md overflow-x-hidden"
    />
  );
}

export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [
      { title: "CV | Talent Jack" },
      { name: "description", content: "Curriculum vitae and professional experience." },
    ],
  }),
  component: CvPage,
});
