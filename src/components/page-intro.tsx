import titleBackground from "@/assets/jbcc-title-bg.webp.asset.json";
import { EditorialReveal } from "@/components/editorial-reveal";
import { ArchitecturalLines } from "@/components/architectural-lines";
import { ImageReveal } from "@/components/image-reveal";

export function PageIntro({ index, eyebrow, title, description }: { index: string; eyebrow: string; title: string; description: string }) {
  return (
    <section className="relative overflow-hidden bg-navy pt-28 text-navy-foreground sm:pt-36 md:pt-48">
      <ImageReveal className="absolute inset-0"><img src={titleBackground.url} alt="Construction site structure" width="1920" height="550" loading="eager" fetchPriority="high" decoding="async" className="h-full w-full object-cover opacity-20" /></ImageReveal>
      <div className="technical-grid absolute inset-0 opacity-30" />
      <ArchitecturalLines className="text-navy-foreground opacity-25" />
      <div className="relative mx-auto max-w-7xl px-5 pb-12 sm:pb-16 md:px-8 md:pb-24">
        <EditorialReveal><p className="technical-label text-navy-muted"><span className="text-signal">{index}</span> / {eyebrow}</p></EditorialReveal>
        <EditorialReveal delay={1} className="mt-6 md:mt-8"><h1 className="max-w-5xl text-4xl font-semibold leading-[1.02] sm:text-5xl md:text-8xl">{title}</h1></EditorialReveal>
        <EditorialReveal delay={2} className="mt-6 md:mt-8"><p className="max-w-2xl border-l-2 border-signal pl-4 text-sm leading-6 text-navy-muted sm:pl-5 sm:text-base sm:leading-7 md:text-lg">{description}</p></EditorialReveal>
      </div>
    </section>
  );
}