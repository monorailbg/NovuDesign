"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/context/LanguageContext";

function useCounter(target: number, duration = 1800, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let frame = 0;
    const totalFrames = Math.round(duration / 16);
    const tick = () => {
      frame++;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 4);
      setVal(Math.min(Math.round(eased * target), target));
      if (frame < totalFrames) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [start, target, duration]);
  return val;
}

function StatCounter({ value, suffix, label, delay = 0, start }: {
  value: number; suffix: string; label: string; delay?: number; start: boolean;
}) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!start) return;
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [start, delay]);
  const count = useCounter(value, 1600, active);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      <div style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: "clamp(2.8rem,5vw,5rem)",
        lineHeight: 1,
        color: "#fff",
        letterSpacing: "-0.03em",
      }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(160,170,235,0.45)" }}>
        {label}
      </div>
    </div>
  );
}

export default function AIEdge() {
  const { t } = useLang();
  const s = t.aiEdge;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [pillsVisible, setPillsVisible] = useState(false);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setHeadingVisible(true);
        setTimeout(() => setStatsVisible(true), 200);
        setTimeout(() => setPillsVisible(true), 400);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const pills = s.pills;

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#080A12",
        borderTop: "1px solid rgba(107,120,216,0.08)",
        borderBottom: "1px solid rgba(107,120,216,0.08)",
        padding: "8rem 2.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.025,
        backgroundImage: "linear-gradient(rgba(107,120,216,1) 1px, transparent 1px), linear-gradient(90deg, rgba(107,120,216,1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      {/* Glow */}
      <div style={{
        position: "absolute", top: "-20%", right: "-10%",
        width: "600px", height: "600px",
        background: "radial-gradient(ellipse, rgba(58,69,196,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-20%", left: "-10%",
        width: "500px", height: "500px",
        background: "radial-gradient(ellipse, rgba(155,52,32,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Top label */}
        <div style={{
          display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "3rem",
          opacity: headingVisible ? 1 : 0, transform: headingVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <span style={{
            fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(107,120,216,0.6)", fontWeight: 500,
          }}>{s.label}</span>
          <span style={{ flex: 1, height: "1px", background: "rgba(107,120,216,0.12)" }} />
        </div>

        {/* Main heading */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start",
          marginBottom: "5rem",
        }}>
          <h2 style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: "clamp(2.5rem,5vw,5rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            color: "#fff",
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? "translateY(0)" : "translateY(36px)",
            transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}>
            {s.heading1}<br />
            <em style={{ color: "#6B78D8", fontStyle: "italic" }}>{s.heading2}</em>
          </h2>

          <div style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? "translateY(0)" : "translateY(36px)",
            transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s",
          }}>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.85, color: "rgba(160,170,235,0.6)", marginBottom: "1.25rem" }}>
              {s.p1}
            </p>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.85, color: "rgba(160,170,235,0.6)" }}>
              {s.p2}
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px", background: "rgba(107,120,216,0.08)",
          marginBottom: "4rem",
          borderRadius: "2px",
          overflow: "hidden",
        }}>
          {s.stats.map((stat: { value: number; suffix: string; label: string }, i: number) => (
            <div key={i} style={{
              background: "rgba(8,10,18,0.95)", padding: "2.5rem 2rem",
              opacity: statsVisible ? 1 : 0,
              transform: statsVisible ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`,
            }}>
              <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} delay={i * 100} start={statsVisible} />
            </div>
          ))}
        </div>

        {/* Process steps */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px",
          background: "rgba(107,120,216,0.06)", marginBottom: "4rem", overflow: "hidden",
        }}>
          {s.steps.map((step: { num: string; title: string; desc: string; tag: string }, i: number) => (
            <div key={i} style={{
              background: "#080A12", padding: "2.5rem 2rem",
              borderTop: `2px solid ${i === 0 ? "#9B3420" : i === 1 ? "#3A45C4" : "#6B78D8"}`,
              opacity: headingVisible ? 1 : 0,
              transform: headingVisible ? "translateY(0)" : "translateY(32px)",
              transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.1}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.1}s`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "0.65rem", letterSpacing: "0.16em", color: "rgba(160,170,235,0.3)" }}>{step.num}</span>
                <span style={{
                  fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase",
                  padding: "0.25rem 0.6rem", border: "1px solid rgba(107,120,216,0.2)",
                  color: "rgba(107,120,216,0.6)", borderRadius: "2px",
                }}>{step.tag}</span>
              </div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 500, color: "#fff", marginBottom: "0.75rem", lineHeight: 1.3 }}>
                {step.title}
              </h3>
              <p style={{ fontSize: "0.8rem", lineHeight: 1.8, color: "rgba(160,170,235,0.45)" }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Tech pill cloud */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "0.5rem",
        }}>
          {pills.map((pill: string, i: number) => (
            <span key={i} style={{
              fontSize: "0.68rem", letterSpacing: "0.08em",
              padding: "0.4rem 0.9rem",
              border: "1px solid rgba(107,120,216,0.15)",
              color: "rgba(160,170,235,0.4)",
              borderRadius: "2px",
              background: "rgba(107,120,216,0.03)",
              opacity: pillsVisible ? 1 : 0,
              transform: pillsVisible ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 30}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 30}ms`,
            }}>
              {pill}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
