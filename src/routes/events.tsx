import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { getRequestOrigin } from "@/lib/origin.functions";
import { EditorialReveal } from "@/components/editorial-reveal";
import { pastActivities, seminarTopics } from "@/lib/jbcc-data";
import { SectionHeading } from "@/components/section-heading";

export const Route = createFileRoute("/events")({
  loader: () => getRequestOrigin(),
  head: ({ loaderData }) => ({ meta: [
    { title: "JBCC Seminars — Topics & Enquiries" },
    { name: "description", content: "JBCC seminar topics include the Principal Building Agreement, Nominated or Selected Subcontract Agreement, and Minor Works Agreement." },
    { property: "og:title", content: "JBCC Seminars — Topics & Enquiries" },
    { property: "og:description", content: "Seminar subjects and contact details for dates and registration." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: `${loaderData}/events` },
    { property: "og:image", content: `${loaderData}/media/jbcc-hero-group.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "JBCC Seminars — Topics & Enquiries" },
    { name: "twitter:description", content: "Seminar subjects and contact details for dates and registration." },
    { name: "twitter:image", content: `${loaderData}/media/jbcc-hero-group.jpg` },
  ], links: [{ rel: "canonical", href: `${loaderData}/events` }] }),
  component: EventsPage,
});

function EventsPage() {
  return <main>
    <PageIntro index="04" eyebrow="Seminars" title="Seminars on JBCC agreements." description="The live Council site describes these seminar subjects and says a certificate is issued for each seminar attended." image={{ src: "/media/jbcc-seminar-room.jpg", alt: "Delegates in a seminar room facing a presentation screen", width: 570, height: 658 }} recordLabel="Published subjects" recordValue={String(seminarTopics.length).padStart(2, "0")} recordNote="No upcoming dates were published in the source schedule we reviewed." />
    <section className="px-5 py-16 md:px-8 md:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
      <aside className="self-start border-t border-border pt-5 lg:sticky lg:top-28">
        <p className="technical-label text-signal">Next seminar dates</p>
        <h2 className="mt-6 max-w-sm text-2xl font-semibold leading-tight sm:text-3xl">Ask for current dates and registration details.</h2>
        <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">No upcoming dates were published in the schedule reviewed for this redesign. JBCC says a certificate is issued for each seminar attended.</p>
        <a href="mailto:mail@jbcc.co.ke?subject=JBCC%20seminar%20schedule%20enquiry&body=Hello%20JBCC%20Secretariat%2C%0A%0APlease%20send%20me%20the%20next%20seminar%20schedule%20and%20registration%20details.%0A%0AThank%20you." className="mt-6 inline-flex min-h-11 items-center gap-3 border-b border-signal text-sm font-semibold uppercase hover:text-signal">Request the next schedule <ArrowRight className="size-4" /></a>
      </aside>
      <div className="border-t border-border">
        {seminarTopics.map((topic, index) => {
          const enquirySubject = encodeURIComponent(`Seminar enquiry: ${topic}`);
          const enquiryBody = encodeURIComponent(`Hello JBCC Secretariat,\n\nPlease send me the next schedule and registration details for the ${topic} seminar.\n\nThank you.`);
          return <EditorialReveal key={topic} delay={(index % 2) as 0 | 1}><article className="grid gap-4 border-b border-border py-7 sm:grid-cols-[48px_minmax(0,1fr)_auto] sm:items-start sm:gap-5 md:py-9"><p className="technical-label text-signal">0{index + 1}</p><div><h3 className="text-lg font-semibold sm:text-xl">{topic}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Listed by JBCC as a seminar subject.</p></div><a href={`mailto:mail@jbcc.co.ke?subject=${enquirySubject}&body=${enquiryBody}`} className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold uppercase text-foreground hover:text-signal">Ask about this subject <ArrowRight className="size-4" /></a></article></EditorialReveal>;
        })}
        <p className="py-5 text-xs leading-5 text-muted-foreground">Subject-specific enquiries open your email app. Confirm dates, fees, audience and availability with the Secretariat.</p>
      </div>
    </div></section>
    <section className="bg-muted px-5 py-16 md:px-8 md:py-24"><div className="mx-auto max-w-7xl">
      <SectionHeading label="Past activities" title="Earlier JBCC work." intro="Activities published on JBCC’s previous websites, recovered from the Internet Archive. Ask the Secretariat about their current status." />
      <div className="mt-10 border-t border-border sm:mt-14">{pastActivities.map((activity) => <EditorialReveal key={activity.title}><article className="grid gap-3 border-b border-border py-7 md:grid-cols-[1fr_2fr] md:gap-8">
        <p className="text-3xl font-semibold text-[#c4161c]">{activity.year}</p>
        <div><h3 className="text-lg font-semibold sm:text-xl">{activity.title}</h3><p className="mt-2 max-w-2xl text-base leading-7 text-muted-foreground">{activity.text}</p><a href={activity.source} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-11 items-center text-xs font-semibold uppercase underline underline-offset-4 hover:text-signal">Archived page<span className="sr-only"> for {activity.title} on the Wayback Machine (opens in a new tab)</span></a></div>
      </article></EditorialReveal>)}</div>
    </div></section>
  </main>;
}
