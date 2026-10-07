import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ImageReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: 0 | 1 | 2 | 3 }) {
  const elementRef = useRef<HTMLDivElement>(null);
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
    }, { rootMargin: "20% 0px 20%", threshold: 0.01 });

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

  return <div ref={elementRef} className={cn("image-reveal-trigger", className)}><div data-image-reveal={state} data-reveal-delay={delay} className="image-reveal h-full w-full overflow-hidden">{children}</div></div>;
}