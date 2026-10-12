import { cn } from "@/lib/utils";
import { EditorialReveal } from "@/components/editorial-reveal";

/** `number` is kept for call-site compatibility; sections are no longer visibly numbered. */
export function SectionHeading({ label, title, intro, light = false }: { number?: string; label: string; title: string; intro?: string; light?: boolean }) {
  return (
    <header className="grid gap-4 md:grid-cols-[1fr_2fr] md:gap-0">
      <EditorialReveal className={cn("text-sm font-semibold", light ? "text-navy-muted" : "text-muted-foreground")}>
        <p className="flex items-center gap-3"><span className="h-0.5 w-6 bg-signal" aria-hidden="true" />{label}</p>
      </EditorialReveal>
      <EditorialReveal delay={1} className="md:pl-8">
        <div>
          <h2 className="max-w-4xl text-3xl font-semibold leading-[1.08] sm:text-4xl md:text-5xl">{title}</h2>
          {intro ? <p className={cn("mt-5 max-w-2xl text-sm leading-6 sm:mt-6 sm:text-base sm:leading-7 md:text-lg", light ? "text-navy-muted" : "text-muted-foreground")}>{intro}</p> : null}
        </div>
      </EditorialReveal>
    </header>
  );
}
