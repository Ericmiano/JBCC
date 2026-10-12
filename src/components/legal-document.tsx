import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { LEGAL_LAST_UPDATED, legalLinks } from "@/lib/legal";

export type LegalSection = { id: string; title: string; body: ReactNode };

export function LegalDocument({ eyebrow, title, summary, sections }: { eyebrow: string; title: string; summary: string; sections: LegalSection[] }) {
  return (
    <main>
      <PageIntro
        eyebrow={eyebrow}
        title={title}
        description={summary}
        image={{ src: "/media/jbcc-hero.jpg", alt: "Tower cranes above a building under construction", width: 1920, height: 900 }}
        recordLabel="Last updated"
        recordValue={LEGAL_LAST_UPDATED}
        recordNote="Questions about this page can be sent to mail@jbcc.co.ke."
      />
      <section className="px-5 py-14 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="On this page" className="self-start border-t border-border pt-5 lg:sticky lg:top-28">
            <p className="text-sm font-semibold">On this page</p>
            <ol className="mt-3 space-y-1 text-sm">
              {sections.map((section) => <li key={section.id}><a href={`#${section.id}`} className="flex min-h-11 items-center text-muted-foreground hover:text-signal">{section.title}</a></li>)}
            </ol>
            <p className="mt-8 text-sm font-semibold">Site policies</p>
            <ul className="mt-3 space-y-1 text-sm">
              {legalLinks.map((item) => <li key={item.to}><Link to={item.to} className="flex min-h-11 items-center text-muted-foreground hover:text-signal data-[status=active]:font-semibold data-[status=active]:text-foreground">{item.label}</Link></li>)}
            </ul>
          </nav>
          <div className="legal-prose min-w-0 max-w-3xl border-t border-border">
            {sections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-28 border-b border-border py-8">
                <h2 id={`${section.id}-title`} className="text-xl font-semibold sm:text-2xl">{section.title}</h2>
                <div className="mt-4 space-y-4 text-base leading-7 text-muted-foreground">{section.body}</div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
