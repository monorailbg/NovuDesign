"use client";

import { useRef, useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";

function RevealWord({ word, delay, gradient }: { word: string; delay: number; gradient?: boolean }) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setShow(true), delay);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  if (gradient) {
    return (
      <span ref={ref} className="inline-block" style={{ verticalAlign: "bottom" }}>
        <span className="inline-block" style={{
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
          background: "linear-gradient(135deg, #A0AAEB 0%, #3A45C4 45%, #9B3420 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>{word}</span>
      </span>
    );
  }

  return (
    <span ref={ref} className="inline-block" style={{ verticalAlign: "bottom" }}>
      <span className="inline-block text-white" style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}>{word}</span>
    </span>
  );
}

export default function Manifesto() {
  const { t } = useLang();
  const m = t.manifesto;

  return (
    <section className="py-40 px-6 relative overflow-hidden flex items-center justify-center">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(107,120,216,0.15), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(107,120,216,0.15), transparent)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(40,48,160,0.07) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-6 h-px" style={{ background: "#9B3420" }} />
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#9B3420" }}>{m.label}</span>
        </div>

        <p className="font-heading font-black tracking-tighter leading-[0.88]"
          style={{ fontSize: "clamp(42px, 8.5vw, 120px)" }}>
          {m.words1.map((w, i) => (
            <span key={i}>
              <RevealWord word={w} delay={i * 120} />{" "}
            </span>
          ))}
          <br />
          {m.words2.map((w, i) => (
            <span key={i}>
              <RevealWord word={w} delay={480 + i * 120} gradient={i === m.gradientIndex} />{" "}
            </span>
          ))}
        </p>

        <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-8">
          <div className="w-px h-12 sm:w-24 sm:h-px flex-shrink-0" style={{ background: "rgba(107,120,216,0.2)" }} />
          <p className="max-w-lg text-base md:text-lg leading-relaxed" style={{ color: "rgba(160,170,235,0.4)", fontFamily: "var(--font-space-grotesk)" }}>
            {m.support}
          </p>
        </div>
      </div>
    </section>
  );
}
