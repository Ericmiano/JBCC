import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function ArchitecturalLines({ className }: { className?: string }) {
  const elementRef = useRef<SVGSVGElement>(null);
  const revealedRef = useRef(false);
  const [state, setState] = useState<"ready" | "waiting" | "visible">("ready");

  useEffect(() => {
    const element = elementRef.current;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || !("IntersectionObserver" in window)) return;
    if (motionPreference.matches) { revealedRef.current = true; return; }

    setState("waiting");
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting || revealedRef.current) return;
      revealedRef.current = true;
      setState("visible");
      observer.disconnect();
    }, { rootMargin: "0px 0px -10%", threshold: 0.08 });

    observer.observe(element);
    const settleWithoutMotion = () => {
      if (!motionPreference.matches) return;
      revealedRef.current = true;
      setState("visible");
      observer.disconnect();
    };
    motionPreference.addEventListener("change", settleWithoutMotion);
    return () => {
      observer.disconnect();
      motionPreference.removeEventListener("change", settleWithoutMotion);
    };
  }, []);

  return (
    <svg ref={elementRef} data-line-drawing={state} className={cn("architectural-lines pointer-events-none absolute inset-0 h-full w-full", className)} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path pathLength="1" d="M8 0V100M64 0V100M0 18H100M0 82H100" />
      <path pathLength="1" d="M8 18L64 82M64 18L92 46V82" />
      <path pathLength="1" d="M4 76H12M8 72V80M60 18H68M64 14V22" />
    </svg>
  );
}