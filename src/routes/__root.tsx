import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const TAILWIND_CONFIG = `tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "outline": "#99907c","surface-container": "#201f1f","outline-variant": "#4d4635",
        "secondary-container": "#474746","tertiary-fixed": "#dbe1ff","inverse-surface": "#e5e2e1",
        "on-background": "#e5e2e1","secondary-fixed": "#e5e2e1","primary": "#f2ca50",
        "on-tertiary-container": "#254188","surface-tint": "#e9c349","on-secondary-fixed": "#1c1b1b",
        "background": "#131313","primary-fixed-dim": "#e9c349","on-surface-variant": "#d0c5af",
        "secondary": "#c8c6c5","error": "#ffb4ab","tertiary": "#bfcdff","on-surface": "#e5e2e1",
        "surface-container-low": "#1c1b1b","surface-container-highest": "#353534","error-container": "#93000a",
        "tertiary-container": "#97b0ff","on-primary-container": "#554300","surface-bright": "#3a3939",
        "surface-container-high": "#2a2a2a","on-primary-fixed": "#241a00",
        "surface-container-lowest": "#0e0e0e","on-error-container": "#ffdad6",
        "on-secondary-fixed-variant": "#474746","surface-dim": "#131313","inverse-primary": "#735c00",
        "on-primary-fixed-variant": "#574500","surface": "#131313","tertiary-fixed-dim": "#b4c5ff",
        "on-secondary-container": "#b7b5b4","on-primary": "#3c2f00","inverse-on-surface": "#313030",
        "on-tertiary-fixed-variant": "#27438a","secondary-fixed-dim": "#c8c6c5",
        "primary-container": "#d4af37","on-tertiary": "#082b72","surface-variant": "#353534",
        "on-tertiary-fixed": "#00174b","primary-fixed": "#ffe088","on-secondary": "#313030",
        "on-error": "#690005"
      },
      borderRadius: { "DEFAULT": "0.25rem","lg": "0.5rem","xl": "0.75rem","full": "9999px" },
      spacing: { "container-max": "1200px","margin-desktop": "64px","unit": "8px","margin-mobile": "20px","gutter": "24px" },
      maxWidth: { "container-max": "1200px" },
      fontFamily: {
        "body-lg": ["Inter"],"body-md": ["Inter"],"headline-md": ["Playfair Display"],
        "label-md": ["Inter"],"display-lg": ["Playfair Display"],
        "display-lg-mobile": ["Playfair Display"],"headline-sm": ["Playfair Display"]
      },
      fontSize: {
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "headline-md": ["32px", { lineHeight: "40px", fontWeight: "600" }],
        "label-md": ["14px", { lineHeight: "20px", letterSpacing: "0.05em", fontWeight: "500" }],
        "display-lg": ["64px", { lineHeight: "72px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-lg-mobile": ["40px", { lineHeight: "48px", letterSpacing: "-0.01em", fontWeight: "700" }],
        "headline-sm": ["24px", { lineHeight: "32px", fontWeight: "600" }]
      }
    }
  }
};`;

const SHARED_CSS = `
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; font-family: 'Material Symbols Outlined'; }
.glass-card { background: rgba(26,26,26,0.6); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); }
.gold-glow { background: radial-gradient(circle, rgba(212,175,55,0.08) 0%, rgba(10,10,10,0) 70%); }
.text-reveal { animation: textReveal 1.2s cubic-bezier(0.77,0,0.175,1) forwards; }
@keyframes textReveal { 0% { transform: translateY(100%); opacity: 0;} 100% { transform: translateY(0); opacity: 1;} }
.scroll-indicator { animation: bounce 2s infinite; }
@keyframes bounce { 0%,20%,50%,80%,100% { transform: translateY(0);} 40% { transform: translateY(-10px);} 60% { transform: translateY(-5px);} }
body { background: #131313; color: #e5e2e1; }
`;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Talent Jack | Multidisciplinary Creative" },
      { name: "description", content: "Portfolio of Talent Jack — scriptwriter, digital marketer, product designer, and developer." },
      { property: "og:title", content: "Talent Jack | Multidisciplinary Creative" },
      { property: "og:description", content: "Portfolio of Talent Jack — scriptwriter, digital marketer, product designer, and developer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" },
    ],
    scripts: [
      { src: "https://cdn.tailwindcss.com?plugins=forms,container-queries" },
      { children: TAILWIND_CONFIG, id: "tailwind-config" },
    ],
    styles: [{ children: SHARED_CSS }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
