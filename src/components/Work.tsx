"use client";

import { useRef, useEffect, useState } from "react";

const projects = [
  {
    title: "Luminary",
    category: "Brand Identity + Web",
    year: "2024",
    color: "#EC4899",
    accent: "#F472B6",
    span: "col-span-1 md:col-span-2",
    height: "h-[420px]",
    description: "Complete rebrand for a luxury lifestyle company — logo, web, print.",
  },
  {
    title: "Apex Protocol",
    category: "Motion Design",
    year: "2024",
    color: "#06B6D4",
    accent: "#22D3EE",
    span: "col-span-1",
    height: "h-[420px]",
    description: "Cinematic product launch video and interactive demo site.",
  },
  {
    title: "Verdant Labs",
    category: "Web Design + Dev",
    year: "2025",
    color: "#34D399",
    accent: "#6EE7B7",
    span: "col-span-1",
    height: "h-[380px]",
    description: "SaaS dashboard redesign — 40% reduction in time-to-task.",
  },
  {
    title: "Forma Studio",
    category: "UX + Art Direction",
    year: "2025",
    color: "#A78BFA",
    accent: "#C4B5FD",
    span: "col-span-1 md:col-span-2",
    height: "h-[380px]",
    description: "Full creative direction for an architecture firm's digital presence.",
  },
];

function ProjectCard({ p, i }: { p: typeof projects[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };

  return (
    <div
      ref={ref}
      data-cursor
      className={`relative overflow-hidden rounded-2xl border cursor-pointer ${p.span} ${p.height}`}
      style={{
        borderColor: hov ? `${p.color}50` : "rgba(255,255,255,0.07)",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0) scale(1)" : "translateY(24px) scale(0.98)",
        transition: `opacity 0.7s ${i * 0.12}s, transform 0.7s ${i * 0.12}s, border-color 0.3s`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onMouseMove={onMouseMove}
    >
      {/* BG */}
      <div className="absolute inset-0" style={{ background: `${p.color}0C` }} />

      {/* Dynamic spotlight on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: hov ? 1 : 0,
          background: `radial-gradient(ellipse 60% 60% at ${mouse.x * 100}% ${mouse.y * 100}%, ${p.color}28 0%, transparent 70%)`,
        }}
      />

      {/* Geometric accent shapes */}
      <div
        className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl transition-all duration-700"
        style={{ background: p.color, opacity: hov ? 0.12 : 0.05 }}
      />
      <div
        className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full blur-3xl transition-all duration-700"
        style={{ background: p.accent, opacity: hov ? 0.10 : 0.03 }}
      />

      {/* Corner grid lines */}
      <div className="absolute top-6 right-6 w-8 h-8 opacity-20" style={{ borderTop: `1px solid ${p.color}`, borderRight: `1px solid ${p.color}` }} />
      <div className="absolute bottom-6 left-6 w-8 h-8 opacity-20" style={{ borderBottom: `1px solid ${p.color}`, borderLeft: `1px solid ${p.color}` }} />

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span
            className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
            style={{ background: `${p.color}20`, color: p.color }}
          >
            {p.category}
          </span>
          <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>{p.year}</span>
        </div>

        <div>
          <p
            className="text-sm mb-3 max-w-sm transition-all duration-400"
            style={{ color: "rgba(255,255,255,0.4)", opacity: hov ? 1 : 0, transform: hov ? "translateY(0)" : "translateY(8px)" }}
          >
            {p.description}
          </p>
          <h3 className="font-heading font-black text-[clamp(28px,4vw,52px)] text-white tracking-tighter leading-none">{p.title}</h3>

          <div
            className="mt-4 flex items-center gap-2 font-bold text-sm transition-all duration-300"
            style={{
              color: p.color,
              opacity: hov ? 1 : 0,
              transform: hov ? "translateX(0)" : "translateX(-10px)",
            }}
          >
            View Case Study
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
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
    <section id="work" className="py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={headRef}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
          style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px" style={{ background: "#06B6D4" }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#06B6D4" }}>Selected Work</span>
            </div>
            <h2 className="font-heading font-black text-5xl md:text-[80px] text-white leading-[0.9] tracking-tighter">
              Work that<br />
              <span style={{ color: "rgba(255,255,255,0.3)" }}>leaves a mark.</span>
            </h2>
          </div>

          <a
            href="#"
            className="hidden md:inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full border cursor-pointer transition-all duration-300 flex-shrink-0 self-end"
            style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
          >
            All Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}
