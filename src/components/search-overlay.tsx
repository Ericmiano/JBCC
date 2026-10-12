import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { FileText, Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { searchItems } from "@/lib/jbcc-data";

export function SearchOverlay({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchItems.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())).slice(0, 8), [query]);
  return (
    <Dialog open={open} onOpenChange={(nextOpen) => { if (!nextOpen) setQuery(""); onOpenChange(nextOpen); }}>
      <DialogContent className="inset-0 left-0 top-0 z-[70] block h-dvh max-h-none w-full max-w-none translate-x-0 translate-y-0 overflow-y-auto rounded-none border-0 bg-navy/95 px-5 pb-10 pt-8 text-navy-foreground shadow-none sm:pt-[12vh] [&>button]:min-h-11 [&>button]:min-w-11 [&>button]:rounded-none [&>button]:text-navy-foreground">
        <div className="mx-auto max-w-3xl">
          <div className="border-b border-navy-foreground/20 pb-5 pr-12">
            <DialogTitle className="technical-label text-navy-muted">Search JBCC</DialogTitle>
          </div>
        <div className="relative mt-10">
          <Search className="absolute left-0 top-1/2 size-6 -translate-y-1/2 text-signal" />
          <Input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search JBCC" aria-label="Search pages and documents" aria-controls="search-results" className="h-16 rounded-none border-0 border-b border-navy-foreground/30 bg-transparent pl-11 text-base text-navy-foreground shadow-none placeholder:text-navy-muted focus-visible:ring-0 sm:text-xl" />
        </div>
        <div id="search-results" className="mt-8" aria-live="polite">
          {query.trim().length >= 3 ? (
            <Link to="/ask" search={{ q: query.trim() }} onClick={() => onOpenChange(false)} className="grid min-h-14 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-navy-foreground/15 py-4 hover:text-signal">
              <span className="flex min-w-0 items-start gap-3 text-base sm:text-lg"><Sparkles className="mt-1 size-4 shrink-0" aria-hidden="true" /><span>Ask JBCC: “{query.trim()}”</span></span><span className="technical-label text-navy-muted">AI answer</span>
            </Link>
          ) : null}
          {results.map((item) => "to" in item ? (
            <Link key={item.title} to={item.to} onClick={() => onOpenChange(false)} className="grid min-h-14 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-navy-foreground/15 py-4 hover:text-signal">
              <span className="min-w-0 text-base sm:text-lg">{item.title}</span><span className="technical-label text-navy-muted">{item.type}</span>
            </Link>
          ) : (
            <a key={item.title} href={item.url} target="_blank" rel="noreferrer" className="grid min-h-14 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-navy-foreground/15 py-4 hover:text-signal">
              <span className="flex min-w-0 items-start gap-3 text-base sm:text-lg"><FileText className="mt-1 size-4 shrink-0" /><span>{item.title}</span></span><span className="technical-label text-navy-muted">{item.type}</span>
            </a>
          ))}
          {results.length === 0 ? <p className="py-8 text-navy-muted">No matching pages or documents. Try asking JBCC instead.</p> : null}
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}