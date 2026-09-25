import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";

export const Route = createFileRoute("/events")({
  head: () => ({ meta: [
    { title: "Events — JBCC Seminars & CPD" },
    { name: "description", content: "JBCC seminars, CPD sessions and Council announcements for built-environment professionals in Kenya." },
    { property: "og:title", content: "JBCC Events & Seminars" },
    { property: "og:description", content: "Seminar schedules, CPD information and registration enquiries." },
  ] }),
  component: EventsPage,
});

function EventsPage() {
  return <main>
    <PageIntro index="04" eyebrow="Events" title="Seminars and industry calendar." description="Upcoming seminars and Council announcements are published here once confirmed by the Secretariat." />
    <section className="px-5 py-20 md:px-8 md:py-28"><div className="mx-auto grid max-w-7xl gap-px bg-border md:grid-cols-2">
      <div className="bg-background p-8"><p className="technical-label text-signal">Schedule</p><h2 className="mt-4 text-2xl font-semibold">No current seminar dates published</h2><p className="mt-4 leading-7 text-muted-foreground">Contact the Secretariat for upcoming seminar schedules and Nairobi venue details.</p></div>
      <div className="bg-background p-8"><p className="technical-label text-signal">CPD & registration</p><h2 className="mt-4 text-2xl font-semibold">Enquire with the Secretariat</h2><p className="mt-4 leading-7 text-muted-foreground">For CPD certificate information and registration, email the Council.</p><a href="mailto:mail@jbcc.or.ke?subject=Seminar%20registration%20enquiry" className="mt-6 inline-block border-b border-signal pb-1 text-sm font-medium uppercase hover:text-signal">Registration enquiry →</a></div>
    </div></section>
  </main>;
}
