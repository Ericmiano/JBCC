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

const photos = [muchiri, peter, kenneth, nathaniel, ramesh, josephat, siphila, nyagah];

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About JBCC — History, Governance & Constituent Bodies" },
    { name: "description", content: "Founded in 1980, the Joint Building & Construction Council brings together Kenya’s built-environment professional bodies." },
    { property: "og:title", content: "About the Joint Building & Construction Council" },
    { property: "og:description", content: "History since 1980, board governance and the eight constituent bodies of JBCC." },
  ] }),
  component: AboutPage,
});

function AboutPage() {
  return <main>
    <PageIntro index="01" eyebrow="About" title="A joint council since 1980." description="JBCC was founded by the Architectural Association of Kenya and the Kenya Association of Building and Civil Engineering Contractors to monitor industry development and publish shared contract documentation." />
    <section className="px-5 py-20 md:px-8 md:py-28"><div className="mx-auto max-w-7xl">
      <SectionHeading number="02" label="History" title="From two founders to eight constituent bodies." intro="Over four decades, the Council has grown to represent architects, engineers, quantity surveyors, contractors, arbitrators, developers and master builders — providing a neutral forum for the whole industry." />
    </div></section>
    <section className="bg-navy px-5 py-20 text-navy-foreground md:px-8 md:py-28"><div className="mx-auto max-w-7xl">
      <SectionHeading number="03" label="Governance" title="The Board" light />
      <div className="mt-14 grid gap-px bg-navy-foreground/15 sm:grid-cols-2 lg:grid-cols-4">
        {board.map((m, i) => <figure key={m.name} className="bg-navy p-5"><img src={photos[i]?.url} alt={m.name} loading="lazy" className="aspect-[4/5] w-full object-cover grayscale transition hover:grayscale-0" /><figcaption className="mt-4"><p className="font-medium">{m.name}</p><p className="technical-label mt-1 text-navy-muted">{m.role}</p></figcaption></figure>)}
      </div>
    </div></section>
    <section className="px-5 py-20 md:px-8 md:py-28"><div className="mx-auto max-w-7xl">
      <SectionHeading number="04" label="Membership" title="Constituent bodies" />
      <div className="mt-14 border-t border-border">{partners.map(([abbr, name], i) => <div key={abbr} className="grid grid-cols-[48px_140px_1fr] items-center border-b border-border py-5"><span className="technical-label text-muted-foreground">{String(i + 1).padStart(2, "0")}</span><span className="font-semibold text-signal">{abbr}</span><span>{name}</span></div>)}</div>
    </div></section>
  </main>;
}
