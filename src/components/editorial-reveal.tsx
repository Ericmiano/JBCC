import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealDelay = 0 | 1 | 2 | 3;

export function EditorialReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: RevealDelay }) {
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
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

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

  return <div ref={elementRef} data-editorial-reveal={state} data-reveal-delay={delay} className={cn("editorial-reveal", className)}>{children}</div>;
}