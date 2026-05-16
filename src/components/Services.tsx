"use client";

import { useRef, useEffect, useState } from "react";

const services = [
  {
    num: "01",
    title: "Brand Identity",
    desc: "Logos, visual systems, and brand guidelines that define who you are — built to resonate and endure.",
    color: "#EC4899",
    tags: ["Logo Design", "Visual Systems", "Brand Guidelines", "Typography"],
  },
  {
    num: "02",
    title: "Web Design & Dev",
    desc: "Pixel-perfect sites built with modern tech. Fast, accessible, and animated to feel alive.",
    color: "#06B6D4",
    tags: ["Next.js", "Motion", "Tailwind", "Accessibility"],
  },
  {
    num: "03",
    title: "Motion & Animation",
    desc: "Scroll effects, micro-interactions, and transitions that turn your interface into an experience.",
    color: "#A78BFA",
    tags: ["GSAP", "Framer Motion", "3D", "Scroll FX"],
  },
  {
    num: "04",
    title: "UX Strategy",
    desc: "Research-backed architecture and interaction design that converts visitors into loyal customers.",
    color: "#34D399",
    tags: ["User Research", "Wireframes", "Prototyping", "Testing"],
  },
];

function ServiceCard({ s, i }: { s: typeof services[0]; i: number }) {
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
        borderColor: hov ? `${s.color}40` : "rgba(255,255,255,0.07)",
        background: hov ? `${s.color}08` : "rgba(255,255,255,0.025)",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ${i * 0.1}s, transform 0.6s ${i * 0.1}s, border-color 0.3s, background 0.3s`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-2xl"
        style={{ opacity: hov ? 1 : 0, background: `radial-gradient(ellipse at 20% 20%, ${s.color}15 0%, transparent 60%)` }}
      />

      {/* Number */}
      <span
        className="absolute top-6 right-7 font-heading font-black text-6xl leading-none select-none pointer-events-none transition-all duration-500"
        style={{ color: hov ? `${s.color}25` : "rgba(255,255,255,0.04)" }}
      >
        {s.num}
      </span>

      {/* Icon dot */}
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-7 transition-all duration-300" style={{ background: `${s.color}18` }}>
        <div className="w-3 h-3 rounded-full" style={{ background: s.color }} />
      </div>

      <h3 className="font-heading font-black text-2xl text-white mb-3">{s.title}</h3>
      <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>{s.desc}</p>

      <div className="flex flex-wrap gap-2">
        {s.tags.map((tag) => (
          <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: `${s.color}15`, color: s.color }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{ opacity: hov ? 1 : 0, background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }}
      />
    </div>
  );
}

export default function Services() {
  const headRef = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" className="py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={headRef}
          className="mb-20"
          style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px" style={{ background: "#EC4899" }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#EC4899" }}>What We Do</span>
          </div>
          <h2 className="font-heading font-black text-5xl md:text-[80px] text-white leading-[0.9] tracking-tighter">
            Full-stack<br />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>creative studio.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((s, i) => <ServiceCard key={s.num} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
