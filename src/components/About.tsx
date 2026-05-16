"use client";

import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 80, suffix: "+", label: "Projects Delivered", color: "#EC4899" },
  { value: 5, suffix: "★", label: "Avg Client Rating", color: "#A78BFA" },
  { value: 3, suffix: "yr", label: "In Business", color: "#06B6D4" },
  { value: 100, suffix: "%", label: "On-Time Delivery", color: "#34D399" },
];

function CountUp({ target, suffix, active, color }: { target: number; suffix: string; active: boolean; color: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target]);
  return (
    <span className="font-heading font-black text-5xl md:text-6xl" style={{ color }}>
      {val}{suffix}
    </span>
  );
}

const process = [
  { num: "01", title: "Discover", desc: "We dig deep into your brand, goals, and audience through collaborative workshops." },
  { num: "02", title: "Strategize", desc: "We map out the creative direction — positioning, visual language, and user flows." },
  { num: "03", title: "Create", desc: "We design and build, sharing progress in real-time with fast iteration cycles." },
  { num: "04", title: "Launch", desc: "We deliver, deploy, and provide support to make sure everything lands perfectly." },
];

export default function About() {
  const statsRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [statsVis, setStatsVis] = useState(false);
  const [headVis, setHeadVis] = useState(false);

  useEffect(() => {
    const observe = (el: HTMLElement | null, cb: () => void) => {
      if (!el) return;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { cb(); obs.disconnect(); } }, { threshold: 0.1 });
      obs.observe(el);
      return () => obs.disconnect();
    };
    observe(statsRef.current, () => setStatsVis(true));
    observe(headRef.current, () => setHeadVis(true));
  }, []);

  return (
    <section id="about" className="py-36 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[120px] opacity-[0.04]" style={{ background: "linear-gradient(135deg,#EC4899,#06B6D4)" }} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32 p-10 rounded-3xl border"
          style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="text-center"
              style={{ opacity: statsVis ? 1 : 0, transform: statsVis ? "translateY(0)" : "translateY(16px)", transition: `all 0.6s ease ${i * 0.1}s` }}
            >
              <CountUp target={s.value} suffix={s.suffix} active={statsVis} color={s.color} />
              <p className="mt-2 text-xs font-semibold tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Process */}
        <div ref={headRef}>
          <div
            className="mb-16"
            style={{ opacity: headVis ? 1 : 0, transform: headVis ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px" style={{ background: "#A78BFA" }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#A78BFA" }}>How We Work</span>
            </div>
            <h2 className="font-heading font-black text-5xl md:text-[80px] text-white leading-[0.9] tracking-tighter">
              Our process,<br />
              <span style={{ color: "rgba(255,255,255,0.3)" }}>refined.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
            {process.map((step, i) => (
              <div
                key={step.num}
                className="p-8 relative group cursor-default"
                style={{
                  background: "#0A0A0A",
                  opacity: headVis ? 1 : 0,
                  transform: headVis ? "translateY(0)" : "translateY(24px)",
                  transition: `all 0.6s ease ${0.2 + i * 0.1}s`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                />
                <span className="block font-heading font-black text-5xl mb-6" style={{ color: "rgba(255,255,255,0.08)" }}>{step.num}</span>
                <h3 className="font-heading font-black text-xl text-white mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
