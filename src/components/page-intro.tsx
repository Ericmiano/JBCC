import titleBackground from "@/assets/jbcc-title-bg.jpg.asset.json";

export function PageIntro({ index, eyebrow, title, description }: { index: string; eyebrow: string; title: string; description: string }) {
  return (
    <section className="relative overflow-hidden bg-navy pt-36 text-navy-foreground md:pt-48">
      <img src={titleBackground} alt="Construction site structure" className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <div className="technical-grid absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5 pb-16 md:px-8 md:pb-24">
        <p className="technical-label text-navy-muted"><span className="text-signal">{index}</span> / {eyebrow}</p>
        <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-[.98] md:text-8xl">{title}</h1>
        <p className="mt-8 max-w-2xl border-l-2 border-signal pl-5 text-base leading-7 text-navy-muted md:text-lg">{description}</p>
      </div>
    </section>
  );
}