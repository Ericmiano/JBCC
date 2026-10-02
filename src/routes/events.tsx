import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import titleShareImage from "@/assets/jbcc-title-share.jpg.asset.json";
import { getRequestOrigin } from "@/lib/origin.functions";
import { EditorialReveal } from "@/components/editorial-reveal";

export const Route = createFileRoute("/events")({
  loader: () => getRequestOrigin(),
  head: ({ loaderData }) => ({ meta: [
    { title: "Events — JBCC Seminars & CPD" },
    { name: "description", content: "JBCC seminars, CPD sessions and Council announcements for built-environment professionals in Kenya." },
    { property: "og:title", content: "JBCC Events & Seminars" },
    { property: "og:description", content: "Seminar schedules, CPD information and registration enquiries." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "/events" },
    { property: "og:image", content: `${loaderData}${titleShareImage.url}` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "JBCC Events & Seminars" },
    { name: "twitter:description", content: "Seminar schedules, CPD information and registration enquiries." },
    { name: "twitter:image", content: `${loaderData}${titleShareImage.url}` },
  ], links: [{ rel: "canonical", href: "/events" }], scripts: [{
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EventSeries",
      name: "JBCC Seminars and CPD Events",
      description: "Seminars, CPD sessions and Council announcements for Kenya’s built-environment professionals.",
      url: "/events",
      organizer: { "@type": "Organization", name: "Joint Building & Construction Council", url: "https://jbcc.or.ke" },
    }),
  }] }),
  component: EventsPage,
});

function EventsPage() {
  return <main>
    <PageIntro index="04" eyebrow="Events" title="Seminars and industry calendar." description="Upcoming seminars and Council announcements are published here once confirmed by the Secretariat." />
    <section className="px-5 py-16 md:px-8 md:py-28"><div className="mx-auto grid max-w-7xl gap-px bg-border md:grid-cols-2">
      <EditorialReveal className="bg-background"><div className="p-6 sm:p-8"><p className="technical-label text-signal">Schedule</p><h2 className="mt-4 text-xl font-semibold sm:text-2xl">No current seminar dates published</h2><p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">Contact the Secretariat for upcoming seminar schedules and Nairobi venue details.</p></div></EditorialReveal>
      <EditorialReveal delay={1} className="bg-background"><div className="p-6 sm:p-8"><p className="technical-label text-signal">CPD & registration</p><h2 className="mt-4 text-xl font-semibold sm:text-2xl">Enquire with the Secretariat</h2><p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">For CPD certificate information and registration, email the Council.</p><a href="mailto:mail@jbcc.or.ke?subject=Seminar%20registration%20enquiry" className="mt-6 inline-flex min-h-11 items-center border-b border-signal text-sm font-medium uppercase hover:text-signal">Registration enquiry →</a></div></EditorialReveal>
    </div></section>
  </main>;
}
