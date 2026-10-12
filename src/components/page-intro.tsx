import { EditorialReveal } from "@/components/editorial-reveal";
import { ImageReveal } from "@/components/image-reveal";

type PageIntroProps = {
  /** Kept for call-site compatibility; intros are no longer visibly numbered. */
  index?: string;
  eyebrow: string;
  title: string;
  description: string;
  image: { src: string; alt: string; width: number; height: number; position?: string };
  recordLabel: string;
  recordValue: string;
  recordNote: string;
};

/** Split introduction: text on a solid navy panel, photograph shown at full colour beside it. */
export function PageIntro({ eyebrow, title, description, image, recordLabel, recordValue, recordNote }: PageIntroProps) {
  return (
    <section className="grid bg-navy pt-20 text-navy-foreground lg:min-h-[70dvh] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div className="flex min-w-0 flex-col justify-center px-5 py-10 sm:py-14 md:px-8 lg:py-16 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-12">
        <EditorialReveal><p className="flex items-center gap-3 text-sm font-semibold text-navy-muted"><span className="h-0.5 w-6 bg-signal" aria-hidden="true" />{eyebrow}</p></EditorialReveal>
        <EditorialReveal delay={1} className="mt-6"><h1 className="max-w-3xl break-words hyphens-auto text-[2rem] font-semibold sm:text-5xl leading-[1.04] xl:text-6xl">{title}</h1></EditorialReveal>
        <EditorialReveal delay={2} className="mt-6"><p className="max-w-xl text-base leading-7 text-navy-foreground/85 sm:text-lg">{description}</p></EditorialReveal>
        <EditorialReveal delay={2} className="mt-10 border-l-2 border-signal pl-5">
          <p className="text-xs font-semibold uppercase text-navy-muted">{recordLabel}</p>
          <p className="mt-3 text-3xl font-semibold leading-none sm:text-4xl">{recordValue}</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-navy-muted">{recordNote}</p>
        </EditorialReveal>
      </div>
      <ImageReveal className="order-first aspect-[4/3] sm:aspect-[16/9] lg:order-none lg:aspect-auto lg:h-full" delay={1}>
        <img src={image.src} alt={image.alt} width={image.width} height={image.height} decoding="async" fetchPriority="high" className="h-full w-full object-cover" style={{ objectPosition: image.position ?? "center" }} />
      </ImageReveal>
    </section>
  );
}
