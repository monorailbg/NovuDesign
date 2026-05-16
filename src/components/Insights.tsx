"use client";

import { useRef, useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import type { T } from "@/lib/i18n";

type Post = T["insights"]["posts"][number];

function ArticleCard({ p, i, vis, onOpen }: { p: Post; i: number; vis: boolean; onOpen: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <article
      className="relative flex flex-col gap-5 p-8 rounded-2xl border cursor-pointer group"
      style={{
        borderColor: hov ? `${p.color}35` : "rgba(107,120,216,0.1)",
        background: hov ? `${p.color}07` : "rgba(58,69,196,0.03)",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${i * 0.13}s, transform 0.6s ease ${i * 0.13}s, border-color 0.25s, background 0.25s`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onOpen}
    >
      <div className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
        style={{ opacity: hov ? 1 : 0, background: `radial-gradient(ellipse at 20% 20%, ${p.color}0E 0%, transparent 60%)` }} />

      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{ background: `${p.color}18`, color: p.color }}>{p.tag}</span>
        <div className="flex items-center gap-3 text-xs font-mono" style={{ color: "rgba(160,170,235,0.25)" }}>
          <span>{p.date}</span>
          <span>·</span>
          <span>{p.readTime}</span>
        </div>
      </div>

      <div>
        <h3 className="font-heading font-black text-xl md:text-2xl text-white leading-[1.15] tracking-tight mb-3 group-hover:text-white transition-colors">
          {p.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(160,170,235,0.45)" }}>{p.excerpt}</p>
      </div>

      <div className="mt-auto flex items-center gap-2 text-sm font-bold transition-all duration-300"
        style={{ color: p.color, opacity: hov ? 1 : 0.5, transform: hov ? "translateX(0)" : "translateX(-6px)" }}>
        Read article
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px rounded-b-2xl transition-opacity duration-300"
        style={{ opacity: hov ? 1 : 0, background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />
    </article>
  );
}

function ArticleModal({ p, onClose }: { p: Post; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 md:p-10"
      style={{ animation: "fadeIn 0.25s ease forwards" }}>
      <div className="absolute inset-0 backdrop-blur-xl cursor-pointer"
        style={{ background: "rgba(8,10,18,0.9)" }} onClick={onClose} />
      <article
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-3xl border flex flex-col"
        data-lenis-prevent
        style={{
          background: "rgba(10,12,22,0.98)",
          borderColor: `${p.color}28`,
          boxShadow: `0 0 60px ${p.color}18, 0 40px 80px rgba(0,0,0,0.6)`,
          animation: "panelUp 0.35s cubic-bezier(0.16,1,0.3,1) forwards",
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-8 py-5 border-b flex-shrink-0"
          style={{ borderColor: `${p.color}15` }}>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
              style={{ background: `${p.color}18`, color: p.color }}>{p.tag}</span>
            <span className="text-xs font-mono" style={{ color: "rgba(160,170,235,0.25)" }}>{p.date} · {p.readTime}</span>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
            style={{ background: "rgba(160,170,235,0.07)", color: "rgba(160,170,235,0.4)" }}
            onMouseEnter={e => { e.currentTarget.style.background = `${p.color}20`; e.currentTarget.style.color = p.color; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(160,170,235,0.07)"; e.currentTarget.style.color = "rgba(160,170,235,0.4)"; }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8 md:p-10 flex flex-col gap-6">
          <h2 className="font-heading font-black text-2xl md:text-3xl text-white leading-tight tracking-tight">{p.title}</h2>
          <p className="text-base font-medium leading-relaxed" style={{ color: `${p.color}CC` }}>{p.excerpt}</p>
          <div className="h-px" style={{ background: `linear-gradient(90deg, ${p.color}40, transparent)` }} />
          {p.body.map((para, i) => (
            <p key={i} className="text-sm md:text-base leading-[1.85]" style={{ color: "rgba(160,170,235,0.55)" }}>{para}</p>
          ))}
        </div>
      </article>
      <style>{`
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes panelUp { from{opacity:0;transform:translateY(24px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
      `}</style>
    </div>
  );
}

export default function Insights() {
  const { t } = useLang();
  const ins = t.insights;
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [open, setOpen] = useState<Post | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <section id="insights" className="py-36 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(58,69,196,0.06) 0%, transparent 70%)" }} />

        <div className="max-w-6xl mx-auto" ref={ref}>
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}
            className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px" style={{ background: "#9B3420" }} />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#9B3420" }}>{ins.label}</span>
              </div>
              <h2 className="font-heading font-black text-5xl md:text-[80px] text-white leading-[0.9] tracking-tighter">
                {ins.heading1}<br /><span style={{ color: "rgba(107,120,216,0.28)" }}>{ins.heading2}</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed md:text-right" style={{ color: "rgba(160,170,235,0.35)", fontFamily: "var(--font-space-grotesk)" }}>
              {ins.sub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ins.posts.map((p, i) => (
              <ArticleCard key={i} p={p} i={i} vis={vis} onOpen={() => setOpen(p)} />
            ))}
          </div>
        </div>
      </section>

      {open && <ArticleModal p={open} onClose={() => setOpen(null)} />}
    </>
  );
}
