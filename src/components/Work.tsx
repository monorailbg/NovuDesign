"use client";

import { useRef, useEffect, useState } from "react";

const projects = [
  { title: "Luminary", category: "Brand Identity + Web", year: "2024", color: "#EC4899", size: "large" },
  { title: "Apex Protocol", category: "Motion Design", year: "2024", color: "#06B6D4", size: "small" },
  { title: "Verdant Labs", category: "Web Design + Dev", year: "2025", color: "#34D399", size: "small" },
  { title: "Forma Studio", category: "UX Strategy + Brand", year: "2025", color: "#A78BFA", size: "large" },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl cursor-pointer ${
        project.size === "large" ? "row-span-2" : ""
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.96)",
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
        minHeight: project.size === "large" ? "400px" : "190px",
        background: `${project.color}10`,
        border: `1px solid ${project.color}20`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient fill on hover */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, ${project.color}25 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span
            className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full"
            style={{ background: `${project.color}20`, color: project.color }}
          >
            {project.category}
          </span>
          <span className="text-xs text-zinc-600">{project.year}</span>
        </div>

        <div>
          <h3 className="font-heading font-black text-3xl md:text-4xl text-white tracking-tight">{project.title}</h3>
          <div
            className="flex items-center gap-2 mt-3 font-medium text-sm transition-all duration-300"
            style={{
              color: project.color,
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateX(0)" : "translateX(-8px)",
            }}
          >
            View Project
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
  return (
    <section id="work" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: "var(--color-primary)" }}>
              Selected Work
            </span>
            <h2 className="font-heading font-black text-5xl md:text-6xl text-white leading-tight tracking-tight">
              Projects that<br />made a mark.
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:flex items-center gap-2 text-sm font-semibold border border-white/15 px-5 py-2.5 rounded-full text-white hover:bg-white/8 transition-all duration-200 cursor-pointer"
          >
            All Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-auto">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
