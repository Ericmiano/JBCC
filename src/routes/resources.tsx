import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { ResourceList } from "@/components/resource-list";
import { resources } from "@/lib/jbcc-data";
import { Button } from "@/components/ui/button";
import titleShareImage from "@/assets/jbcc-title-share.jpg.asset.json";
import { getRequestOrigin } from "@/lib/origin.functions";

export const Route = createFileRoute("/resources")({
  loader: () => getRequestOrigin(),
  head: ({ loaderData }) => ({ meta: [
    { title: "Resources — JBCC Price Indices & Documents" },
    { name: "description", content: "View and download JBCC price indices, price lists and industry guidance documents." },
    { property: "og:title", content: "JBCC Resource Centre" },
    { property: "og:description", content: "Price indices, price lists and guidelines for Kenya’s construction industry." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "/resources" },
    { property: "og:image", content: `${loaderData}${titleShareImage.url}` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "JBCC Resource Centre" },
    { name: "twitter:description", content: "Price indices, price lists and guidelines for Kenya’s construction industry." },
    { name: "twitter:image", content: `${loaderData}${titleShareImage.url}` },
  ], links: [{ rel: "canonical", href: "/resources" }], scripts: [{
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "JBCC Resource Centre",
      description: "Price indices, price lists and construction industry guidance published by JBCC.",
      url: "/resources",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: resources.map((resource, index) => ({
          "@type": "ListItem", position: index + 1,
          item: { "@type": "DigitalDocument", name: resource.title, url: resource.url, encodingFormat: "application/pdf", datePublished: resource.year },
        })),
      },
    }),
  }] }),
  component: ResourcesPage,
});

const chip = (on: boolean) => `min-h-11 rounded-none px-4 text-xs uppercase ${on ? "border-foreground bg-foreground text-background hover:bg-foreground/90" : "border-border bg-background text-foreground hover:border-foreground hover:bg-background"}`;

function ResourcesPage() {
  const [type, setType] = useState("All");
  const [year, setYear] = useState("All");
  const [q, setQ] = useState("");
  const types = ["All", ...new Set(resources.map((r) => r.type))];
  const years = ["All", ...new Set(resources.map((r) => r.year))];
  const items = useMemo(() => resources.filter((r) => (type === "All" || r.type === type) && (year === "All" || r.year === year) && r.title.toLowerCase().includes(q.toLowerCase())), [type, year, q]);
  return <main>
    <PageIntro index="03" eyebrow="Resource centre" title="Technical information, ready for use." description="Verified JBCC price indices and reference documents from the Council’s archive." />
    <section className="px-5 py-12 sm:py-16 md:px-8 md:py-24"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16">
      <aside className="border-t border-border pt-5"><p className="technical-label text-signal">Document index</p><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search documents…" aria-label="Search documents" className="mt-6 h-14 w-full border-b border-border bg-transparent text-base outline-none focus:border-signal" /><fieldset className="mt-7"><legend className="technical-label mb-3 text-muted-foreground">Category</legend><div className="flex flex-wrap gap-2 lg:grid">{types.map((t) => <Button key={t} type="button" variant="outline" aria-pressed={type === t} className={chip(type === t)} onClick={() => setType(t)} aria-pressed={type === t}>{t}</Button>)}</div></fieldset><fieldset className="mt-6"><legend className="technical-label mb-3 text-muted-foreground">Year</legend><div className="flex flex-wrap gap-2">{years.map((y) => <Button key={y} type="button" variant="outline" aria-pressed={year === y} className={chip(year === y)} onClick={() => setYear(y)} aria-pressed={year === y}>{y}</Button>)}</div></fieldset></aside>
      <div><p className="technical-label text-muted-foreground" aria-live="polite">{items.length} document{items.length === 1 ? "" : "s"}</p><div className="mt-4">{items.length ? <ResourceList items={items} /> : <p className="border-t border-border py-10 text-muted-foreground">No documents match these filters.</p>}</div></div>
    </div></section>
  </main>;
}
