import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { ResourceList } from "@/components/resource-list";
import { faqs, newestPriceIndex, resources, unavailableResources } from "@/lib/jbcc-data";
import { Button } from "@/components/ui/button";
import { getRequestOrigin } from "@/lib/origin.functions";

export const Route = createFileRoute("/resources")({
  loader: () => getRequestOrigin(),
  head: ({ loaderData }) => ({ meta: [
    { title: "Resources — JBCC Price Indices & Documents" },
    { name: "description", content: "Browse locally archived JBCC price indices, price lists, and guidance documents with publication dates and source status." },
    { property: "og:title", content: "JBCC Resource Centre" },
    { property: "og:description", content: "Dated JBCC price indices, price lists and guidance documents." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: `${loaderData}/resources` },
    { property: "og:image", content: `${loaderData}/media/jbcc-hero-group.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "JBCC Resource Centre" },
    { name: "twitter:description", content: "Price indices, price lists and guidelines for Kenya’s construction industry." },
    { name: "twitter:image", content: `${loaderData}/media/jbcc-hero-group.jpg` },
  ], links: [{ rel: "canonical", href: `${loaderData}/resources` }], scripts: [{
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "JBCC Resource Centre",
      description: "Dated price indices, price lists and construction industry guidance published by JBCC.",
      url: `${loaderData}/resources`,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: resources.map((resource, index) => ({
          "@type": "ListItem", position: index + 1,
          item: { "@type": "DigitalDocument", name: resource.title, url: `${loaderData}${resource.url}`, encodingFormat: "application/pdf", datePublished: resource.year },
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
  const items = useMemo(() => {
    const term = q.trim().toLowerCase();
    return resources.filter((r) => (type === "All" || r.type === type) && (year === "All" || r.year === year) && (!term || `${r.title} ${r.type} ${r.year} ${r.status} ${r.issuer} ${r.edition}`.toLowerCase().includes(term)));
  }, [type, year, q]);
  const clearFilters = () => { setType("All"); setYear("All"); setQ(""); };
  const hasFilters = type !== "All" || year !== "All" || q.length > 0;
  return <main>
    <PageIntro index="03" eyebrow="Resource centre" title="JBCC documents, dated and downloadable." description="Browse the downloadable documents found in the source site’s public archive. These copies are hosted locally in this project." image={{ src: "/media/jbcc-publication-launch.jpg", alt: "Four men holding copies of a newly launched built-environment report", width: 800, height: 673, position: "center 30%" }} recordLabel="Local archive" recordValue={String(resources.length).padStart(2, "0")} recordNote="PDFs captured from the public catalogue. Check each record’s date and status before use." />
    <section className="px-5 py-12 sm:py-16 md:px-8 md:py-24"><div className="mx-auto max-w-7xl">
      <p className="border-l-2 border-signal bg-muted px-5 py-4 text-sm leading-6 text-muted-foreground">Archive status (captured 8 October 2026, re-checked 9 October 2026): the newest downloadable price index found in the source site is June 2022. Confirm current editions and prices with JBCC before relying on these records.</p>
      <p className="mt-5 max-w-5xl text-sm leading-6 text-muted-foreground">The JBCC FAQ last modified in June 2022 described price indices as quarterly, documents as issued four times a year, and gave a KSh 3,500–5,000 Green Book price range. These are historical figures; <a href="#faq-title" className="underline underline-offset-4">see the FAQ below</a> and ask the Secretariat for current availability, publication timing, and prices.</p>

      <dl className="mt-10 grid border-y border-border sm:grid-cols-3">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border py-5 sm:grid-cols-1 sm:gap-2 sm:border-b-0 sm:border-r sm:pr-5">
          <dt className="technical-label text-muted-foreground">Files available locally</dt><dd className="text-right text-base font-medium sm:text-left">{resources.length} local PDFs</dd>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border py-5 sm:grid-cols-1 sm:gap-2 sm:border-b-0 sm:px-5">
          <dt className="technical-label text-muted-foreground">Newest price index</dt><dd className="text-right text-base font-medium sm:text-left">{newestPriceIndex?.title.replace("JBCC Price Index — ", "") ?? "Not listed"} · historical</dd>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-5 sm:grid-cols-1 sm:gap-2 sm:border-l sm:border-border sm:pl-5">
          <dt className="technical-label text-muted-foreground">Catalogue entries without files</dt><dd className="text-right text-base font-medium sm:text-left">{unavailableResources.length} source pages</dd>
        </div>
      </dl>

      <div className="mt-12 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16">
      <aside className="border-t border-border pt-5"><p className="technical-label text-signal">Document index</p><label htmlFor="resource-search" className="mt-6 block text-sm text-muted-foreground">Search by title, category, year, issuer or status</label><input id="resource-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="For example, 2022, Nairobi or historical" aria-label="Search documents" aria-controls="resource-results" className="mt-2 h-14 w-full border-b border-border bg-transparent text-base outline-none focus:border-signal" /><fieldset className="mt-7"><legend className="technical-label mb-3 text-muted-foreground">Category</legend><div className="flex flex-wrap gap-2 lg:grid">{types.map((t) => <Button key={t} type="button" variant="outline" className={chip(type === t)} onClick={() => setType(t)} aria-pressed={type === t} aria-controls="resource-results">{t}</Button>)}</div></fieldset><fieldset className="mt-6"><legend className="technical-label mb-3 text-muted-foreground">Year</legend><div className="flex flex-wrap gap-2">{years.map((y) => <Button key={y} type="button" variant="outline" className={chip(year === y)} onClick={() => setYear(y)} aria-pressed={year === y} aria-controls="resource-results">{y}</Button>)}</div></fieldset>
        {hasFilters ? <Button type="button" variant="ghost" onClick={clearFilters} className="mt-6 min-h-11 rounded-none px-0 text-xs font-semibold uppercase text-signal hover:bg-transparent hover:text-foreground">Clear search and filters</Button> : null}
      </aside>
      <div id="resource-results"><p className="technical-label text-muted-foreground" role="status" aria-live="polite">{items.length} downloadable document{items.length === 1 ? "" : "s"}</p><div className="mt-4">{items.length ? <ResourceList items={items} /> : <p className="border-t border-border py-10 text-muted-foreground">No documents match these filters. Clear the filters or check the source catalogue entries below.</p>}
        <section className="mt-14 border-t border-border pt-6" aria-labelledby="missing-files-title"><h2 id="missing-files-title" className="text-lg font-semibold">Source entries without a downloadable file</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">These two items appear in the live document catalogue, but their public download pages returned “no file attached” or “file not found” when audited.</p>{unavailableResources.map((item) => <article key={item.title} className="grid gap-3 border-b border-border py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div><p className="technical-label text-muted-foreground">{item.type} · {item.year} · unavailable in source download</p><h3 className="mt-2 font-medium">{item.title}</h3></div><a href={item.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-sm font-medium uppercase text-signal underline underline-offset-4">Check source page</a></article>)}</section>
      </div>
      </div>
      </div>
      <section className="mt-16 grid gap-8 border-t border-border pt-6 md:mt-24 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16" aria-labelledby="faq-title">
        <div><p className="technical-label text-signal">From the June 2022 FAQ</p><h2 id="faq-title" className="mt-4 text-2xl font-semibold sm:text-3xl">Frequently asked questions</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Answers summarise the live FAQ, last updated in June 2022. Confirm prices and timing with the Secretariat.</p></div>
        <dl className="border-t border-border">{faqs.map((item) => <div key={item.q} className="grid gap-2 border-b border-border py-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] sm:gap-5"><dt className="font-medium">{item.q}</dt><dd className="text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">{item.a}</dd></div>)}</dl>
      </section>
      </div></section>
  </main>;
}
