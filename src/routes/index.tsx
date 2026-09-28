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

function HomePage() {
  const [activeWork, setActiveWork] = useState(0);
  return <main>
    <section className="relative min-h-[92dvh] overflow-hidden bg-navy text-navy-foreground">
      <img src={heroImage.url} alt="Construction professionals reviewing a building project" width="800" height="673" loading="eager" fetchPriority="high" decoding="async" className="absolute inset-y-0 right-0 h-full w-full object-cover opacity-25 md:w-[55%]" />
      <div className="technical-grid absolute inset-0" />
      <div className="absolute bottom-0 left-[8%] top-0 w-px bg-navy-foreground/15" /><div className="absolute bottom-0 left-[64%] top-0 w-px bg-navy-foreground/15" />
      <div className="relative mx-auto flex min-h-[92dvh] max-w-7xl flex-col justify-end px-5 pb-12 pt-32 sm:pb-16 sm:pt-36 md:px-8 md:pb-20">
        <p className="technical-label text-navy-muted"><span className="text-signal">JBCC</span> / Joint Building & Construction Council</p>
        <h1 className="mt-6 max-w-5xl text-4xl font-semibold leading-[.98] sm:mt-8 sm:text-5xl md:text-8xl xl:text-9xl">The framework behind better construction.</h1>
        <div className="mt-8 flex flex-col gap-5 border-t border-navy-foreground/20 pt-5 sm:mt-10 sm:gap-8 sm:pt-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-lg text-sm leading-6 text-navy-muted sm:text-base sm:leading-7">Monitoring industry development and publishing contract documents, forms and guidance for Kenya’s built environment since 1980.</p>
          <a href="#quick-access" className="flex min-h-11 items-center gap-3 text-sm font-medium uppercase hover:text-signal">Explore JBCC <ArrowDown className="size-4" /></a>
        </div>
      </div>
    </section>

    <section id="quick-access" className="bg-background px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl"><p className="technical-label text-muted-foreground"><span className="text-signal">Quick access</span> / Need something?</p><h2 className="mt-5 text-3xl font-semibold md:text-5xl">Search the JBCC website</h2>
        <Link to="/resources" className="mt-8 grid min-h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-y border-border py-3 text-sm text-muted-foreground hover:text-foreground"><Search className="size-5 text-signal" /><span>Search documents and price indices</span><span className="technical-label hidden sm:block">Open library</span></Link>
        <div className="mt-8 grid grid-cols-2 border-l border-t border-border sm:grid-cols-2 lg:grid-cols-6">{quickLinks.map(([label, to], i) => <Link key={label} to={to} className="group min-h-24 border-b border-r border-border p-4 sm:min-h-28"><span className="technical-label text-muted-foreground">{String(i + 1).padStart(2, "0")}</span><span className="mt-6 flex items-center justify-between gap-2 text-xs font-semibold uppercase sm:mt-8">{label}<ArrowRight className="size-4 shrink-0 text-signal motion-safe:transition-transform motion-reduce:transition-none group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" /></span></Link>)}</div>
      </div>
    </section>

    <section className="bg-background px-5 py-20 md:px-8 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading number="02" label="Who we are" title="A joint council for a shared industry." intro="JBCC was founded in 1980 by the Architectural Association of Kenya and the Kenya Association of Building and Civil Engineering Contractors." /><div className="mt-16 grid gap-px bg-border md:grid-cols-3"><Fact value="1980" label="Established" /><Fact value="8" label="Constituent bodies" /><Fact value="40+" label="Years supporting industry" /></div><div className="mt-8 text-right"><Button asChild variant="outline" className="rounded-none"><Link to="/about">Read our history <ArrowRight /></Link></Button></div></div></section>

    <section className="bg-navy px-5 py-20 text-navy-foreground md:px-8 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading number="03" label="What we do" title="Standards, systems and professional practice." light /><div className="mt-16 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
      <div>{workAreas.map((item, index) => <Button type="button" variant="ghost" key={item.no} onMouseEnter={() => setActiveWork(index)} onFocus={() => setActiveWork(index)} onClick={() => setActiveWork(index)} aria-pressed={activeWork === index} className={`grid min-h-16 h-auto w-full grid-cols-[36px_minmax(0,1fr)_auto] rounded-none border-b border-navy-foreground/20 px-0 py-4 text-left motion-safe:transition-colors motion-reduce:transition-none sm:grid-cols-[48px_minmax(0,1fr)_auto] sm:py-6 ${activeWork === index ? "text-signal" : "text-navy-foreground"}`}><span className="technical-label">{item.no}</span><span className="whitespace-normal text-base font-medium uppercase sm:text-xl md:text-2xl">{item.title}</span><ArrowRight className="size-5" /></Button>)}</div>
      <div className="relative min-h-64 overflow-hidden border border-navy-foreground/20 p-6 sm:min-h-72 sm:p-8"><div className="technical-grid absolute inset-0 opacity-40" /><p className="technical-label relative text-signal">Focus / {workAreas[activeWork]?.no}</p><p className="relative mt-16 text-lg leading-8 text-navy-muted sm:mt-24 sm:text-xl">{workAreas[activeWork]?.text}</p></div>
    </div></div></section>

    <section className="bg-background px-5 py-20 md:px-8 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading number="04" label="Resource centre" title="Technical information, ready for use." intro="Access verified JBCC price indices and professional reference documents directly from the Council’s archive." /><div className="mt-14"><ResourceList items={resources.slice(0, 4)} /></div><div className="mt-8 text-right"><Button asChild className="rounded-none"><Link to="/resources">View all resources <ArrowRight /></Link></Button></div></div></section>

    <section className="bg-navy px-5 py-20 text-navy-foreground md:px-8 md:py-28"><div className="mx-auto max-w-7xl"><SectionHeading number="05" label="Industry calendar" title="News & events" intro="Seminars and Council announcements will appear here once confirmed by the JBCC Secretariat." light /><div className="mt-14 grid border border-navy-foreground/20 md:grid-cols-[220px_1fr_auto]"><div className="border-b border-navy-foreground/20 p-6 md:border-b-0 md:border-r"><CalendarDays className="size-8 text-signal" /></div><div className="p-6 md:p-8"><p className="technical-label text-navy-muted">Schedule update</p><h3 className="mt-4 text-2xl font-medium">No current seminar dates published</h3><p className="mt-3 max-w-xl text-sm leading-6 text-navy-muted">Contact the Secretariat for upcoming seminar schedules, Nairobi venue details, CPD certificate information and registration enquiries.</p></div><div className="flex items-center p-6"><Button asChild variant="outline" className="rounded-none border-navy-foreground/30 bg-transparent text-navy-foreground hover:bg-signal hover:text-navy-foreground"><Link to="/events">Events desk <ArrowRight /></Link></Button></div></div></div></section>

    <section className="bg-background px-5 py-20 md:px-8 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading number="06" label="Our partners" title="Eight bodies. One construction industry." /><div className="mt-16 grid border-l border-t border-border md:grid-cols-2 lg:grid-cols-4">{partners.map(([abbr, name], i) => <div key={abbr} className="min-h-52 border-b border-r border-border p-6 motion-safe:transition-colors motion-reduce:transition-none hover:bg-navy hover:text-navy-foreground"><p className="technical-label text-signal">{String(i + 1).padStart(2, "0")}</p><p className="mt-12 text-2xl font-semibold">{abbr}</p><p className="mt-3 text-xs leading-5 text-muted-foreground">{name}</p></div>)}</div></div></section>
  </main>;
}

function Fact({ value, label }: { value: string; label: string }) { return <div className="bg-background px-6 py-10"><p className="text-6xl font-semibold text-signal md:text-7xl">{value}</p><p className="technical-label mt-4 text-muted-foreground">{label}</p></div>; }