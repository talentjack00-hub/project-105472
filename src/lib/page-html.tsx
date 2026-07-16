import { useEffect, useRef } from "react";
import { useRouter } from "@tanstack/react-router";

interface Props {
  html: string;
  bodyClass?: string;
}

/** Renders raw HTML from the design source and intercepts internal link clicks
 *  so navigation stays inside the TanStack router. */
export function PageHtml({ html, bodyClass }: Props) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyClass) document.body.className = bodyClass;
  }, [bodyClass]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("a") as HTMLAnchorElement | null;
      if (!t) return;
      const href = t.getAttribute("href") || "";
      if (href.startsWith("/")) {
        e.preventDefault();
        router.navigate({ to: href });
      }
    };
    el.addEventListener("click", onClick);
    return () => el.removeEventListener("click", onClick);
  }, [router, html]);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}
