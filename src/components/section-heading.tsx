import { cn } from "@/lib/utils";

export function SectionHeading({ number, label, title, intro, light = false }: { number: string; label: string; title: string; intro?: string; light?: boolean }) {
  return (
    <header className="grid gap-5 border-t border-current/20 pt-5 sm:gap-8 md:grid-cols-[1fr_2fr]">
      <div className={cn("technical-label", light ? "text-navy-muted" : "text-muted-foreground")}>
        <span className="text-signal">{number}</span> / {label}
      </div>
      <div>
        <h2 className="max-w-4xl text-3xl font-semibold leading-[1.08] sm:text-4xl md:text-6xl">{title}</h2>
        {intro ? <p className={cn("mt-5 max-w-2xl text-sm leading-6 sm:mt-6 sm:text-base sm:leading-7 md:text-lg", light ? "text-navy-muted" : "text-muted-foreground")}>{intro}</p> : null}
      </div>
    </header>
  );
}