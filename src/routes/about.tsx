import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { SectionHeading } from "@/components/section-heading";
import { board2018, mission, partners, vision } from "@/lib/jbcc-data";
import { EditorialReveal } from "@/components/editorial-reveal";
import { getRequestOrigin } from "@/lib/origin.functions";
import { ImageReveal } from "@/components/image-reveal";

export const Route = createFileRoute("/about")({
  loader: () => getRequestOrigin(),
  head: ({ loaderData }) => ({ meta: [
    { title: "About JBCC — History, Governance & Constituent Bodies" },
    { name: "description", content: "Founded in 1980, the Joint Building & Construction Council brings together Kenya’s built-environment professional bodies." },
    { property: "og:title", content: "About the Joint Building & Construction Council" },
    { property: "og:description", content: "JBCC’s history, sector representation and eight constituent bodies." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: `${loaderData}/about` },
    { property: "og:image", content: `${loaderData}/media/jbcc-hero-group.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "About the Joint Building & Construction Council" },
    { name: "twitter:description", content: "JBCC’s history, sector representation and eight constituent bodies." },
    { name: "twitter:image", content: `${loaderData}/media/jbcc-hero-group.jpg` },
  ], links: [{ rel: "canonical", href: `${loaderData}/about` }] }),
  component: AboutPage,
});

function AboutPage() {
  return <main>
    <PageIntro index="01" eyebrow="About" title="A joint council since 1980." description="JBCC was founded by the Architectural Association of Kenya and the Kenya Association of Building and Civil Engineering Contractors to monitor industry development and publish shared contract documentation." image={{ src: "/media/jbcc-group.jpg", alt: "JBCC members and industry stakeholders gathered for a group photograph", width: 1920, height: 900 }} recordLabel="Constituent bodies" recordValue="8" recordNote="Founded by AAK and KABCEC in 1980. Eight professional bodies now sit on the Council." />
    <section className="px-5 py-16 md:px-8 md:py-28"><div className="mx-auto max-w-7xl">
      <SectionHeading number="02" label="History" title="From two founders to eight constituent bodies." intro="The Council began in 1980 with the Architectural Association of Kenya and the Kenya Association of Building and Civil Engineering Contractors. JBCC describes its documents as products of constituent consensus, intended to standardize good practice, distribute contractual risk equitably and support use in Kenya, Africa and beyond." />
      <div className="mt-10 grid border-y border-border sm:mt-14 md:grid-cols-[1fr_2fr]">
        <EditorialReveal className="border-b border-border py-7 md:border-b-0 md:border-r md:pr-8"><p className="technical-label text-signal">Vision</p><p className="mt-4 text-xl font-semibold leading-snug sm:text-2xl">{vision}</p></EditorialReveal>
        <EditorialReveal delay={1} className="py-7 md:pl-8"><p className="technical-label text-signal">Mission</p><ol className="mt-4 space-y-4">{mission.map((item, i) => <li key={item} className="grid grid-cols-[40px_minmax(0,1fr)] text-base leading-7 text-muted-foreground sm:text-lg"><span className="technical-label pt-1.5 text-foreground">{String(i + 1).padStart(2, "0")}</span><span>{item}</span></li>)}</ol></EditorialReveal>
      </div>
    </div></section>
    <section className="bg-navy px-5 py-16 text-navy-foreground md:px-8 md:py-28"><div className="mx-auto max-w-7xl">
      <SectionHeading number="03" label="Representation" title="One table for different parts of the industry." intro="JBCC describes its committee as representing building owners and developers, professional consultants, and general and specialist contractors." light />
      <div className="mt-10 border-t border-navy-foreground/20 sm:mt-14"><article className="grid gap-4 border-b border-navy-foreground/20 py-7 md:grid-cols-[1fr_2fr]"><p className="technical-label text-signal">Governance</p><p className="max-w-3xl text-lg leading-8 text-navy-muted">A current, dated JBCC board roster was not present in the source material reviewed for this redesign. This page describes the representation model and member bodies rather than presenting an unverified list of office holders.</p></article>
        <article aria-labelledby="board-2018-title" className="grid gap-4 border-b border-navy-foreground/20 py-7 md:grid-cols-[1fr_2fr]">
          <div><h3 id="board-2018-title" className="technical-label text-signal">Board listed in 2018</h3><p className="mt-3 max-w-xs text-sm leading-6 text-navy-muted">Historical record from JBCC’s previous website, archived on {board2018.capturedOn}. It is not the current board.</p><a href={board2018.source} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-11 items-center text-xs font-semibold uppercase text-navy-foreground underline underline-offset-4 hover:text-signal">Archived page<span className="sr-only"> on the Wayback Machine (opens in a new tab)</span></a></div>
          <ul className="grid gap-x-8 sm:grid-cols-2">{board2018.members.map((member) => <li key={member.name} className="border-b border-navy-foreground/10 py-3"><span className="block font-medium">{member.name}</span>{member.role || member.body ? <span className="block text-sm text-navy-muted">{[member.role, member.body].filter(Boolean).join(", ")}</span> : null}</li>)}</ul>
        </article></div>
    </div></section>
    <section className="px-5 py-16 md:px-8 md:py-28"><div className="mx-auto max-w-7xl">
      <SectionHeading number="04" label="Membership" title="Constituent bodies" intro="Descriptions are taken from each body’s page on the JBCC source site, last updated in June 2022." />
      <div className="mt-10 border-t border-border sm:mt-14">{partners.map((body, i) => <article key={body.abbr} className="grid grid-cols-[40px_minmax(0,1fr)] gap-x-3 gap-y-3 border-b border-border py-7 sm:grid-cols-[48px_minmax(0,1fr)] md:grid-cols-[48px_minmax(0,1fr)_minmax(0,1.6fr)] md:gap-x-8"><span className="technical-label pt-1 text-muted-foreground">{String(i + 1).padStart(2, "0")}</span><div><h3 className="font-semibold text-signal">{body.abbr}</h3><p className="mt-1 text-base leading-6">{body.name}</p>{body.founded ? <p className="technical-label mt-2 text-muted-foreground">Established {body.founded}</p> : null}</div><div className="col-start-2 md:col-start-3"><p className="text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">{body.text}</p><a href={body.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-11 items-center border-b border-signal text-xs font-semibold uppercase hover:text-signal">Visit {body.abbr} website<span className="sr-only"> (opens in a new tab)</span> →</a></div></article>)}</div>
      <figure className="mt-12 border-t border-border pt-8 sm:mt-16"><ImageReveal delay={3}><img src="/media/jbcc-hero-launch.jpg" alt="Confetti and sparklers at a JBCC launch event, with the JBCC emblem on stage" width="1280" height="600" loading="lazy" decoding="async" className="aspect-[16/7] w-full object-cover" /></ImageReveal><figcaption className="mt-4 grid gap-2 text-xs leading-5 text-muted-foreground sm:grid-cols-[1fr_2fr]"><span className="technical-label text-signal">Photo from the JBCC website</span><span>A JBCC launch event. The source website does not identify the occasion, date or photographer. Confirm attribution and reuse rights before publication.</span></figcaption></figure>
    </div></section>
  </main>;
}
