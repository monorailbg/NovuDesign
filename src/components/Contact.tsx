"use client";

import { useRef, useEffect, useState } from "react";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
    <section id="contact" className="py-32 px-6">
      <div
        ref={ref}
        className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl p-12 md:p-20 text-center"
        style={{
          background: "linear-gradient(135deg, #EC489915 0%, #111 40%, #06B6D415 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl pointer-events-none"
          style={{ background: "#EC489920" }}
        />

        <span className="relative text-xs font-semibold tracking-widest uppercase mb-6 block" style={{ color: "var(--color-primary)" }}>
          Let's Work Together
        </span>
        <h2 className="relative font-heading font-black text-5xl md:text-7xl text-white tracking-tighter leading-tight mb-6">
          Got a bold idea?
        </h2>
        <p className="relative max-w-lg mx-auto text-base leading-relaxed mb-10" style={{ color: "var(--color-muted)" }}>
          Tell us about your project and let's make something extraordinary together.
        </p>

        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:hello@novudesign.co"
            className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-200 cursor-pointer hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #EC4899, #06B6D4)" }}
          >
            hello@novudesign.co
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>

        {/* Stats */}
        <div className="relative mt-16 grid grid-cols-3 gap-8 border-t border-white/8 pt-12">
          {[
            { number: "80+", label: "Projects Delivered" },
            { number: "5★", label: "Client Rating" },
            { number: "3yr", label: "In Business" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-heading font-black text-3xl md:text-4xl text-white">{stat.number}</div>
              <div className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
