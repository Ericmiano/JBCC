import titleBackground from "@/assets/jbcc-title-bg.webp.asset.json";

export function PageIntro({ index, eyebrow, title, description }: { index: string; eyebrow: string; title: string; description: string }) {
  return (
    <section className="relative overflow-hidden bg-navy pt-28 text-navy-foreground sm:pt-36 md:pt-48">
      <img src={titleBackground.url} alt="Construction site structure" width="1920" height="550" loading="eager" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <div className="technical-grid absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5 pb-12 sm:pb-16 md:px-8 md:pb-24">
        <p className="technical-label text-navy-muted"><span className="text-signal">{index}</span> / {eyebrow}</p>
        <h1 className="mt-6 max-w-5xl text-4xl font-semibold leading-[1.02] sm:text-5xl md:mt-8 md:text-8xl">{title}</h1>
        <p className="mt-6 max-w-2xl border-l-2 border-signal pl-4 text-sm leading-6 text-navy-muted sm:pl-5 sm:text-base sm:leading-7 md:mt-8 md:text-lg">{description}</p>
      </div>
    </section>
  );
}