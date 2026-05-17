"use client";

import { useRef, useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";

function Card({ s, i }: { s: { num: string; title: string; color: string; tags: string[]; desc: string }; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-cursor
      className="group relative p-8 rounded-2xl border overflow-hidden cursor-pointer"
      style={{
        borderColor: hov ? `${s.color}50` : "rgba(107,120,216,0.1)",
        background:  hov ? `${s.color}0A` : "rgba(58,69,196,0.04)",
        opacity:   vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ${i*0.1}s, transform 0.55s ${i*0.1}s, border-color 0.3s, background 0.3s`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-2xl"
        style={{ opacity: hov ? 1 : 0, background: `radial-gradient(ellipse at 20% 20%, ${s.color}12 0%, transparent 65%)` }} />

      <span className="absolute top-6 right-7 font-heading font-black text-6xl leading-none select-none pointer-events-none transition-all duration-500"
        style={{ color: hov ? `${s.color}22` : "rgba(107,120,216,0.05)" }}>{s.num}</span>

      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-7 transition-all duration-300"
        style={{ background: `${s.color}18` }}>
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
      </div>

      <h3 className="font-heading font-black text-2xl text-white mb-3">{s.title}</h3>
      <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(160,170,235,0.45)" }}>{s.desc}</p>

      <div className="flex flex-wrap gap-2">
        {s.tags.map((tag) => (
          <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: `${s.color}15`, color: s.color }}>{tag}</span>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{ opacity: hov ? 1 : 0, background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />
    </div>
  );
}

export default function Services() {
  const { t } = useLang();
  const sv = t.services;
  const hRef = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = hRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" className="py-36 px-6 relative overflow-hidden">
      {/* Dot grid pattern */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(circle, rgba(107,120,216,0.12) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      {/* Faint indigo radial glow from top-right */}
      <div style={{ position: "absolute", top: "-100px", right: "-80px", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(58,69,196,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
      {/* Subtle crimson accent bottom-left */}
      <div style={{ position: "absolute", bottom: "-60px", left: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(155,52,32,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div className="max-w-6xl mx-auto">
        <div ref={hRef} className="mb-20"
          style={{ opacity: vis?1:0, transform: vis?"translateY(0)":"translateY(24px)", transition:"all 0.7s ease" }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px" style={{ background:"#9B3420" }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color:"#9B3420" }}>{sv.label}</span>
          </div>
          <h2 className="font-heading font-black text-5xl md:text-[80px] text-white leading-[0.9] tracking-tighter">
            {sv.heading1}<br /><span style={{ color:"rgba(107,120,216,0.3)" }}>{sv.heading2}</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sv.items.map((s, i) => <Card key={s.num} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
