import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { SectionHeading } from "@/components/section-heading";
import { board, partners } from "@/lib/jbcc-data";
import muchiri from "@/assets/muchiri-waititu.jpg.asset.json";
import peter from "@/assets/peter-kariuki.jpg.asset.json";
import kenneth from "@/assets/kenneth-luusa.jpg.asset.json";
import nathaniel from "@/assets/nathaniel-matalanga.jpg.asset.json";
import ramesh from "@/assets/ramesh-vishram.jpg.asset.json";
import josephat from "@/assets/josephat-munyoki.jpg.asset.json";
import siphila from "@/assets/siphila-wanjiku.jpg.asset.json";
import nyagah from "@/assets/nyagah-boore.jpg.asset.json";
import titleShareImage from "@/assets/jbcc-title-share.jpg.asset.json";
import { getRequestOrigin } from "@/lib/origin.functions";
import { EditorialReveal } from "@/components/editorial-reveal";

const photos = [muchiri, peter, kenneth, nathaniel, ramesh, josephat, siphila, nyagah];

export const Route = createFileRoute("/about")({
  loader: () => getRequestOrigin(),
  head: ({ loaderData }) => ({ meta: [
    { title: "About JBCC — History, Governance & Constituent Bodies" },
    { name: "description", content: "Founded in 1980, the Joint Building & Construction Council brings together Kenya’s built-environment professional bodies." },
    { property: "og:title", content: "About the Joint Building & Construction Council" },
    { property: "og:description", content: "History since 1980, board governance and the eight constituent bodies of JBCC." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "/about" },
    { property: "og:image", content: `${loaderData}${titleShareImage.url}` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "About the Joint Building & Construction Council" },
    { name: "twitter:description", content: "History since 1980, board governance and the eight constituent bodies of JBCC." },
    { name: "twitter:image", content: `${loaderData}${titleShareImage.url}` },
  ], links: [{ rel: "canonical", href: "/about" }] }),
  component: AboutPage,
});

function AboutPage() {
  return <main>
    <PageIntro index="01" eyebrow="About" title="A joint council since 1980." description="JBCC was founded by the Architectural Association of Kenya and the Kenya Association of Building and Civil Engineering Contractors to monitor industry development and publish shared contract documentation." />
    <section className="px-5 py-16 md:px-8 md:py-28"><div className="mx-auto max-w-7xl">
      <SectionHeading number="02" label="History" title="From two founders to eight constituent bodies." intro="Over four decades, the Council has grown to represent architects, engineers, quantity surveyors, contractors, arbitrators, developers and master builders — providing a neutral forum for the whole industry." />
    </div></section>
    <section className="bg-navy px-5 py-16 text-navy-foreground md:px-8 md:py-28"><div className="mx-auto max-w-7xl">
      <SectionHeading number="03" label="Governance" title="The Board" light />
      <div className="mt-10 grid gap-px bg-navy-foreground/15 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
        {board.map((m, i) => <EditorialReveal key={m.name} delay={(i % 4) as 0 | 1 | 2 | 3} className="bg-navy"><figure className="p-5"><img src={photos[i]?.url} alt={m.name} width="400" height="400" loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover grayscale motion-safe:transition motion-reduce:transition-none hover:grayscale-0" /><figcaption className="mt-4"><p className="font-medium">{m.name}</p><p className="technical-label mt-1 text-navy-muted">{m.role}</p></figcaption></figure></EditorialReveal>)}
      </div>
    </div></section>
    <section className="px-5 py-16 md:px-8 md:py-28"><div className="mx-auto max-w-7xl">
      <SectionHeading number="04" label="Membership" title="Constituent bodies" />
      <div className="mt-10 border-t border-border sm:mt-14">{partners.map(([abbr, name], i) => <div key={abbr} className="grid grid-cols-[40px_minmax(0,1fr)] gap-x-3 gap-y-1 border-b border-border py-5 sm:grid-cols-[48px_140px_1fr] sm:items-center"><span className="technical-label row-span-2 text-muted-foreground sm:row-span-1">{String(i + 1).padStart(2, "0")}</span><span className="font-semibold text-signal">{abbr}</span><span className="text-sm leading-6 sm:text-base">{name}</span></div>)}</div>
    </div></section>
  </main>;
}
