"use client";

import { useRef, useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";

type TestimonialItem = { quote: string; name: string; title: string; initials: string; color: string };

function Card({ t, i, vis }: { t: TestimonialItem; i: number; vis: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="relative p-8 rounded-2xl border flex flex-col gap-6 cursor-default transition-all duration-300"
      style={{
        borderColor: hov ? `${t.color}40` : "rgba(107,120,216,0.1)",
        background: hov ? `${t.color}08` : "rgba(58,69,196,0.04)",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s, border-color 0.3s, background 0.3s`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
        style={{ opacity: hov ? 1 : 0, background: `radial-gradient(ellipse at 30% 20%, ${t.color}10 0%, transparent 65%)` }} />

      <span className="font-heading font-black text-6xl leading-none select-none"
        style={{ color: `${t.color}30` }}>&ldquo;</span>

      <p className="text-sm md:text-base leading-relaxed flex-1" style={{ color: "rgba(160,170,235,0.55)" }}>
        {t.quote}
      </p>

      <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: "rgba(107,120,216,0.08)" }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-heading font-black text-sm text-white"
          style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}>
          {t.initials}
        </div>
        <div>
          <p className="text-sm font-bold text-white">{t.name}</p>
          <p className="text-xs mt-0.5" style={{ color: "rgba(107,120,216,0.4)" }}>{t.title}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { t } = useLang();
  const tm = t.testimonials;
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-36 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(40,48,160,0.07) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto">
        <div ref={ref}>
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}
            className="mb-20">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px" style={{ background: "#9B3420" }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#9B3420" }}>{tm.label}</span>
            </div>
            <h2 className="font-heading font-black text-5xl md:text-[80px] text-white leading-[0.9] tracking-tighter">
              {tm.heading1}<br />
              <span style={{ color: "rgba(107,120,216,0.28)" }}>{tm.heading2}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tm.items.map((item, i) => (
              <Card key={item.name} t={item} i={i} vis={vis} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
