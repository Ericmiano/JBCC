import titleBackground from "@/assets/jbcc-title-bg.webp.asset.json";
import { EditorialReveal } from "@/components/editorial-reveal";
import { ArchitecturalLines } from "@/components/architectural-lines";
import { ImageReveal } from "@/components/image-reveal";

export function PageIntro({ index, eyebrow, title, description }: { index: string; eyebrow: string; title: string; description: string }) {
  return (
    <section className="relative min-h-[58dvh] overflow-hidden bg-navy pt-28 text-navy-foreground sm:pt-36 md:min-h-[66dvh] md:pt-44">
      <ImageReveal className="absolute inset-y-0 right-0 w-[42%] max-md:w-full"><img src={titleBackground.url} alt="Construction site structure" width="1920" height="550" loading="eager" fetchPriority="high" decoding="async" className="h-full w-full object-cover opacity-25" /></ImageReveal>
      <div className="technical-grid absolute inset-0 opacity-25" />
      <ArchitecturalLines className="text-navy-foreground opacity-25" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-[48px_minmax(0,1fr)] px-5 pb-12 sm:grid-cols-[72px_minmax(0,1fr)] sm:pb-16 md:grid-cols-[1fr_2fr] md:px-8 md:pb-20">
        <EditorialReveal><p className="technical-label border-t border-navy-foreground/25 pt-4 text-signal">{index}</p></EditorialReveal>
        <div className="border-t border-navy-foreground/25 pt-4 md:pl-8">
          <EditorialReveal><p className="technical-label text-navy-muted">{eyebrow} / JBCC</p></EditorialReveal>
          <EditorialReveal delay={1} className="mt-8"><h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] sm:text-5xl md:text-7xl">{title}</h1></EditorialReveal>
          <EditorialReveal delay={2} className="mt-8 md:ml-[33%]"><p className="max-w-xl border-l-2 border-signal pl-5 text-sm leading-6 text-navy-muted sm:text-base sm:leading-7">{description}</p></EditorialReveal>
        </div>
      </div>
    </section>
  );
}