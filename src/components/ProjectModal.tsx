"use client";

import { useEffect, useCallback } from "react";
import { useLenis } from "./SmoothScroll";

export type Project = {
  title: string;
  category: string;
  year: string;
  color: string;
  accent: string;
  description: string;
  tags: string[];
  mockup: React.ReactNode;
};

function CloseIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const close = useCallback(() => onClose(), [onClose]);
  const lenis = useLenis();

  useEffect(() => {
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [close, lenis]);

  return (
    <div
      className="fixed inset-0 z-[9990] flex items-center justify-center p-4 md:p-8"
      style={{ animation: "modalIn 0.35s cubic-bezier(0.16,1,0.3,1) forwards" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-xl cursor-pointer"
        style={{ background: "rgba(8,10,18,0.88)" }}
        onClick={close}
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border flex flex-col"
        data-lenis-prevent
        style={{
          background: "rgba(12,15,30,0.98)",
          borderColor: `${project.color}30`,
          boxShadow: `0 0 80px ${project.color}25, 0 40px 100px rgba(0,0,0,0.6)`,
          animation: "panelIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-8 py-5 border-b flex-shrink-0"
          style={{ borderColor: `${project.color}18` }}>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
              style={{ background: `${project.color}20`, color: project.color }}>
              {project.category}
            </span>
            <span className="text-xs font-mono" style={{ color: "rgba(160,170,235,0.3)" }}>{project.year}</span>
          </div>
          <button
            onClick={close}
            className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
            style={{ background: "rgba(160,170,235,0.07)", color: "rgba(160,170,235,0.5)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = `${project.color}20`; e.currentTarget.style.color = project.color; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(160,170,235,0.07)"; e.currentTarget.style.color = "rgba(160,170,235,0.5)"; }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Mockup full view */}
        <div className="w-full flex-shrink-0 overflow-hidden relative"
          style={{ background: `${project.color}06`, height: "480px" }}>
          {project.mockup}
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 flex flex-col gap-6">
          <div>
            <h2 className="font-heading font-black text-4xl md:text-5xl text-white tracking-tighter mb-4">{project.title}</h2>
            <p className="text-base leading-relaxed" style={{ color: "rgba(160,170,235,0.55)" }}>{project.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs font-semibold px-3 py-1.5 rounded-full border"
                style={{ borderColor: `${project.color}25`, color: project.color, background: `${project.color}10` }}>
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-2">
            <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${project.color}40, transparent)` }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: `${project.color}60` }}>
              Case Study
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[["Challenge", "Redefine the visual language from the ground up without losing brand equity."],
              ["Process", "Collaborative sprints — discovery, wireframes, prototypes, and live feedback cycles."],
              ["Result", "Launched to acclaim. Measurable uplift in engagement, retention, and brand recall."]
            ].map(([h, b]) => (
              <div key={h} className="p-5 rounded-2xl border"
                style={{ borderColor: `${project.color}15`, background: `${project.color}06` }}>
                <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: project.color }}>{h}</p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(160,170,235,0.45)" }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn  { from{opacity:0} to{opacity:1} }
        @keyframes panelIn  { from{opacity:0;transform:scale(0.94) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
      `}</style>
    </div>
  );
}
