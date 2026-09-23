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
    if (open) window.setTimeout(() => inputRef.current?.focus(), 50);
    else setQuery("");
  }, [open]);
  const results = useMemo(() => searchItems.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())).slice(0, 8), [query]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] bg-navy/95 px-5 pt-[12vh] text-navy-foreground" role="dialog" aria-modal="true" aria-label="Search JBCC">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between border-b border-navy-foreground/20 pb-5">
          <p className="technical-label text-navy-muted">Universal search / JBCC</p>
          <Button variant="ghost" size="icon" className="text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground" onClick={() => onOpenChange(false)} aria-label="Close search"><X /></Button>
        </div>
        <div className="relative mt-10">
          <Search className="absolute left-0 top-1/2 size-6 -translate-y-1/2 text-signal" />
          <Input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search documents, pages and price indices" className="h-16 rounded-none border-0 border-b border-navy-foreground/30 bg-transparent pl-11 text-xl text-navy-foreground shadow-none placeholder:text-navy-muted focus-visible:ring-0" onKeyDown={(event) => event.key === "Escape" && onOpenChange(false)} />
        </div>
        <div className="mt-8">
          {results.map((item) => "to" in item ? (
            <Link key={item.title} to={item.to} onClick={() => onOpenChange(false)} className="flex items-center justify-between border-b border-navy-foreground/15 py-5 hover:text-signal">
              <span className="text-lg">{item.title}</span><span className="technical-label text-navy-muted">{item.type}</span>
            </Link>
          ) : (
            <a key={item.title} href={item.url} target="_blank" rel="noreferrer" className="flex items-center justify-between border-b border-navy-foreground/15 py-5 hover:text-signal">
              <span className="flex items-center gap-3 text-lg"><FileText className="size-4" />{item.title}</span><span className="technical-label text-navy-muted">{item.type}</span>
            </a>
          ))}
          {results.length === 0 ? <p className="py-8 text-navy-muted">No matching JBCC resources found.</p> : null}
        </div>
      </div>
    </div>
  );
}