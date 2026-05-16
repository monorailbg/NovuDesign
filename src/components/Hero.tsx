"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gradientRef.current;
    if (!el) return;
    let frame: number;
    let t = 0;
    const animate = () => {
      t += 0.003;
      const x = 50 + 20 * Math.sin(t);
      const y = 50 + 20 * Math.cos(t * 0.7);
      el.style.background = `
        radial-gradient(ellipse 60% 50% at ${x}% ${y}%, #EC489930 0%, transparent 60%),
        radial-gradient(ellipse 50% 40% at ${100 - x}% ${100 - y}%, #06B6D425 0%, transparent 60%),
        radial-gradient(ellipse 80% 60% at 50% 120%, #EC489915 0%, transparent 50%)
      `;
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16">
      {/* Animated gradient background */}
      <div ref={gradientRef} className="absolute inset-0 pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Badge */}
      <div className="relative mb-8 flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--color-cta)" }} />
        <span className="text-xs font-medium text-zinc-400 tracking-widest uppercase">
          Available for projects · 2025
        </span>
      </div>

      {/* Headline */}
      <h1 className="relative font-heading font-black text-center leading-[0.9] tracking-tighter max-w-5xl">
        <span className="block text-[clamp(56px,10vw,140px)] text-white">We design</span>
        <span
          className="block text-[clamp(56px,10vw,140px)]"
          style={{
            background: "linear-gradient(135deg, #EC4899 0%, #F472B6 40%, #06B6D4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          bold futures.
        </span>
      </h1>

      {/* Subtext */}
      <p className="relative mt-8 max-w-xl text-center text-base md:text-lg leading-relaxed" style={{ color: "var(--color-muted)", fontFamily: "var(--font-body)" }}>
        Strategy, identity, motion — we craft digital experiences that make your brand impossible to ignore.
      </p>

      {/* CTAs */}
      <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="#work"
          className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-200 cursor-pointer hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0"
          style={{ background: "linear-gradient(135deg, #EC4899, #06B6D4)" }}
        >
          See Our Work
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </Link>
        <Link
          href="#contact"
          className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold border border-white/15 text-white bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
        >
          Start a Project
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs tracking-widest uppercase text-zinc-500">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-zinc-500 to-transparent" />
      </div>
    </section>
  );
}
