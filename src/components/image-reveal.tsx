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
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={elementRef} data-image-reveal={state} data-reveal-delay={delay} className={cn("image-reveal overflow-hidden", className)}>{children}</div>;
}