"use client";

import { useRef, useEffect, useState } from "react";
import ProjectModal, { type Project } from "./ProjectModal";
import { useLang } from "@/context/LanguageContext";

// ─── Iframe preview ───────────────────────────────────────────────────────────

function IframePreview({ src }: { src: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#fff" }}>
      <iframe
        src={src}
        scrolling="no"
        loading="lazy"
        style={{
          width: "1280px",
          height: "900px",
          border: "none",
          transform: "scale(0.29)",
          transformOrigin: "top left",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

// ─── Project visual data (text comes from i18n) ───────────────────────────────

type FullProject = Project & { span: string; height: string };

const PROJECT_VISUAL = [
  {
    title: "Atelier Wolke",
    color: "#C4826A", accent: "#E8A898", year: "2025",
    span: "col-span-1 md:col-span-2", height: "h-[440px]",
    tags: ["Hair & Beauty", "Web Design", "Booking", "Brand Identity"],
    url: "/projects/atelier-wolke.html",
  },
  {
    title: "Maison Rive",
    color: "#B8924A", accent: "#D4AE6E", year: "2025",
    span: "col-span-1", height: "h-[440px]",
    tags: ["Fine Dining", "Web Design", "Reservation System", "Brand"],
    url: "/projects/maison-rive.html",
  },
  {
    title: "Helios Dental",
    color: "#0F2240", accent: "#C4974A", year: "2025",
    span: "col-span-1", height: "h-[440px]",
    tags: ["Healthcare", "Web Design", "Booking", "Brand"],
    url: "/projects/helios-dental.html",
  },
  {
    title: "Kaoru Café",
    color: "#B5894A", accent: "#D4AE6E", year: "2025",
    span: "col-span-1 md:col-span-2", height: "h-[380px]",
    tags: ["Café", "Web Design", "Brand Identity", "Menu"],
    url: "/projects/kaoru-cafe.html",
  },
  {
    title: "Stille Praxis",
    color: "#4A7C52", accent: "#6BAF76", year: "2025",
    span: "col-span-1 md:col-span-3", height: "h-[380px]",
    tags: ["Healthcare", "Psychotherapy", "Web Design", "Brand"],
    url: "/projects/stille-praxis.html",
  },
];

// ─── Card ─────────────────────────────────────────────────────────────────────

function ProjectCard({ p, viewCase, i, onOpen }: { p: FullProject; viewCase: string; i: number; onOpen: () => void }) {
  const ref     = useRef<HTMLDivElement>(null);
  const gradRef = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl border cursor-pointer ${p.span} ${p.height} group`}
      style={{
        borderColor: hov ? `${p.color}50` : "rgba(107,120,216,0.1)",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
        transition: `opacity 0.7s ${i * 0.12}s, transform 0.7s ${i * 0.12}s, border-color 0.3s`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        if (gradRef.current) {
          gradRef.current.style.background = `radial-gradient(ellipse 55% 55% at ${x}% ${y}%, ${p.color}28 0%, transparent 70%)`;
        }
      }}
      onClick={onOpen}
    >
      <div className="absolute inset-0" style={{ background: `${p.color}07` }} />
      <div ref={gradRef} className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{ opacity: hov ? 1 : 0, background: `radial-gradient(ellipse 55% 55% at 50% 50%, ${p.color}28 0%, transparent 70%)` }} />

      {/* Corner deco */}
      <div className="absolute top-5 right-5 w-7 h-7 opacity-20" style={{ borderTop: `1px solid ${p.color}`, borderRight: `1px solid ${p.color}` }} />
      <div className="absolute bottom-5 left-5 w-7 h-7 opacity-20" style={{ borderBottom: `1px solid ${p.color}`, borderLeft: `1px solid ${p.color}` }} />

      {/* Site preview */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ transition: "transform 0.55s cubic-bezier(0.16,1,0.3,1)", transform: hov ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)" }}>
        <IframePreview src={p.url} />
      </div>

      {/* Fade gradient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `linear-gradient(to top, #080A12 0%, ${p.color}12 40%, transparent 60%)` }} />

      {/* Text overlay */}
      <div className="absolute inset-0 p-7 flex flex-col justify-end pointer-events-none">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
            style={{ background: `${p.color}22`, color: p.color }}>{p.category}</span>
          <span className="text-xs font-mono" style={{ color: "rgba(160,170,235,0.25)" }}>{p.year}</span>
        </div>
        <p className="text-sm mb-2 transition-all duration-300"
          style={{ color: "rgba(160,170,235,0.45)", opacity: hov ? 1 : 0, transform: hov ? "translateY(0)" : "translateY(8px)" }}>
          {p.description.split(" ").slice(0, 11).join(" ")}…
        </p>
        <h3 className="font-heading font-black text-[clamp(26px,3.5vw,48px)] text-white tracking-tighter leading-none">{p.title}</h3>
        <div className="mt-3 flex items-center gap-2 font-bold text-sm transition-all duration-300"
          style={{ color: p.color, opacity: hov ? 1 : 0, transform: hov ? "translateX(0)" : "translateX(-10px)" }}>
          {viewCase}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{ opacity: hov ? 1 : 0, background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />
    </div>
  );
}

// ─── All Projects Modal ───────────────────────────────────────────────────────

function AllProjectsModal({ projects, viewCase, onClose, onOpen }: {
  projects: FullProject[];
  viewCase: string;
  onClose: () => void;
  onOpen: (p: FullProject) => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[9980] flex items-center justify-center p-4 md:p-10"
      style={{ animation: "apFadeIn 0.25s ease forwards" }}>
      <div className="absolute inset-0 backdrop-blur-xl cursor-pointer"
        style={{ background: "rgba(6,8,16,0.93)" }} onClick={onClose} />

      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl border overflow-hidden"
        style={{ background: "rgba(9,11,20,0.98)", borderColor: "rgba(107,120,216,0.14)", boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(58,69,196,0.1)", animation: "apPanelUp 0.35s cubic-bezier(0.16,1,0.3,1) forwards" }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b flex-shrink-0"
          style={{ borderColor: "rgba(107,120,216,0.1)" }}>
          <span className="text-sm font-bold tracking-widest uppercase" style={{ color: "rgba(160,170,235,0.4)" }}>
            All Projects
          </span>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
            style={{ background: "rgba(160,170,235,0.07)", color: "rgba(160,170,235,0.4)" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(107,120,216,0.2)"; e.currentTarget.style.color = "#A0AAEB"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(160,170,235,0.07)"; e.currentTarget.style.color = "rgba(160,170,235,0.4)"; }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Grid */}
        <div className="overflow-y-auto p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-5" data-lenis-prevent>
          {projects.map((p) => (
            <button key={p.title} onClick={() => { onClose(); setTimeout(() => onOpen(p), 50); }}
              className="group relative flex flex-col rounded-2xl border overflow-hidden cursor-pointer text-left transition-all duration-300"
              style={{ borderColor: "rgba(107,120,216,0.1)", background: "rgba(58,69,196,0.04)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${p.color}40`; e.currentTarget.style.background = `${p.color}08`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(107,120,216,0.1)"; e.currentTarget.style.background = "rgba(58,69,196,0.04)"; }}>

              {/* Iframe preview */}
              <div className="h-52 flex-shrink-0 overflow-hidden relative">
                <IframePreview src={p.url} />
              </div>

              {/* Info */}
              <div className="px-5 py-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: p.color }}>{p.category}</p>
                  <h3 className="font-heading font-black text-base text-white leading-tight">{p.title}</h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: p.color }}>
                  {viewCase}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes apFadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes apPanelUp { from{opacity:0;transform:translateY(24px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
      `}</style>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Work() {
  const { t } = useLang();
  const w = t.work;
  const hRef = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [active, setActive] = useState<FullProject | null>(null);
  const [allOpen, setAllOpen] = useState(false);

  const projects: FullProject[] = PROJECT_VISUAL.map((v, i) => ({
    ...v,
    category: w.projects[i]?.category ?? v.title,
    description: w.projects[i]?.description ?? "",
  }));

  useEffect(() => {
    const el = hRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <section id="work" className="py-36 px-6 relative overflow-hidden">
        {/* Subtle scan-line stripes */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "repeating-linear-gradient(0deg, rgba(107,120,216,0.018) 0px, rgba(107,120,216,0.018) 1px, transparent 1px, transparent 40px)" }} />
        {/* Corner glow blobs */}
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(58,69,196,0.09) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(155,52,32,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="max-w-6xl mx-auto">
          <div ref={hRef} className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px" style={{ background: "#3A45C4" }} />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#3A45C4" }}>{w.label}</span>
              </div>
              <h2 className="font-heading font-black text-5xl md:text-[80px] text-white leading-[0.9] tracking-tighter">
                {w.heading1}<br /><span style={{ color: "rgba(107,120,216,0.3)" }}>{w.heading2}</span>
              </h2>
            </div>
            <button
              onClick={() => setAllOpen(true)}
              className="hidden md:inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full border cursor-pointer transition-all duration-300 flex-shrink-0 self-end"
              style={{ borderColor: "rgba(107,120,216,0.15)", color: "rgba(160,170,235,0.5)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(107,120,216,0.35)"; e.currentTarget.style.color = "#A0AAEB"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(107,120,216,0.15)"; e.currentTarget.style.color = "rgba(160,170,235,0.5)"; }}>
              {w.allProjects}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} p={p} viewCase={w.viewCase} i={i} onOpen={() => setActive(p)} />
            ))}
          </div>
        </div>
      </section>

      {active && (
        <ProjectModal project={{ ...active }} onClose={() => setActive(null)} />
      )}

      {allOpen && (
        <AllProjectsModal
          projects={projects}
          viewCase={w.viewCase}
          onClose={() => setAllOpen(false)}
          onOpen={(p) => setActive(p)}
        />
      )}
    </>
  );
}
