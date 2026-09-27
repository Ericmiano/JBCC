import { Download, Eye } from "lucide-react";
import { resources } from "@/lib/jbcc-data";

export function ResourceList({ items = resources }: { items?: readonly (typeof resources)[number][] }) {
  return (
    <div className="border-t border-border">
      {items.map((item, index) => (
        <article key={item.title} className="group grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-3 border-b border-border py-5 md:grid-cols-[48px_1fr_170px_100px] md:items-center md:gap-4">
          <span className="technical-label col-span-2 text-muted-foreground md:col-span-1">{String(index + 1).padStart(2, "0")}</span>
          <div className="min-w-0">
            <p className="technical-label text-signal">{item.type}</p>
            <h3 className="mt-2 text-lg font-medium group-hover:text-signal">{item.title}</h3>
          </div>
          <p className="technical-label col-start-1 text-muted-foreground md:col-auto">{item.year} · PDF · {item.size}</p>
          <div className="col-start-2 row-span-2 row-start-2 flex shrink-0 gap-2 self-center md:col-auto md:row-auto md:justify-end">
            <a href={item.url} target="_blank" rel="noreferrer" className="resource-icon min-h-11 min-w-11" aria-label={`View ${item.title}`}><Eye /></a>
            <a href={item.url} download className="resource-icon min-h-11 min-w-11" aria-label={`Download ${item.title}`}><Download /></a>
          </div>
        </article>
      ))}
    </div>
  );
}