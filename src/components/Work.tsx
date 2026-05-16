"use client";

import { useRef, useEffect, useState } from "react";
import ProjectModal, { type Project } from "./ProjectModal";
import { useLang } from "@/context/LanguageContext";

// ─── CSS Mockups ─────────────────────────────────────────────────────────────

function BrowserFrame({ children, color, compact }: { children: React.ReactNode; color: string; compact?: boolean }) {
  return (
    <div className="w-full h-full flex flex-col rounded-xl overflow-hidden border"
      style={{ borderColor: `${color}20`, background: "#07080F" }}>
      <div className="flex items-center gap-1.5 px-3 flex-shrink-0"
        style={{ height: compact ? 28 : 36, background: "#0C0E1A", borderBottom: `1px solid ${color}18` }}>
        {["#FF5F57", "#FFBD2E", "#28CA42"].map((c, i) => (
          <span key={i} className="rounded-full flex-shrink-0"
            style={{ width: compact ? 8 : 10, height: compact ? 8 : 10, background: c, opacity: 0.7, display: "inline-block" }} />
        ))}
        <div className="ml-2 flex-1 rounded-full flex items-center px-2"
          style={{ height: compact ? 14 : 18, background: "rgba(255,255,255,0.04)", maxWidth: 180 }}>
          <span style={{ fontSize: compact ? 7 : 9, color: "rgba(160,170,235,0.3)", fontFamily: "monospace" }}>
            novudesign.co/work
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden relative">{children}</div>
    </div>
  );
}

function LuminaryMockup({ compact }: { compact?: boolean }) {
  const c = "#9B3420";
  return (
    <BrowserFrame color={c} compact={compact}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
        style={{ background: "linear-gradient(160deg, #0A0605 0%, #150A08 60%, #0A0605 100%)" }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(196,86,58,1) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative flex flex-col items-center gap-2">
          <div style={{ width: compact ? 36 : 56, height: compact ? 36 : 56, borderRadius: "50%", border: `1.5px solid ${c}50`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "serif", fontSize: compact ? 20 : 32, color: c, lineHeight: 1 }}>L</span>
          </div>
          <span style={{ fontSize: compact ? 8 : 11, letterSpacing: "0.35em", color: "rgba(196,86,58,0.7)", textTransform: "uppercase" }}>LUMINARY</span>
          <div style={{ width: compact ? 24 : 40, height: 1, background: `linear-gradient(90deg, transparent, ${c}80, transparent)` }} />
          <span style={{ fontSize: compact ? 6 : 8, letterSpacing: "0.2em", color: "rgba(160,140,130,0.4)", textTransform: "uppercase" }}>EST. MMXXIV</span>
        </div>
        {!compact && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-6">
            {["Story", "Collection", "Atelier", "Contact"].map(n => (
              <span key={n} style={{ fontSize: 8, letterSpacing: "0.2em", color: "rgba(196,86,58,0.35)", textTransform: "uppercase" }}>{n}</span>
            ))}
          </div>
        )}
      </div>
    </BrowserFrame>
  );
}

function ApexMockup({ compact }: { compact?: boolean }) {
  const c = "#3A45C4";
  return (
    <BrowserFrame color={c} compact={compact}>
      <div className="absolute inset-0 flex flex-col" style={{ background: "#020308" }}>
        <div className="flex-1 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${c}22 0%, transparent 70%)` }} />
          {[...Array(compact ? 3 : 5)].map((_, i) => (
            <div key={i} className="absolute" style={{
              left: "50%", top: "50%",
              width: `${(i + 1) * (compact ? 40 : 55)}px`,
              height: `${(i + 1) * (compact ? 40 : 55)}px`,
              transform: "translate(-50%,-50%)",
              border: `1px solid ${c}${i === 0 ? "60" : i === 1 ? "35" : "18"}`,
              borderRadius: "50%",
            }} />
          ))}
          <div className="relative flex flex-col items-center gap-1">
            <div style={{ width: compact ? 28 : 40, height: compact ? 28 : 40, borderRadius: "50%", background: c, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width={compact ? 10 : 14} height={compact ? 10 : 14} viewBox="0 0 12 14" fill="white">
                <path d="M1 1l10 6-10 6V1z" />
              </svg>
            </div>
            {!compact && <span style={{ fontSize: 8, letterSpacing: "0.3em", color: "rgba(107,120,216,0.7)", textTransform: "uppercase", marginTop: 6 }}>PLAY REEL</span>}
          </div>
        </div>
        {!compact && (
          <div className="flex-shrink-0 px-4 py-3 flex gap-2 items-center" style={{ borderTop: `1px solid ${c}18` }}>
            <div style={{ height: 3, flex: 1, background: "rgba(58,69,196,0.15)", borderRadius: 2, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: "38%", background: c, borderRadius: 2 }} />
            </div>
            <span style={{ fontSize: 8, color: "rgba(107,120,216,0.4)", fontFamily: "monospace", flexShrink: 0 }}>2:14 / 5:40</span>
          </div>
        )}
      </div>
    </BrowserFrame>
  );
}

function VerdantMockup({ compact }: { compact?: boolean }) {
  const c = "#7B2316";
  const bars = [65, 82, 48, 91, 73, 56, 88];
  return (
    <BrowserFrame color={c} compact={compact}>
      <div className="absolute inset-0 flex" style={{ background: "#080A10" }}>
        <div className="flex-shrink-0 flex flex-col gap-1 p-2" style={{ width: compact ? 28 : 44, borderRight: `1px solid ${c}18` }}>
          <div style={{ width: compact ? 14 : 22, height: compact ? 14 : 22, borderRadius: 5, background: c, margin: "2px auto 4px" }} />
          {[...Array(compact ? 3 : 5)].map((_, i) => (
            <div key={i} style={{ height: compact ? 5 : 7, borderRadius: 3, background: i === 0 ? `${c}60` : "rgba(255,255,255,0.04)", marginBottom: 2 }} />
          ))}
        </div>
        <div className="flex-1 p-2 flex flex-col gap-2 overflow-hidden">
          <div className="grid grid-cols-3 gap-1.5 flex-shrink-0">
            {[["2.4k", "Users"], ["89%", "Retention"], ["$48k", "Revenue"]].map(([v, l], i) => (
              <div key={i} className="rounded-lg p-1.5" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${c}18` }}>
                <p style={{ fontSize: compact ? 8 : 11, fontWeight: 700, color: "#fff" }}>{v}</p>
                <p style={{ fontSize: compact ? 5 : 7, color: "rgba(160,170,235,0.3)" }}>{l}</p>
              </div>
            ))}
          </div>
          {!compact && (
            <div className="flex-1 rounded-lg p-2 flex flex-col gap-1.5" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${c}12`, minHeight: 0 }}>
              <span style={{ fontSize: 7, color: "rgba(160,170,235,0.25)" }}>Weekly Activity</span>
              <div className="flex items-end gap-1 h-full">
                {bars.map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 3 ? c : `${c}45` }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </BrowserFrame>
  );
}

function FormaMockup({ compact }: { compact?: boolean }) {
  const c = "#6B78D8";
  return (
    <BrowserFrame color={c} compact={compact}>
      <div className="absolute inset-0 flex flex-col" style={{ background: "#F5F4F2" }}>
        <div className="flex items-center justify-between px-3 flex-shrink-0"
          style={{ height: compact ? 22 : 30, borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <span style={{ fontSize: compact ? 7 : 9, fontWeight: 700, letterSpacing: "0.15em", color: "#1a1a1a", textTransform: "uppercase" }}>FORMA</span>
          <div className="flex gap-3">
            {["Work", "Studio", "Contact"].map(n => (
              <span key={n} style={{ fontSize: compact ? 5 : 7, color: "#999", letterSpacing: "0.1em" }}>{n}</span>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-hidden" style={{ display: "grid", gridTemplateColumns: compact ? "1fr 1fr" : "2fr 1fr 1fr", gridTemplateRows: compact ? "1fr" : "1fr 1fr", gap: 2, padding: 2 }}>
          <div style={{ background: "linear-gradient(135deg, #D4CFC8, #B8B3AA)", gridRow: compact ? undefined : "1 / 3", borderRadius: 2 }} />
          <div style={{ background: "linear-gradient(135deg, #C8C5C0, #AAA7A2)", borderRadius: 2 }} />
          {!compact && <div style={{ background: "linear-gradient(135deg, #E0DDD8, #C8C5BF)", borderRadius: 2 }} />}
          <div style={{ background: "linear-gradient(135deg, #B8B5B0, #9E9B96)", borderRadius: 2 }} />
          {!compact && <div style={{ background: "linear-gradient(135deg, #D8D5D0, #BFBBB5)", borderRadius: 2 }} />}
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─── Static project data (visual/layout only — text comes from i18n) ──────────

type FullProject = Project & { span: string; height: string; compactMockup: React.ReactNode };

const PROJECT_VISUAL = [
  { title: "Luminary",      color: "#9B3420", accent: "#C4563A", year: "2024", span: "col-span-1 md:col-span-2", height: "h-[440px]", tags: ["Logo Design","Typography","Brand Guidelines","Web Design","Print"],     mockup: <LuminaryMockup />, compactMockup: <LuminaryMockup compact /> },
  { title: "Apex Protocol", color: "#3A45C4", accent: "#6B78D8", year: "2024", span: "col-span-1",               height: "h-[440px]", tags: ["Motion Graphics","3D Animation","Creative Direction","Web Dev"],            mockup: <ApexMockup />,     compactMockup: <ApexMockup compact /> },
  { title: "Verdant Labs",  color: "#7B2316", accent: "#9B3420", year: "2025", span: "col-span-1",               height: "h-[380px]", tags: ["Product Design","Next.js","Design System","UX Research","Tailwind"],         mockup: <VerdantMockup />,  compactMockup: <VerdantMockup compact /> },
  { title: "Forma Studio",  color: "#6B78D8", accent: "#A0AAEB", year: "2025", span: "col-span-1 md:col-span-2", height: "h-[380px]", tags: ["Art Direction","Editorial Design","Photography Direction","Web"],             mockup: <FormaMockup />,    compactMockup: <FormaMockup compact /> },
];

// ─── Card ─────────────────────────────────────────────────────────────────────

function ProjectCard({ p, viewCase, i, onOpen }: { p: FullProject; viewCase: string; i: number; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
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
      <div className="absolute inset-0" style={{ background: `${p.color}09` }} />
      <div ref={gradRef} className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{ opacity: hov ? 1 : 0, background: `radial-gradient(ellipse 55% 55% at 50% 50%, ${p.color}28 0%, transparent 70%)` }} />

      <div className="absolute top-5 right-5 w-7 h-7 opacity-20"
        style={{ borderTop: `1px solid ${p.color}`, borderRight: `1px solid ${p.color}` }} />
      <div className="absolute bottom-5 left-5 w-7 h-7 opacity-20"
        style={{ borderBottom: `1px solid ${p.color}`, borderLeft: `1px solid ${p.color}` }} />

      <div className="absolute inset-0 flex items-start justify-center pt-10 px-8 pointer-events-none"
        style={{ transition: "transform 0.55s cubic-bezier(0.16,1,0.3,1)", transform: hov ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)" }}>
        <div className="w-full" style={{ maxWidth: "88%", height: "55%" }}>
          {p.compactMockup}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `linear-gradient(to top, #080A12 0%, ${p.color}12 40%, transparent 60%)` }} />

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

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Work() {
  const { t } = useLang();
  const w = t.work;
  const hRef = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [active, setActive] = useState<FullProject | null>(null);

  // Merge visual data with translated text
  const projects: FullProject[] = PROJECT_VISUAL.map((v, i) => ({
    ...v,
    category: w.projects[i].category,
    description: w.projects[i].description,
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
      <section id="work" className="py-36 px-6">
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
        <ProjectModal
          project={{ ...active, mockup: active.mockup }}
          onClose={() => setActive(null)}
        />
      )}
    </>
  );
}
