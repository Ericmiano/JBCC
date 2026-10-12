import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { objectives } from "@/lib/jbcc-data";
import { getRequestOrigin } from "@/lib/origin.functions";
import { EditorialReveal } from "@/components/editorial-reveal";

export const Route = createFileRoute("/what-we-do")({
  loader: () => getRequestOrigin(),
  head: ({ loaderData }) => ({ meta: [
    { title: "What We Do — JBCC Objectives & Activities" },
    { name: "description", content: "JBCC objectives: industry discussion, equitable contract and subcontract procedures, price fluctuation information, conciliation and arbitration." },
    { property: "og:title", content: "What JBCC does for Kenya’s built environment" },
    { property: "og:description", content: "The Council’s objectives for contract practice, price fluctuation information and dispute resolution." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: `${loaderData}/what-we-do` },
    { property: "og:image", content: `${loaderData}/media/jbcc-hero-group.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "What JBCC does for Kenya’s built environment" },
    { name: "twitter:description", content: "The Council’s objectives for contract practice, price fluctuation information and dispute resolution." },
    { name: "twitter:image", content: `${loaderData}/media/jbcc-hero-group.jpg` },
  ], links: [{ rel: "canonical", href: `${loaderData}/what-we-do` }] }),
  component: WhatWeDoPage,
});

function WhatWeDoPage() {
  return <main>
    <PageIntro index="02" eyebrow="What we do" title="The Council’s objectives." description="JBCC’s public Services page sets out objectives for industry discussion, fair contract procedures and price fluctuation information, dispute resolution, good building practice, engagement with public bodies, publishing, and support for allied organisations." image={{ src: "/media/jbcc-page.jpg", alt: "A builder working on concrete formwork", width: 1920, height: 900 }} recordLabel="Published mandate" recordValue={String(objectives.length).padStart(2, "0")} recordNote="Seven objectives from the Council’s memorandum, as published on its Services page." />
    <section className="px-5 py-16 md:px-8 md:py-28"><div className="mx-auto max-w-7xl border-t border-border">
      {objectives.map((w, index) => <EditorialReveal key={w.no} delay={(index % 2) as 0 | 1}><article className="group grid gap-4 border-b border-border py-8 sm:grid-cols-[72px_minmax(0,1fr)] md:grid-cols-[1fr_1.1fr_1.4fr] md:gap-8 md:py-12"><span className="technical-label text-signal">Objective {Number(w.no)}</span><h2 className="text-xl font-semibold uppercase sm:text-2xl md:text-3xl">{w.title}</h2><p className="text-base leading-7 text-muted-foreground sm:col-start-2 md:col-auto md:text-lg md:leading-8">{w.text}</p></article></EditorialReveal>)}
    </div></section>
    <section className="bg-muted px-5 py-16 md:px-8 md:py-24"><div className="mx-auto grid max-w-7xl gap-6 border-t border-border pt-6 md:grid-cols-[1fr_2fr]"><EditorialReveal><p className="technical-label text-signal">Advisory Notes</p></EditorialReveal><EditorialReveal delay={1}><h2 className="text-2xl font-semibold sm:text-3xl">Free guidance on using JBCC documents.</h2><p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">JBCC aims to keep building industry participants informed on how its contract documentation is developed, interpreted and applied. Advisory Notes address specific contractual elements in more detail than the documents themselves allow, and help users carry out their roles under the contract.</p><p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">Documents need updating and supplementing from time to time. Issuing an addendum or new edition for every change would confuse users and be uneconomic, so Advisory Notes explain problem areas and new thinking instead. Comments and suggestions for future topics are welcome at <a href="mailto:mail@jbcc.co.ke" className="underline underline-offset-4">mail@jbcc.co.ke</a>.</p><p className="mt-5 max-w-3xl border-l-2 border-border pl-4 text-sm leading-6 text-muted-foreground"><span className="technical-label mb-1 block text-foreground">Disclaimer</span>Advisory Notes give advice on the most effective use of JBCC documents. Advice is given in good faith, and JBCC disclaims all liability for any loss, damage or expense incurred through acting on it.</p><div className="mt-5 flex flex-wrap gap-x-8 gap-y-2"><a href="/resources" className="inline-flex min-h-11 items-center border-b border-signal text-sm font-medium uppercase hover:text-signal">Browse JBCC documents →</a><a href="mailto:mail@jbcc.co.ke?subject=Advisory%20Notes%20enquiry" className="inline-flex min-h-11 items-center border-b border-signal text-sm font-medium uppercase hover:text-signal">Ask the Secretariat →</a></div></EditorialReveal></div></section>
  </main>;
}
