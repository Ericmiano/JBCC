import { useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { FileText, MessageCircleQuestionMark, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { searchItems } from "@/lib/jbcc-data";
import { useAskAvailable } from "@/lib/ask/availability";

const normalize = (text: string) => text.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9@]+/g, " ").trim();

const index = searchItems.map((item) => ({ item, title: normalize(item.title), text: normalize(`${item.title} ${item.type} ${item.keywords}`) }));

/** Every query word must appear in the item; words found in the title rank it higher. */
export function searchSite(query: string, askAvailable: boolean) {
  const words = normalize(query).split(" ").filter(Boolean);
  return index
    .filter(({ item }) => askAvailable || !("to" in item && item.to === "/ask"))
    .map((entry) => ({ entry, score: words.every((word) => entry.text.includes(word)) ? words.reduce((sum, word) => sum + (entry.title.includes(word) ? 2 : 0), 0) + (entry.title.startsWith(words[0] ?? "") ? 1 : 0) : -1 }))
    .filter(({ score }) => score >= 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(({ entry }) => entry.item);
}

export function SearchOverlay({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = useState("");
  const askAvailable = useAskAvailable();
  const navigate = useNavigate();
  const results = useMemo(() => searchSite(query, askAvailable), [query, askAvailable]);
  const close = () => { setQuery(""); onOpenChange(false); };
  const openFirst = () => {
    const first = results[0];
    if (!first) return;
    if ("to" in first) { close(); void navigate({ to: first.to }); }
    else window.open(first.url, "_blank", "noopener");
  };
  return (
    <Dialog open={open} onOpenChange={(nextOpen) => { if (!nextOpen) setQuery(""); onOpenChange(nextOpen); }}>
      <DialogContent className="inset-0 left-0 top-0 z-[70] block h-dvh max-h-none w-full max-w-none translate-x-0 translate-y-0 overflow-y-auto rounded-none border-0 bg-navy/95 px-5 pb-10 pt-8 text-navy-foreground shadow-none sm:pt-[12vh] [&>button]:min-h-11 [&>button]:min-w-11 [&>button]:rounded-none [&>button]:text-navy-foreground">
        <div className="mx-auto max-w-3xl">
          <div className="border-b border-navy-foreground/20 pb-5 pr-12">
            <DialogTitle className="technical-label text-navy-muted">Search JBCC</DialogTitle>
          </div>
        <form role="search" className="relative mt-10" onSubmit={(event) => { event.preventDefault(); openFirst(); }}>
          <Search className="absolute left-0 top-1/2 size-6 -translate-y-1/2 text-signal" aria-hidden="true" />
          <Input autoFocus type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Documents, people, seminars…" aria-label="Search pages and documents" aria-controls="search-results" aria-describedby="search-status" className="h-16 rounded-none border-0 border-b border-navy-foreground/30 bg-transparent pl-11 text-base text-navy-foreground shadow-none placeholder:text-navy-muted focus-visible:ring-0 sm:text-xl" />
        </form>
        <p id="search-status" role="status" className="sr-only">{query.trim() ? `${results.length === 8 ? "8 or more" : results.length} results. Press Enter to open the first.` : ""}</p>
        <div id="search-results" className="mt-8">
          {askAvailable && query.trim().length >= 3 ? (
            <Link to="/ask" search={{ q: query.trim() }} onClick={close} className="grid min-h-14 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-navy-foreground/15 py-4 hover:text-signal">
              <span className="flex min-w-0 items-start gap-3 text-base sm:text-lg"><MessageCircleQuestionMark className="mt-1 size-4 shrink-0" aria-hidden="true" /><span>Ask JBCC: “{query.trim()}”</span></span><span className="technical-label text-navy-muted">Ask JBCC</span>
            </Link>
          ) : null}
          {results.map((item) => "to" in item ? (
            <Link key={`${item.type}-${item.title}`} to={item.to} onClick={close} className="grid min-h-14 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-navy-foreground/15 py-4 hover:text-signal">
              <span className="min-w-0 text-base sm:text-lg">{item.title}</span><span className="technical-label text-navy-muted">{item.type}</span>
            </Link>
          ) : (
            <a key={`${item.type}-${item.title}`} href={item.url} target="_blank" rel="noreferrer" className="grid min-h-14 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-navy-foreground/15 py-4 hover:text-signal">
              <span className="flex min-w-0 items-start gap-3 text-base sm:text-lg"><FileText className="mt-1 size-4 shrink-0" aria-hidden="true" /><span>{item.title}<span className="sr-only"> (PDF, opens in a new tab)</span></span></span><span className="technical-label text-navy-muted">{item.type}</span>
            </a>
          ))}
          {results.length === 0 ? <p className="py-8 text-navy-muted">Nothing matches “{query.trim()}”. Try fewer or different words, such as a year or document name.</p> : null}
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
