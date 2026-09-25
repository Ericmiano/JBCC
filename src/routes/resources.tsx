import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { ResourceList } from "@/components/resource-list";
import { resources } from "@/lib/jbcc-data";

export const Route = createFileRoute("/resources")({
  head: () => ({ meta: [
    { title: "Resources — JBCC Price Indices & Documents" },
    { name: "description", content: "View and download JBCC price indices, price lists and industry guidance documents." },
    { property: "og:title", content: "JBCC Resource Centre" },
    { property: "og:description", content: "Price indices, price lists and guidelines for Kenya’s construction industry." },
  ] }),
  component: ResourcesPage,
});

const chip = (on: boolean) => `border px-4 py-2 text-xs font-medium uppercase ${on ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`;

function ResourcesPage() {
  const [type, setType] = useState("All");
  const [year, setYear] = useState("All");
  const [q, setQ] = useState("");
  const types = ["All", ...new Set(resources.map((r) => r.type))];
  const years = ["All", ...new Set(resources.map((r) => r.year))];
  const items = useMemo(() => resources.filter((r) => (type === "All" || r.type === type) && (year === "All" || r.year === year) && r.title.toLowerCase().includes(q.toLowerCase())), [type, year, q]);
  return <main>
    <PageIntro index="03" eyebrow="Resource centre" title="Technical information, ready for use." description="Verified JBCC price indices and reference documents from the Council’s archive." />
    <section className="px-5 py-16 md:px-8 md:py-24"><div className="mx-auto max-w-7xl">
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search documents…" aria-label="Search documents" className="h-14 w-full border-b border-border bg-transparent text-lg outline-none focus:border-signal" />
      <div className="mt-6 flex flex-wrap gap-2"><span className="technical-label mr-2 self-center text-muted-foreground">Category</span>{types.map((t) => <button key={t} className={chip(type === t)} onClick={() => setType(t)}>{t}</button>)}</div>
      <div className="mt-3 flex flex-wrap gap-2"><span className="technical-label mr-2 self-center text-muted-foreground">Year</span>{years.map((y) => <button key={y} className={chip(year === y)} onClick={() => setYear(y)}>{y}</button>)}</div>
      <p className="technical-label mt-10 text-muted-foreground">{items.length} document{items.length === 1 ? "" : "s"}</p>
      <div className="mt-4">{items.length ? <ResourceList items={items} /> : <p className="border-t border-border py-10 text-muted-foreground">No documents match these filters.</p>}</div>
    </div></section>
  </main>;
}
