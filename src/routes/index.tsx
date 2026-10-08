import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, CalendarDays, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/jbcc-hero.webp.asset.json";
import heroShareImage from "@/assets/jbcc-hero-share.jpg.asset.json";
import { partners, resources, workAreas } from "@/lib/jbcc-data";
import { ResourceList } from "@/components/resource-list";
import { SectionHeading } from "@/components/section-heading";
import { getRequestOrigin } from "@/lib/origin.functions";
import { EditorialReveal } from "@/components/editorial-reveal";
import { ArchitecturalLines } from "@/components/architectural-lines";
import { ImageReveal } from "@/components/image-reveal";

export const Route = createFileRoute("/")({
  loader: () => getRequestOrigin(),
  head: ({ loaderData }) => ({ meta: [
    { title: "JBCC — Joint Building & Construction Council" },
    { name: "description", content: "JBCC publishes contract documents, price indices and industry guidance for Kenya’s building and construction sector." },
    { property: "og:title", content: "JBCC — The framework behind better construction" },
    { property: "og:description", content: "Contract administration, price indices and professional resources for Kenya’s built environment." },
    { property: "og:type", content: "website" }, { property: "og:url", content: "/" },
    { property: "og:image", content: `${loaderData}${heroShareImage.url}` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "JBCC — The framework behind better construction" },
    { name: "twitter:description", content: "Contract administration, price indices and professional resources for Kenya’s built environment." },
    { name: "twitter:image", content: `${loaderData}${heroShareImage.url}` },
  ], links: [{ rel: "canonical", href: "/" }], scripts: [{
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Joint Building & Construction Council",
      alternateName: "JBCC",
      url: "https://jbcc.or.ke",
      logo: "https://jbcc.or.ke/wp-content/uploads/2022/06/JBCC-LOGO.png",
      email: "mail@jbcc.or.ke",
      telephone: "+254202420806",
      address: { "@type": "PostalAddress", streetAddress: "Suite 605, Blue Violets Plaza, Kamburu Drive, off Ngong Road", addressLocality: "Nairobi", postalCode: "00100", addressCountry: "KE" },
    }),
  }] }),
  component: HomePage,
});

const quickLinks = [
  ["Contracts", "/resources"], ["Price indices", "/resources"], ["Documents", "/resources"],
  ["Publications", "/resources"], ["Events", "/events"], ["Contact", "/contact"],
] as const;

const facts = [
  { value: "1980", label: "Established" },
  { value: "8", label: "Constituent bodies" },
  { value: "40+", label: "Years supporting industry" },
] as const;

function HomePage() {
  const [activeWork, setActiveWork] = useState(0);
  return <main>
    <section className="relative min-h-[92dvh] overflow-hidden bg-navy text-navy-foreground">
      <ImageReveal className="absolute inset-y-0 right-0 w-full md:w-[42%]"><img src={heroImage.url} alt="Construction professionals reviewing a building project" width="800" height="673" loading="eager" fetchPriority="high" decoding="async" className="h-full w-full object-cover opacity-40 grayscale" /></ImageReveal>
      
      <ArchitecturalLines className="text-navy-foreground opacity-30" />
      <div className="absolute bottom-0 left-[8%] top-0 w-px bg-navy-foreground/10" /><div className="absolute bottom-0 left-[58%] top-0 w-px bg-navy-foreground/15" />
      <div className="relative mx-auto grid min-h-[92dvh] max-w-7xl content-end px-5 pb-10 pt-32 md:grid-cols-12 md:px-8 md:pb-0">
        <div className="md:col-span-7 md:pb-16 md:pr-10">
          <EditorialReveal><p className="technical-label text-navy-muted"><span className="text-signal">JBCC</span> / Joint Building & Construction Council</p></EditorialReveal>
          <EditorialReveal delay={1} className="mt-7"><h1 className="max-w-4xl text-4xl font-semibold leading-[.98] sm:text-5xl md:text-7xl xl:text-[5.5rem]">The framework<br />behind better<br />construction.</h1></EditorialReveal>
          <EditorialReveal delay={2} className="mt-9 grid gap-6 border-t border-navy-foreground/20 pt-6 sm:grid-cols-[1fr_auto] sm:items-end">
            <p className="max-w-md border-l-2 border-signal pl-5 text-sm leading-6 text-navy-muted sm:text-base sm:leading-7">Monitoring industry development and publishing contract documents, forms and guidance for Kenya’s built environment since 1980.</p>
            <a href="#quick-access" className="flex min-h-11 items-center gap-3 text-xs font-semibold uppercase hover:text-signal">Explore <ArrowDown className="size-4" /></a>
          </EditorialReveal>
        </div>
        <div className="hidden md:col-span-5 md:flex md:items-end md:justify-end md:pb-8"><p className="technical-label border-t border-navy-foreground/25 pt-4 text-navy-muted">Documentation / Kenya<br />Council record / 1980—present</p></div>
      </div>
    </section>

    <section id="quick-access" className="bg-background px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl"><EditorialReveal><p className="technical-label text-muted-foreground"><span className="text-signal">Quick access</span> / Need something?</p><h2 className="mt-5 text-3xl font-semibold md:text-5xl">Search the JBCC website</h2></EditorialReveal>
        <Link to="/resources" className="mt-8 grid min-h-16 grid-cols-[48px_minmax(0,1fr)_auto] items-center gap-3 border-y border-border py-3 text-sm text-muted-foreground hover:text-foreground"><Search className="size-5 text-signal" /><span>Search documents and price indices</span><span className="technical-label hidden sm:block">Open library</span></Link>
        <div className="mt-8 border-t border-border">{quickLinks.map(([label, to], i) => <Link key={label} to={to} className="group grid min-h-16 grid-cols-[48px_minmax(0,1fr)_auto] items-center border-b border-border py-3 sm:grid-cols-[72px_minmax(0,1fr)_auto]"><span className="technical-label text-signal">{String(i + 1).padStart(2, "0")}</span><span className="text-sm font-semibold uppercase sm:text-base">{label}</span><ArrowRight className="size-4 shrink-0 motion-safe:transition-transform motion-reduce:transition-none group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" /></Link>)}</div>
      </div>
    </section>

    <section className="bg-background px-5 py-20 md:px-8 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading number="02" label="Who we are" title="A joint council for a shared industry." intro="JBCC was founded in 1980 by the Architectural Association of Kenya and the Kenya Association of Building and Civil Engineering Contractors." /><div className="mt-16 border-y border-border">{facts.map((fact, index) => <Fact key={fact.label} value={fact.value} label={fact.label} index={index + 1} />)}</div><div className="mt-8 text-right"><Button asChild variant="outline" className="rounded-none"><Link to="/about">Read our history <ArrowRight /></Link></Button></div></div></section>

    <section className="bg-navy px-5 py-20 text-navy-foreground md:px-8 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading number="03" label="What we do" title="Standards, systems and professional practice." light /><div className="mt-16 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
      <div>{workAreas.map((item, index) => <Button type="button" variant="ghost" key={item.no} onMouseEnter={() => setActiveWork(index)} onFocus={() => setActiveWork(index)} onClick={() => setActiveWork(index)} aria-pressed={activeWork === index} className={`grid min-h-16 h-auto w-full grid-cols-[36px_minmax(0,1fr)_auto] rounded-none border-b border-navy-foreground/20 px-0 py-4 text-left motion-safe:transition-colors motion-reduce:transition-none sm:grid-cols-[48px_minmax(0,1fr)_auto] sm:py-6 ${activeWork === index ? "text-signal" : "text-navy-foreground"}`}><span className="technical-label">{item.no}</span><span className="whitespace-normal text-base font-medium uppercase sm:text-xl md:text-2xl">{item.title}</span><ArrowRight className="size-5" /></Button>)}</div>
      <div className="relative min-h-64 overflow-hidden border border-navy-foreground/20 p-6 sm:min-h-72 sm:p-8"><ArchitecturalLines className="text-navy-foreground opacity-30" /><p className="technical-label relative text-signal">Focus / {workAreas[activeWork]?.no}</p><p className="relative mt-16 text-lg leading-8 text-navy-muted sm:mt-24 sm:text-xl">{workAreas[activeWork]?.text}</p></div>
    </div></div></section>

    <section className="bg-background px-5 py-20 md:px-8 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading number="04" label="Resource centre" title="Technical information, ready for use." intro="Access verified JBCC price indices and professional reference documents directly from the Council’s archive." /><div className="mt-14"><ResourceList items={resources.slice(0, 4)} /></div><div className="mt-8 text-right"><Button asChild className="rounded-none"><Link to="/resources">View all resources <ArrowRight /></Link></Button></div></div></section>

    <section className="bg-navy px-5 py-20 text-navy-foreground md:px-8 md:py-28"><div className="mx-auto max-w-7xl"><SectionHeading number="05" label="Industry calendar" title="News & events" intro="Seminars and Council announcements will appear here once confirmed by the JBCC Secretariat." light /><div className="mt-14 grid border border-navy-foreground/20 md:grid-cols-[220px_1fr_auto]"><div className="border-b border-navy-foreground/20 p-6 md:border-b-0 md:border-r"><CalendarDays className="size-8 text-signal" /></div><div className="p-6 md:p-8"><p className="technical-label text-navy-muted">Schedule update</p><h3 className="mt-4 text-2xl font-medium">No current seminar dates published</h3><p className="mt-3 max-w-xl text-sm leading-6 text-navy-muted">Contact the Secretariat for upcoming seminar schedules, Nairobi venue details, CPD certificate information and registration enquiries.</p></div><div className="flex items-center p-6"><Button asChild variant="outline" className="rounded-none border-navy-foreground/30 bg-transparent text-navy-foreground hover:bg-signal hover:text-navy-foreground"><Link to="/events">Events desk <ArrowRight /></Link></Button></div></div></div></section>

    <section className="bg-background px-5 py-20 md:px-8 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading number="06" label="Our partners" title="Eight bodies. One construction industry." /><div className="mt-16 border-t border-border">{partners.map(([abbr, name], i) => <div key={abbr} className="grid grid-cols-[48px_72px_minmax(0,1fr)] items-center gap-3 border-b border-border py-5 sm:grid-cols-[72px_140px_minmax(0,1fr)]"><p className="technical-label text-signal">{String(i + 1).padStart(2, "0")}</p><p className="text-lg font-semibold sm:text-2xl">{abbr}</p><p className="text-xs leading-5 text-muted-foreground sm:text-sm">{name}</p></div>)}</div></div></section>
  </main>;
}

function Fact({ value, label, index }: { value: string; label: string; index: number }) { return <div className="grid grid-cols-[48px_1fr_auto] items-end border-b border-border py-6 last:border-b-0 sm:grid-cols-[72px_1fr_auto]"><p className="technical-label text-muted-foreground">0{index}</p><p className="technical-label text-muted-foreground">{label}</p><p className="text-4xl font-semibold text-signal sm:text-6xl">{value}</p></div>; }