"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ─── Torus-knot woven bond ───────────────────────────────────────────────────
function WovenBond() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let raf: number;
    let rotY = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    // Torus-knot (p=3, q=2) — trefoil bond
    const P = 3, Q = 2;
    const R = 2.0, r = 0.65;
    const N = 800;          // curve resolution
    const STRANDS = 3;      // parallel offset strands for braid thickness

    function knotPoint(t: number) {
      const x = (R + r * Math.cos(Q * t)) * Math.cos(P * t);
      const y = (R + r * Math.cos(Q * t)) * Math.sin(P * t);
      const z =  r * Math.sin(Q * t);
      return { x, y, z };
    }

    function rotateY(p: {x:number;y:number;z:number}, a: number) {
      return {
        x:  p.x * Math.cos(a) + p.z * Math.sin(a),
        y:  p.y,
        z: -p.x * Math.sin(a) + p.z * Math.cos(a),
      };
    }

    function rotateX(p: {x:number;y:number;z:number}, a: number) {
      return {
        x: p.x,
        y: p.y * Math.cos(a) - p.z * Math.sin(a),
        z: p.y * Math.sin(a) + p.z * Math.cos(a),
      };
    }

    const TILT_X = 0.42; // static tilt so we see the weave

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      const scale = Math.min(W, H) * 0.165;
      const cx = W / 2;
      const cy = H / 2;

      // Build all segment data across all strands
      type Seg = {
        x0: number; y0: number;
        x1: number; y1: number;
        z:  number;           // average depth for sorting
        t:  number;           // position along curve [0..1]
        strand: number;
      };
      const segments: Seg[] = [];

      for (let s = 0; s < STRANDS; s++) {
        const offset = (s / STRANDS) * (2 * Math.PI / N) * 4; // slight phase shift
        for (let i = 0; i < N; i++) {
          const t0 = ((i)   / N) * 2 * Math.PI + offset;
          const t1 = ((i+1) / N) * 2 * Math.PI + offset;

          let p0 = knotPoint(t0);
          let p1 = knotPoint(t1);

          // tiny radial offset per strand so they sit side-by-side
          const radialShift = (s - (STRANDS - 1) / 2) * 0.12;
          const perpAngle0 = Math.atan2(p0.y, p0.x) + Math.PI / 2;
          const perpAngle1 = Math.atan2(p1.y, p1.x) + Math.PI / 2;
          p0 = { x: p0.x + radialShift * Math.cos(perpAngle0), y: p0.y + radialShift * Math.sin(perpAngle0), z: p0.z };
          p1 = { x: p1.x + radialShift * Math.cos(perpAngle1), y: p1.y + radialShift * Math.sin(perpAngle1), z: p1.z };

          // Rotate
          p0 = rotateX(rotateY(p0, rotY), TILT_X);
          p1 = rotateX(rotateY(p1, rotY), TILT_X);

          segments.push({
            x0: cx + p0.x * scale, y0: cy - p0.y * scale,
            x1: cx + p1.x * scale, y1: cy - p1.y * scale,
            z: (p0.z + p1.z) / 2,
            t: i / N,
            strand: s,
          });
        }
      }

      // Sort back-to-front (painter's algo for weave depth)
      segments.sort((a, b) => a.z - b.z);

      // Draw
      const zMin = -r - 0.1, zMax = r + 0.1;
      for (const seg of segments) {
        const depth = (seg.z - zMin) / (zMax - zMin); // 0 = back, 1 = front

        // Violet gradient: deep indigo → bright violet-300
        const lightness = 28 + depth * 42;           // 28%..70%
        const sat       = 65 + depth * 20;            // 65%..85%
        const hue       = 258 + seg.strand * 8;       // 258°..274°
        const alpha     = 0.55 + depth * 0.45;        // 0.55..1.0
        const width     = 1.4 + depth * 2.8;          // thin back, thick front

        ctx.beginPath();
        ctx.moveTo(seg.x0, seg.y0);
        ctx.lineTo(seg.x1, seg.y1);
        ctx.strokeStyle = `hsla(${hue},${sat}%,${lightness}%,${alpha})`;
        ctx.lineWidth   = width;
        ctx.lineCap     = "round";

        // Soft glow on foreground strands
        if (depth > 0.65) {
          ctx.shadowColor = `hsla(${hue},90%,75%,${(depth - 0.65) * 0.7})`;
          ctx.shadowBlur  = 10 + depth * 12;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
      rotY += 0.0025; // slow, calming rotation
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.92 }}
    />
  );
}

// ─── Word reveal ─────────────────────────────────────────────────────────────
function Word({ text, delay }: { text: string; delay: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <span
      className="inline-block"
      style={{
        opacity:    show ? 1 : 0,
        transform:  show ? "translateY(0)" : "translateY(36px)",
        transition: "opacity 0.75s ease, transform 0.75s ease",
      }}
    >
      {text}
    </span>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-20">

      {/* Deep violet base glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(109,40,217,0.18) 0%, transparent 70%)",
      }} />

      {/* Woven bond canvas — centred, square */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full max-w-2xl aspect-square opacity-80">
          <WovenBond />
        </div>
      </div>

      {/* Subtle noise */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      {/* Content — above the knot */}
      <div className="relative flex flex-col items-center text-center">

        {/* Badge */}
        <div
          className="mb-10 flex items-center gap-2.5 px-5 py-2 rounded-full border backdrop-blur-sm"
          style={{
            background: "rgba(109,40,217,0.12)",
            borderColor: "rgba(167,139,250,0.2)",
            animation: "fadeUp 0.6s ease forwards",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: "#A78BFA" }} />
            <span className="relative rounded-full h-2 w-2" style={{ background: "#A78BFA" }} />
          </span>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#A78BFA" }}>
            Now Taking Projects · 2025
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-heading font-black tracking-tighter leading-[0.88] max-w-5xl">
          <span className="block text-[clamp(50px,9vw,132px)] text-white overflow-hidden">
            <Word text="We" delay={200} />{" "}
            <Word text="craft" delay={330} />{" "}
            <Word text="digital" delay={460} />
          </span>
          <span
            className="block text-[clamp(50px,9vw,132px)] overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #C4B5FD 0%, #8B5CF6 45%, #6D28D9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <Word text="legends." delay={600} />
          </span>
        </h1>

        {/* Subtext */}
        <p
          className="mt-8 max-w-md text-base md:text-lg leading-relaxed"
          style={{
            color: "rgba(196,181,253,0.55)",
            fontFamily: "var(--font-space-grotesk)",
            animation: "fadeUp 0.8s ease 0.95s both",
          }}
        >
          Strategy, identity, and motion — forged into digital experiences that stop people mid-scroll.
        </p>

        {/* CTAs */}
        <div className="mt-11 flex flex-wrap items-center justify-center gap-4" style={{ animation: "fadeUp 0.8s ease 1.15s both" }}>
          <Link
            href="#work"
            className="group flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-white cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #A78BFA)",
              boxShadow: "0 0 32px rgba(124,58,237,0.4)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 48px rgba(139,92,246,0.55)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 32px rgba(124,58,237,0.4)")}
          >
            View Our Work
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </Link>

          <Link
            href="#contact"
            className="flex items-center gap-2 px-8 py-4 rounded-full font-bold border cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
            style={{ borderColor: "rgba(167,139,250,0.2)", color: "rgba(196,181,253,0.7)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(167,139,250,0.4)"; e.currentTarget.style.color = "#C4B5FD"; e.currentTarget.style.background = "rgba(109,40,217,0.12)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(167,139,250,0.2)"; e.currentTarget.style.color = "rgba(196,181,253,0.7)"; e.currentTarget.style.background = "transparent"; }}
          >
            Start a Project
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3" style={{ animation: "fadeIn 1s ease 1.6s both" }}>
        <div className="w-px h-14 overflow-hidden">
          <div className="w-full h-full" style={{ background: "linear-gradient(to bottom, transparent, rgba(167,139,250,0.5), transparent)", animation: "scrollLine 2s ease-in-out infinite" }} />
        </div>
      </div>

      <style>{`
        @keyframes fadeUp   { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
        @keyframes scrollLine { 0%{transform:translateY(-100%)} 100%{transform:translateY(200%)} }
      `}</style>
    </section>
  );
}
