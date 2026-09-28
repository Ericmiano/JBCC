import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { workAreas } from "@/lib/jbcc-data";
import titleShareImage from "@/assets/jbcc-title-share.jpg.asset.json";
import { getRequestOrigin } from "@/lib/origin.functions";

export const Route = createFileRoute("/what-we-do")({
  loader: () => getRequestOrigin(),
  head: ({ loaderData }) => ({ meta: [
    { title: "What We Do — JBCC Objectives & Activities" },
    { name: "description", content: "Contract documentation, industry development, dispute resolution, publications and professional engagement for Kenya’s construction sector." },
    { property: "og:title", content: "What JBCC does for Kenya’s built environment" },
    { property: "og:description", content: "The Council’s five areas of work, from equitable contracts to arbitration and industry information." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "/what-we-do" },
    { property: "og:image", content: `${loaderData}${titleShareImage.url}` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "What JBCC does for Kenya’s built environment" },
    { name: "twitter:description", content: "The Council’s five areas of work, from equitable contracts to arbitration and industry information." },
    { name: "twitter:image", content: `${loaderData}${titleShareImage.url}` },
  ], links: [{ rel: "canonical", href: "/what-we-do" }] }),
  component: WhatWeDoPage,
});

function WhatWeDoPage() {
  return <main>
    <PageIntro index="02" eyebrow="What we do" title="Standards, systems and professional practice." description="The Council’s objectives, drawn from its memorandum, guide how it serves Kenya’s building and construction industry." />
    <section className="px-5 py-16 md:px-8 md:py-28"><div className="mx-auto max-w-7xl border-t border-border">
      {workAreas.map((w) => <article key={w.no} className="grid gap-4 border-b border-border py-8 sm:grid-cols-[48px_minmax(0,1fr)] md:grid-cols-[80px_1fr_1.4fr] md:gap-6 md:py-10"><span className="technical-label text-signal">{w.no}</span><h2 className="text-xl font-semibold uppercase sm:text-2xl md:text-3xl">{w.title}</h2><p className="text-base leading-7 text-muted-foreground sm:col-start-2 md:col-auto md:text-lg md:leading-8">{w.text}</p></article>)}
    </div></section>
  </main>;
}
