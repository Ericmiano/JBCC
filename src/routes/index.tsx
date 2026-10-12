import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, FileText, Mail, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { partners, resources, seminarTopics, socialLinks, workAreas } from "@/lib/jbcc-data";
import { ResourceList } from "@/components/resource-list";
import { SectionHeading } from "@/components/section-heading";
import { getRequestOrigin } from "@/lib/origin.functions";
import { EditorialReveal } from "@/components/editorial-reveal";
import { HomeHero } from "@/components/home-hero";

export const Route = createFileRoute("/")({
  loader: () => getRequestOrigin(),
  head: ({ loaderData }) => ({ meta: [
    { title: "JBCC — Joint Building & Construction Council" },
    { name: "description", content: "JBCC publishes contract documents, price indices and industry guidance for Kenya’s building and construction sector." },
    { property: "og:title", content: "JBCC — Contracts, price indices and guidance" },
    { property: "og:description", content: "Contract administration, price indices and professional resources for Kenya’s built environment." },
    { property: "og:type", content: "website" }, { property: "og:url", content: `${loaderData}/` },
    { property: "og:image", content: `${loaderData}/media/jbcc-hero-group.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "JBCC — Contracts, price indices and guidance" },
    { name: "twitter:description", content: "Contract administration, price indices and professional resources for Kenya’s built environment." },
    { name: "twitter:image", content: `${loaderData}/media/jbcc-hero-group.jpg` },
  ], links: [{ rel: "canonical", href: `${loaderData}/` }], scripts: [{
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Joint Building & Construction Council",
      alternateName: "JBCC",
      url: "https://jbcc.co.ke",
      logo: `${loaderData}/media/jbcc-logo.png`,
      email: "mail@jbcc.co.ke",
      sameAs: socialLinks.map((item) => item.url),
      telephone: "+254202420806",
      address: { "@type": "PostalAddress", streetAddress: "Suite 605, Blue Violets Plaza, Kamburu Drive, off Ngong Road", addressLocality: "Nairobi", postalCode: "00100", addressCountry: "KE" },
    }),
  }] }),
  component: HomePage,
});

const tasks = [
  { icon: FileText, title: "Price indices and documents", text: "Dated fluctuation price lists and guidance, free to download.", to: "/resources" as const },
  { icon: CalendarDays, title: "Seminars and certificates", text: "Seminars on the JBCC agreements and how to register.", to: "/events" as const },
  { icon: MessageSquareText, title: "Advisory Notes", text: "Free guidance on using JBCC contract documents.", to: "/what-we-do" as const },
  { icon: Mail, title: "Contact the Secretariat", text: "Blue Violets Plaza, Nairobi · mail@jbcc.co.ke", to: "/contact" as const },
] as const;

const facts = [
  { value: "1980", label: "Established" },
  { value: String(partners.length), label: "Constituent bodies" },
  { value: String(resources.length), label: "Documents to download" },
] as const;

function HomePage() {
  const [activeWork, setActiveWork] = useState(0);
  return <main>
    <HomeHero />

    <section aria-label="Start here" className="relative z-10 bg-background px-5 md:px-8">
      <ul className="mx-auto grid max-w-7xl border-x border-b border-border bg-background sm:grid-cols-2 lg:-mt-px lg:grid-cols-4">
        {tasks.map(({ icon: Icon, title, text, to }) => <li key={title} className="border-b border-border last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0">
          <Link to={to} className="group flex h-full min-h-32 flex-col gap-3 p-6 hover:bg-muted">
            <Icon className="size-6 text-signal" aria-hidden="true" />
            <span className="flex items-center justify-between gap-3 text-base font-semibold">{title}<ArrowRight className="size-4 shrink-0 motion-safe:transition-transform motion-reduce:transition-none group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" /></span>
            <span className="text-sm leading-6 text-muted-foreground">{text}</span>
          </Link>
        </li>)}
      </ul>
    </section>

    <section className="bg-background px-5 py-20 md:px-8 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading number="02" label="Who we are" title="A joint council for a shared industry." intro="JBCC was founded in 1980 by the Architectural Association of Kenya and the Kenya Association of Building and Civil Engineering Contractors." /><div className="mt-16 border-y border-border">{facts.map((fact) => <Fact key={fact.label} value={fact.value} label={fact.label} />)}</div><div className="mt-8 text-right"><Button asChild variant="outline" className="rounded-none"><Link to="/about">Read our history <ArrowRight /></Link></Button></div></div></section>

    <section className="bg-navy px-5 py-20 text-navy-foreground md:px-8 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading number="03" label="What we do" title="Four core areas of the JBCC mandate." intro="JBCC’s Services page lists seven objectives. These four describe its day-to-day work; the full list is on the What we do page." light /><div className="mt-16 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
      <div>{workAreas.map((item, index) => <Button type="button" variant="ghost" key={item.no} onMouseEnter={() => setActiveWork(index)} onFocus={() => setActiveWork(index)} onClick={() => setActiveWork(index)} aria-pressed={activeWork === index} className={`grid min-h-16 h-auto w-full grid-cols-[36px_minmax(0,1fr)_auto] rounded-none border-b border-navy-foreground/20 px-0 py-4 text-left motion-safe:transition-colors motion-reduce:transition-none sm:grid-cols-[48px_minmax(0,1fr)_auto] sm:py-6 ${activeWork === index ? "text-signal" : "text-navy-foreground"}`}><span className="technical-label">{item.no}</span><span className="whitespace-normal text-base font-medium uppercase sm:text-xl md:text-2xl">{item.title}</span><ArrowRight className="size-5" /></Button>)}</div>
      <div aria-live="polite" aria-atomic="true" className="relative min-h-64 overflow-hidden border border-navy-foreground/20 p-6 sm:min-h-72 sm:p-8"><p className="technical-label relative text-signal">{workAreas[activeWork]?.title}</p><p className="relative mt-16 text-lg leading-8 text-navy-muted sm:mt-24 sm:text-xl">{workAreas[activeWork]?.text}</p></div>
    </div><div className="mt-8 text-right"><Link to="/what-we-do" className="inline-flex min-h-11 items-center gap-3 border-b border-signal text-xs font-semibold uppercase hover:text-signal">Read all seven objectives <ArrowRight className="size-4" /></Link></div></div></section>

    <section className="bg-background px-5 py-20 md:px-8 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading number="04" label="Resource centre" title="JBCC documents, dated and downloadable." intro="Browse downloadable records located in the source site’s public document archive. The latest price index found there is from June 2022; confirm currency before relying on it." /><div className="mt-14"><ResourceList items={resources.slice(0, 4)} /></div><div className="mt-8 text-right"><Button asChild className="rounded-none"><Link to="/resources">View all resources <ArrowRight /></Link></Button></div></div></section>

    <section className="bg-navy px-5 py-20 text-navy-foreground md:px-8 md:py-28"><div className="mx-auto max-w-7xl"><SectionHeading number="05" label="Seminars" title="Learn the JBCC agreements." intro="The live site describes seminars on these agreement forms. No current dates were published in the captured schedule." light /><div className="mt-14 grid border-y border-navy-foreground/20 md:grid-cols-[minmax(0,360px)_1fr_auto]"><figure className="border-b border-navy-foreground/20 md:border-b-0 md:border-r"><img src="/media/jbcc-seminar-room.jpg" alt="Delegates in a seminar room facing a presentation screen" width="570" height="658" loading="lazy" decoding="async" className="aspect-[4/3] h-full w-full object-cover" /></figure><div className="p-6 md:p-8"><p className="technical-label text-navy-muted">Seminar subjects</p><ul className="mt-4 space-y-2 text-sm leading-6 text-navy-muted">{seminarTopics.map((topic) => <li key={topic}>— {topic}</li>)}</ul><p className="mt-4 max-w-xl text-sm leading-6 text-navy-muted">A certificate is issued for each seminar attended. Contact the Secretariat for dates and registration details.</p></div><div className="flex items-center p-6"><Button asChild variant="outline" className="rounded-none border-navy-foreground/30 bg-transparent text-navy-foreground hover:bg-signal hover:text-navy-foreground"><Link to="/events">Seminar information <ArrowRight /></Link></Button></div></div></div></section>

    <section className="bg-background px-5 py-20 md:px-8 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading number="06" label="Our partners" title="Eight bodies. One construction industry." /><div className="mt-16 border-t border-border">{partners.map(({ abbr, name }) => <div key={abbr} className="grid grid-cols-[88px_minmax(0,1fr)] items-center gap-3 border-b border-border py-5 sm:grid-cols-[160px_minmax(0,1fr)]"><p className="text-lg font-semibold sm:text-2xl">{abbr}</p><p className="text-xs leading-5 text-muted-foreground sm:text-sm">{name}</p></div>)}</div></div></section>
  </main>;
}

function Fact({ value, label }: { value: string; label: string }) { return <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end border-b border-border py-6 last:border-b-0"><p className="text-sm font-medium text-muted-foreground sm:text-base">{label}</p><p className="text-4xl font-semibold text-signal sm:text-6xl">{value}</p></div>; }
