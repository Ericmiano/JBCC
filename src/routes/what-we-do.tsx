import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { workAreas } from "@/lib/jbcc-data";

export const Route = createFileRoute("/what-we-do")({
  head: () => ({ meta: [
    { title: "What We Do — JBCC Objectives & Activities" },
    { name: "description", content: "Contract documentation, industry development, dispute resolution, publications and professional engagement for Kenya’s construction sector." },
    { property: "og:title", content: "What JBCC does for Kenya’s built environment" },
    { property: "og:description", content: "The Council’s five areas of work, from equitable contracts to arbitration and industry information." },
  ] }),
  component: WhatWeDoPage,
});

function WhatWeDoPage() {
  return <main>
    <PageIntro index="02" eyebrow="What we do" title="Standards, systems and professional practice." description="The Council’s objectives, drawn from its memorandum, guide how it serves Kenya’s building and construction industry." />
    <section className="px-5 py-20 md:px-8 md:py-28"><div className="mx-auto max-w-7xl border-t border-border">
      {workAreas.map((w) => <article key={w.no} className="grid gap-6 border-b border-border py-10 md:grid-cols-[80px_1fr_1.4fr]"><span className="technical-label text-signal">{w.no}</span><h2 className="text-2xl font-semibold uppercase md:text-3xl">{w.title}</h2><p className="text-lg leading-8 text-muted-foreground">{w.text}</p></article>)}
    </div></section>
  </main>;
}
