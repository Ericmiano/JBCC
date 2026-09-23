import { Download, Eye } from "lucide-react";
import { resources } from "@/lib/jbcc-data";

export function ResourceList({ items = resources }: { items?: readonly (typeof resources)[number][] }) {
  return (
    <div className="border-t border-border">
      {items.map((item, index) => (
        <article key={item.title} className="group grid gap-4 border-b border-border py-5 md:grid-cols-[48px_1fr_170px_100px] md:items-center">
          <span className="technical-label text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <p className="technical-label text-signal">{item.type}</p>
            <h3 className="mt-2 text-lg font-medium group-hover:text-signal">{item.title}</h3>
          </div>
          <p className="technical-label text-muted-foreground">{item.year} · PDF · {item.size}</p>
          <div className="flex gap-2 md:justify-end">
            <a href={item.url} target="_blank" rel="noreferrer" className="resource-icon" aria-label={`View ${item.title}`}><Eye /></a>
            <a href={item.url} download className="resource-icon" aria-label={`Download ${item.title}`}><Download /></a>
          </div>
        </article>
      ))}
    </div>
  );
}