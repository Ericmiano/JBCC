import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Pause, Play, PlayCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

/**
 * Homepage hero built from the live jbcc.or.ke slider media: the muted event
 * video loop and the two event photographs. Slides advance automatically only
 * while motion is allowed and the visitor is not hovering or focusing the hero,
 * and a visible pause control satisfies WCAG 2.2.2 (Pause, Stop, Hide).
 */
const slides = [
  {
    id: "video",
    label: "Industry forum",
    text: "JBCC publishes contract documents, fluctuation price indices and guidance for Kenya’s building and construction industry.",
    cta: { label: "Browse documents", to: "/resources" as const },
    credit: "Video from the JBCC website: Status of the Built Environment forum",
  },
  {
    id: "council",
    label: "The council",
    text: "Founded in 1980 by AAK and KABCEC, the Council brings owners, consultants and contractors from eight professional bodies to one table.",
    cta: { label: "About the Council", to: "/about" as const },
    credit: "Photo from the JBCC website: Council members and stakeholders",
  },
  {
    id: "launch",
    label: "Seminars and launches",
    text: "Seminars on the Principal Building Agreement, subcontracts and minor works, with an attendance certificate for every session.",
    cta: { label: "Seminar information", to: "/events" as const },
    credit: "Photo from the JBCC website: JBCC launch event",
  },
] as const;

const SLIDE_SECONDS = 8;

export function HomeHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [holding, setHolding] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const loopRef = useRef<HTMLVideoElement>(null);
  const animating = !paused && !reducedMotion;
  const running = animating && !holding && !videoOpen;
  const slide = slides[active] ?? slides[0];

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const video = loopRef.current;
    if (!video) return;
    if (active === 0 && !reducedMotion && !paused && !videoOpen) void video.play().catch(() => undefined);
    else video.pause();
  }, [active, reducedMotion, paused, videoOpen]);

  const next = () => setActive((index) => (index + 1) % slides.length);

  return (
    <section
      className="relative grid overflow-hidden bg-navy pt-20 text-navy-foreground lg:min-h-[100svh] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
      aria-roledescription="carousel"
      aria-label="JBCC highlights"
      onMouseEnter={() => setHolding(true)}
      onMouseLeave={() => setHolding(false)}
      onFocus={() => setHolding(true)}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHolding(false); }}
    >
      <div className="flex min-w-0 flex-col justify-center px-5 py-10 md:px-8 lg:order-1 lg:py-14 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-12">
        <p className="text-sm font-medium text-navy-muted">Joint Building &amp; Construction Council <span className="text-signal">·</span> Kenya, since 1980</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.02] sm:text-5xl xl:text-6xl">Contracts, price indices and guidance.</h1>
        <div id="hero-slide-text" className="mt-6 max-w-xl" aria-live={running ? "off" : "polite"} aria-atomic="true">
          <p key={slide.id} className="text-base leading-7 text-navy-foreground/90 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500 motion-reduce:animate-none sm:text-lg">
            <span className="sr-only">Slide {active + 1} of {slides.length}: {slide.label}. </span>{slide.text}
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link to={slide.cta.to} className="inline-flex bg-[#c4161c] min-h-12 items-center justify-center gap-3 px-6 text-sm font-semibold uppercase text-white hover:bg-white hover:text-navy">
            {slide.cta.label} <ArrowRight className="size-4" />
          </Link>
          <button type="button" onClick={() => setVideoOpen(true)} className="inline-flex min-h-12 items-center justify-center gap-3 border border-navy-foreground/50 px-6 text-sm font-semibold uppercase hover:border-navy-foreground hover:bg-navy-foreground/10">
            <PlayCircle className="size-5" /> Watch the video
          </button>
        </div>

        <div className="mt-10 border-t border-navy-foreground/20 pt-4">
          <div className="flex items-stretch gap-2">
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              className="grid min-h-11 min-w-11 place-items-center border border-navy-foreground/30 hover:bg-navy-foreground/10"
              aria-label={paused || reducedMotion ? "Play slideshow" : "Pause slideshow"}
              disabled={reducedMotion}
            >
              {paused || reducedMotion ? <Play className="size-4" /> : <Pause className="size-4" />}
            </button>
            <div className="grid flex-1 grid-cols-3 gap-2" role="group" aria-label="Choose a slide">
              {slides.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-current={active === index ? "true" : undefined}
                  aria-controls="hero-slide-text"
                  className={`group relative min-h-11 overflow-hidden text-left text-xs font-medium ${active === index ? "text-navy-foreground" : "text-navy-muted hover:text-navy-foreground"}`}
                >
                  <span className="absolute inset-x-0 top-0 h-0.5 bg-navy-foreground/25" aria-hidden="true" />
                  <span
                    key={`${item.id}-${active}`}
                    className={`absolute left-0 top-0 h-0.5 bg-signal ${active === index ? (animating ? "hero-progress-running" : "w-full") : "w-0"}`}
                    style={{ animationDuration: `${SLIDE_SECONDS}s`, animationPlayState: running ? "running" : "paused" }}
                    onAnimationEnd={animating ? next : undefined}
                    aria-hidden="true"
                  />
                  <span className="block pt-3 leading-tight">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
          <p className="mt-3 text-xs text-navy-muted">{slide.credit}</p>
        </div>
      </div>

      <div className="relative order-first aspect-[4/3] w-full bg-black sm:aspect-[16/9] lg:order-2 lg:aspect-auto lg:h-full" aria-hidden="true">
        <video
          ref={loopRef}
          className={`hero-media ${active === 0 ? "opacity-100" : "opacity-0"}`}
          src="/media/jbcc-hero-loop.mp4"
          poster="/media/jbcc-hero-video-poster.jpg"
          muted
          loop
          playsInline
          preload="metadata"
        />
        <img className={`hero-media ${active === 1 ? "opacity-100" : "opacity-0"}`} src="/media/jbcc-hero-group.jpg" alt="" width="1920" height="900" decoding="async" fetchPriority="high" />
        <img className={`hero-media ${active === 2 ? "opacity-100" : "opacity-0"}`} src="/media/jbcc-hero-launch.jpg" alt="" width="1280" height="600" decoding="async" loading="lazy" />
      </div>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-5xl rounded-none border-0 bg-navy p-0 text-navy-foreground sm:max-w-5xl [&>button]:min-h-11 [&>button]:min-w-11 [&>button]:text-navy-foreground">
          <div className="px-5 pb-0 pt-5 pr-14">
            <DialogTitle className="text-lg font-semibold">Status of the Built Environment forum</DialogTitle>
            <DialogDescription className="mt-1 text-sm text-navy-muted">Video from the JBCC website, about 4.5 minutes, with sound.</DialogDescription>
          </div>
          {videoOpen ? <video className="mt-4 aspect-video w-full bg-black" src="/media/jbcc-video.mp4" poster="/media/jbcc-hero-video-poster.jpg" controls autoPlay playsInline preload="none" /> : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
