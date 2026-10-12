import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

export const COOKIE_NOTICE_KEY = "jbcc-cookie-notice";

/** Informational notice: the site sets no tracking cookies, so there is nothing to opt in to. */
export function CookieNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      setOpen(window.localStorage.getItem(COOKIE_NOTICE_KEY) !== "dismissed");
    } catch {
      setOpen(true);
    }
  }, []);

  const dismiss = () => {
    setOpen(false);
    try { window.localStorage.setItem(COOKIE_NOTICE_KEY, "dismissed"); } catch { /* storage unavailable; the notice simply returns next visit */ }
  };

  if (!open) return null;
  return (
    <section aria-label="Cookie notice" className="fixed inset-x-3 bottom-3 z-[60] flex flex-col gap-3 border border-border bg-background p-4 text-foreground shadow-lg sm:inset-x-auto sm:right-4 sm:max-w-md sm:flex-row sm:items-center">
      <p className="text-sm leading-6">This website uses no tracking or advertising cookies. <Link to="/cookies" className="underline underline-offset-4 hover:text-signal">Read the cookie policy</Link>.</p>
      <button type="button" onClick={dismiss} className="min-h-11 shrink-0 bg-navy px-5 text-sm font-semibold uppercase text-navy-foreground hover:bg-signal">OK</button>
    </section>
  );
}
