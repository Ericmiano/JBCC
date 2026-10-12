import { Download, Eye } from "lucide-react";
import { resources } from "@/lib/jbcc-data";

export function ResourceList({ items = resources }: { items?: readonly (typeof resources)[number][] }) {
  return (
    <div className="border-t border-border">
      {items.map((item, index) => (
        <article key={item.title} className="group grid grid-cols-[36px_minmax(0,1fr)_auto] gap-x-3 gap-y-3 border-b border-border py-5 sm:grid-cols-[48px_minmax(0,1fr)_auto] md:items-center md:gap-5 md:py-7">
          <span className="technical-label pt-1 text-signal">{String(index + 1).padStart(2, "0")}</span>
          <div className="min-w-0">
            <p className="technical-label text-muted-foreground">{item.type}</p>
            <h2 className="mt-2 text-base font-medium leading-6 group-hover:text-signal sm:text-lg">{item.title}</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">Issued by {item.issuer} · {item.edition}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="technical-label text-muted-foreground">{item.year} · PDF · {item.size}</p>
              <span className="technical-label border-l border-signal pl-3 text-signal">{item.status}</span>
              <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="technical-label inline-flex min-h-11 items-center text-muted-foreground underline underline-offset-4 hover:text-signal">Legacy source page<span className="sr-only"> for {item.title} on the former jbcc.or.ke site (opens in a new tab)</span></a>
            </div>
          </div>
          <div className="col-start-3 row-start-1 flex shrink-0 flex-col gap-2 self-center sm:flex-row md:justify-end">
            <a href={item.url} target="_blank" rel="noreferrer" className="resource-icon min-h-11 min-w-11" aria-label={`View ${item.title}`}><Eye /></a>
            <a href={item.url} download className="resource-icon min-h-11 min-w-11" aria-label={`Download ${item.title}`}><Download /></a>
          </div>
        </article>
      ))}
    </div>
  );
}
