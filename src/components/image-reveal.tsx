import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ImageReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: 0 | 1 | 2 | 3 }) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"ready" | "waiting" | "visible">("ready");

  useEffect(() => {
    const element = elementRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!element || reduceMotion || !("IntersectionObserver" in window)) return;

    setState("waiting");
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setState("visible");
      observer.disconnect();
    }, { rootMargin: "20% 0px 20%", threshold: 0.01 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={elementRef} className={cn("image-reveal-trigger", className)}><div data-image-reveal={state} data-reveal-delay={delay} className="image-reveal h-full w-full overflow-hidden">{children}</div></div>;
}