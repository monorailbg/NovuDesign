"use client";

import { useRef, useEffect, useState } from "react";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold:0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" className="py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="relative overflow-hidden rounded-3xl p-12 md:p-20"
          style={{
            background:"rgba(109,40,217,0.06)",
            border:"1px solid rgba(167,139,250,0.12)",
            opacity: vis?1:0, transform: vis?"translateY(0)":"translateY(32px)",
            transition:"all 0.8s ease",
          }}>
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[100px] opacity-25" style={{ background:"#6D28D9" }} />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-[100px] opacity-18" style={{ background:"#A78BFA" }} />
          </div>
          <div className="absolute inset-0 pointer-events-none opacity-[0.035] rounded-3xl overflow-hidden"
            style={{ backgroundImage:"linear-gradient(rgba(167,139,250,1) 1px,transparent 1px),linear-gradient(90deg,rgba(167,139,250,1) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />

          <div className="relative text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-6 h-px" style={{ background:"#7C3AED" }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color:"#A78BFA" }}>Let's Build Together</span>
              <div className="w-6 h-px" style={{ background:"#7C3AED" }} />
            </div>

            <h2 className="font-heading font-black text-[clamp(48px,8vw,112px)] text-white tracking-tighter leading-[0.88] mb-6">
              Got a bold<br />
              <span style={{ background:"linear-gradient(135deg,#C4B5FD,#8B5CF6,#6D28D9)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>idea?</span>
            </h2>

            <p className="max-w-md mx-auto text-base leading-relaxed mb-12" style={{ color:"rgba(196,181,253,0.45)" }}>
              Tell us about your project and let's make something extraordinary together. We respond within 24 hours.
            </p>

            <a href="mailto:hello@novudesign.co" data-cursor
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-black text-lg text-white cursor-pointer transition-all duration-300"
              style={{
                background:"linear-gradient(135deg,#6D28D9,#8B5CF6,#A78BFA)",
                boxShadow: hov ? "0 0 60px rgba(109,40,217,0.55),0 0 120px rgba(139,92,246,0.25)" : "0 0 30px rgba(109,40,217,0.3)",
                transform: hov ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
              }}
              onMouseEnter={() => setHov(true)}
              onMouseLeave={() => setHov(false)}>
              hello@novudesign.co
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>

            <p className="mt-6 text-xs" style={{ color:"rgba(167,139,250,0.25)" }}>
              Or find us on{" "}
              {["Twitter","Instagram","LinkedIn"].map((s,i) => (
                <span key={s}>
                  <a href="#" className="transition-colors duration-200 cursor-pointer hover:text-violet-300" style={{ color:"rgba(167,139,250,0.4)" }}>{s}</a>
                  {i<2 && <span> · </span>}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
