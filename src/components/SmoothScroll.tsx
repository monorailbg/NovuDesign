"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";

const LenisCtx = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisCtx);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const l = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.6,
    });
    setLenis(l);

    // Intercept all hash-anchor clicks so Lenis handles the scroll
    const handleAnchor = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      l.scrollTo(target as HTMLElement, { offset: -80, duration: 1.2 });
    };
    document.addEventListener("click", handleAnchor);

    let raf: number;
    function loop(time: number) { l.raf(time); raf = requestAnimationFrame(loop); }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", handleAnchor);
      l.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisCtx.Provider value={lenis}>{children}</LenisCtx.Provider>;
}
