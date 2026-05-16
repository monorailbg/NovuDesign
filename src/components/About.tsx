"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const skills = ["Brand Strategy", "Motion Design", "Frontend Dev", "Typography", "UX Research", "Visual Systems"];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="py-36 px-6 relative overflow-hidden">
      <div className="absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(109,40,217,0.07) 0%, transparent 70%)" }} />

      <div ref={ref} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(32px)", transition: "all 0.8s ease" }}>

        {/* Image column */}
        <div className="relative flex justify-center lg:justify-start">
          <div className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden border"
            style={{ borderColor: "rgba(167,139,250,0.18)", background: "rgba(109,40,217,0.06)", boxShadow: "0 0 80px rgba(109,40,217,0.2)" }}>
            <Image src="/founder.png" alt="Founder" fill className="object-cover" style={{ opacity: 0.92 }} />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(76,29,149,0.55) 0%, transparent 60%)" }} />
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-5 -right-4 lg:-right-8 px-5 py-3 rounded-2xl border backdrop-blur-md"
            style={{ background: "rgba(76,29,149,0.85)", borderColor: "rgba(167,139,250,0.25)" }}>
            <p className="text-2xl font-heading font-black text-white leading-none">80+</p>
            <p className="text-xs font-semibold tracking-widest uppercase mt-0.5" style={{ color: "#A78BFA" }}>Projects Delivered</p>
          </div>
        </div>

        {/* Text column */}
        <div className="flex flex-col gap-7">
          <div className="flex items-center gap-3">
            <div className="w-6 h-px" style={{ background: "#7C3AED" }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#7C3AED" }}>About</span>
          </div>

          <h2 className="font-heading font-black text-4xl md:text-5xl text-white leading-[1.0] tracking-tighter">
            Built by someone who<br />
            <span style={{
              background: "linear-gradient(135deg, #C4B5FD 0%, #8B5CF6 50%, #7C3AED 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>obsesses over craft.</span>
          </h2>

          <div className="flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: "rgba(196,181,253,0.5)" }}>
            <p>
              NovuDesign was built on a simple belief: great design isn&apos;t just how something looks — it&apos;s how it makes people feel. Every pixel is intentional. Every interaction earns its place.
            </p>
            <p>
              With over five years working with startups, agencies, and global brands, we bring the same level of obsessive detail to a landing page as we do to a full brand system.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-1">
            {skills.map((s) => (
              <span key={s} className="text-xs font-semibold px-4 py-1.5 rounded-full border"
                style={{ borderColor: "rgba(167,139,250,0.18)", color: "rgba(196,181,253,0.55)", background: "rgba(109,40,217,0.08)" }}>
                {s}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-10 pt-5 border-t" style={{ borderColor: "rgba(167,139,250,0.1)" }}>
            {[["5+", "Years"], ["80+", "Projects"], ["100%", "Passion"]].map(([num, label]) => (
              <div key={label}>
                <p className="font-heading font-black text-2xl text-white">{num}</p>
                <p className="text-xs font-semibold tracking-widest uppercase mt-0.5" style={{ color: "rgba(167,139,250,0.4)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
