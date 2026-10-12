import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieNotice } from "@/components/cookie-notice";

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

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

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

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Joint Building & Construction Council" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "JBCC" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preload", href: "/fonts/poppins-latin-400.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: "/fonts/poppins-latin-600.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  // Signals that React has hydrated and dev-mode styles are applied; end-to-end tests wait for it.
  useEffect(() => { document.documentElement.dataset["hydrated"] = "true"; }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <a href="#main-content" className="sr-only z-[80] focus:inline-flex focus:min-h-11 focus:items-center bg-background px-4 py-3 text-sm font-medium text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to main content</a>
      <SiteHeader />
      <div id="main-content" tabIndex={-1} className="outline-none"><Outlet /></div>
      <SiteFooter />
      <CookieNotice />
      <RouteAnnouncer />
    </QueryClientProvider>
  );
}

/** Announces the new page title to screen readers and moves focus to the main content after client-side navigation. */
function RouteAnnouncer() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const first = useRef(true);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const id = window.setTimeout(() => {
      setMessage(`${document.title} page loaded`);
      document.getElementById("main-content")?.focus({ preventScroll: true });
    }, 120);
    return () => window.clearTimeout(id);
  }, [pathname]);
  return <div id="route-announcer" className="sr-only" role="status" aria-live="polite" aria-atomic="true">{message}</div>;
}
