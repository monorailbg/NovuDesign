"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";

export default function About() {
  const { t } = useLang();
  const a = t.about;
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
    <section id="about" className="py-36 px-6 relative overflow-hidden">
      <div className="absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(40,48,160,0.07) 0%, transparent 70%)" }} />

      <div ref={ref} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(32px)", transition: "all 0.8s ease" }}>

        {/* Image column */}
        <div className="relative flex justify-center lg:justify-start">
          <div className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden border"
            style={{ borderColor: "rgba(107,120,216,0.18)", background: "rgba(58,69,196,0.06)", boxShadow: "0 0 80px rgba(40,48,160,0.2)" }}>
            <Image src="/founder.webp" alt="Founder" fill className="object-cover" style={{ opacity: 0.92 }} />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(155,52,32,0.5) 0%, transparent 60%)" }} />
          </div>

          <div className="absolute -bottom-5 -right-4 lg:-right-8 px-5 py-3 rounded-2xl border backdrop-blur-md"
            style={{ background: "rgba(155,52,32,0.85)", borderColor: "rgba(107,120,216,0.25)" }}>
            <p className="text-2xl font-heading font-black text-white leading-none">{a.badge[0]}</p>
            <p className="text-xs font-semibold tracking-widest uppercase mt-0.5" style={{ color: "#A0AAEB" }}>{a.badge[1]}</p>
          </div>
        </div>

        {/* Text column */}
        <div className="flex flex-col gap-7">
          <div className="flex items-center gap-3">
            <div className="w-6 h-px" style={{ background: "#9B3420" }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#9B3420" }}>{a.label}</span>
          </div>

          <h2 className="font-heading font-black text-4xl md:text-5xl text-white leading-[1.0] tracking-tighter">
            {a.heading1}<br />
            <span style={{
              background: "linear-gradient(135deg, #A0AAEB 0%, #3A45C4 45%, #9B3420 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>{a.heading2}</span>
          </h2>

          <div className="flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: "rgba(160,170,235,0.5)" }}>
            <p>{a.p1}</p>
            <p>{a.p2}</p>
          </div>

          <div className="flex flex-wrap gap-2 mt-1">
            {a.skills.map((s) => (
              <span key={s} className="text-xs font-semibold px-4 py-1.5 rounded-full border"
                style={{ borderColor: "rgba(107,120,216,0.18)", color: "rgba(160,170,235,0.55)", background: "rgba(58,69,196,0.08)" }}>
                {s}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-10 pt-5 border-t" style={{ borderColor: "rgba(107,120,216,0.1)" }}>
            {a.stats.map(([num, label]) => (
              <div key={label}>
                <p className="font-heading font-black text-2xl text-white">{num}</p>
                <p className="text-xs font-semibold tracking-widest uppercase mt-0.5" style={{ color: "rgba(107,120,216,0.4)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
