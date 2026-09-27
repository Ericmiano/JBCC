import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { FileText, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchItems } from "@/lib/jbcc-data";

export function SearchOverlay({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      window.setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onOpenChange(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, onOpenChange]);
  const results = useMemo(() => searchItems.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())).slice(0, 8), [query]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto bg-navy/95 px-5 pb-10 pt-8 text-navy-foreground sm:pt-[12vh]" role="dialog" aria-modal="true" aria-label="Search JBCC">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between border-b border-navy-foreground/20 pb-5">
          <p className="technical-label text-navy-muted">Universal search / JBCC</p>
          <Button variant="ghost" size="icon" className="min-h-11 min-w-11 text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground" onClick={() => onOpenChange(false)} aria-label="Close search"><X /></Button>
        </div>
        <div className="relative mt-10">
          <Search className="absolute left-0 top-1/2 size-6 -translate-y-1/2 text-signal" />
          <Input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search JBCC" aria-label="Search pages and documents" aria-controls="search-results" className="h-16 rounded-none border-0 border-b border-navy-foreground/30 bg-transparent pl-11 text-base text-navy-foreground shadow-none placeholder:text-navy-muted focus-visible:ring-0 sm:text-xl" />
        </div>
        <div id="search-results" className="mt-8" aria-live="polite">
          {results.map((item) => "to" in item ? (
            <Link key={item.title} to={item.to} onClick={() => onOpenChange(false)} className="grid min-h-14 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-navy-foreground/15 py-4 hover:text-signal">
              <span className="min-w-0 text-base sm:text-lg">{item.title}</span><span className="technical-label text-navy-muted">{item.type}</span>
            </Link>
          ) : (
            <a key={item.title} href={item.url} target="_blank" rel="noreferrer" className="grid min-h-14 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-navy-foreground/15 py-4 hover:text-signal">
              <span className="flex min-w-0 items-start gap-3 text-base sm:text-lg"><FileText className="mt-1 size-4 shrink-0" /><span>{item.title}</span></span><span className="technical-label text-navy-muted">{item.type}</span>
            </a>
          ))}
          {results.length === 0 ? <p className="py-8 text-navy-muted">No matching JBCC resources found.</p> : null}
        </div>
      </div>
    </div>
  );
}