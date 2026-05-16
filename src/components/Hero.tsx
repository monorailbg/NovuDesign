"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ─── Optimised woven bond ────────────────────────────────────────────────────
// Perf strategy:
//   • Pre-compute all base knot points once (no trig in the draw loop)
//   • Per frame: fast 2×2 rotation multiply only
//   • Bucket-sort into 14 depth layers → 14 batched draw calls instead of ~2 400
//   • No shadowBlur (most expensive canvas op) — glow via CSS filter on canvas
//   • N=300 segments, 2 strands  →  600 segments total
//   • Capped at 40 fps via timestamp delta

const N       = 300;   // segments per strand
const STRANDS = 2;
const P = 3, Q = 2;   // torus-knot (3,2) — trefoil
const R = 2.0, r = 0.65;
const TILT    = 0.42;  // static X-tilt (radians)
const N_BUCK  = 14;    // depth-bucket count

type Pt = { bx: number; by: number; bz: number }; // base (un-rotated) point

// Pre-compute base points once at module load
const BASE: Pt[][] = Array.from({ length: STRANDS }, (_, s) => {
  const offset = (s / STRANDS) * (2 * Math.PI / N) * 4;
  return Array.from({ length: N + 1 }, (__, i) => {
    const t  = (i / N) * 2 * Math.PI + offset;
    let bx   = (R + r * Math.cos(Q * t)) * Math.cos(P * t);
    let by   = (R + r * Math.cos(Q * t)) * Math.sin(P * t);
    const bz = r * Math.sin(Q * t);

    // Radial offset so strands sit side-by-side
    const shift   = (s - (STRANDS - 1) / 2) * 0.14;
    const perp    = Math.atan2(by, bx) + Math.PI / 2;
    bx += shift * Math.cos(perp);
    by += shift * Math.sin(perp);

    // Pre-apply static X-tilt
    const cosT = Math.cos(TILT), sinT = Math.sin(TILT);
    return { bx, by: by * cosT - bz * sinT, bz: by * sinT + bz * cosT };
  });
});

function WovenBond() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let rotY   = 0;
    let lastTs = 0;
    const FRAME_MS = 1000 / 40; // cap 40 fps

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const draw = (ts: number) => {
      raf = requestAnimationFrame(draw);
      if (ts - lastTs < FRAME_MS) return; // skip frame
      lastTs = ts;

      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      const scale = Math.min(W, H) * 0.17;
      const cx = W / 2, cy = H / 2;

      // Rotation matrix (Y-axis only — tilt already baked in)
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);

      // Bucket array: each bucket holds [x0,y0,x1,y1, ...] pairs
      const buckets: number[][] = Array.from({ length: N_BUCK }, () => []);
      const buckZ:   number[]   = new Array(N_BUCK).fill(0); // avg z per bucket

      for (let s = 0; s < STRANDS; s++) {
        const pts = BASE[s];
        for (let i = 0; i < N; i++) {
          const p0 = pts[i], p1 = pts[i + 1];

          // Rotate around Y (fast inline multiply)
          const rx0 = p0.bx * cosY + p0.bz * sinY;
          const ry0 = p0.by;
          const rz0 = -p0.bx * sinY + p0.bz * cosY;

          const rx1 = p1.bx * cosY + p1.bz * sinY;
          const ry1 = p1.by;
          const rz1 = -p1.bx * sinY + p1.bz * cosY;

          const avgZ = (rz0 + rz1) * 0.5;
          // Normalise z to [0, N_BUCK-1]
          const depth = (avgZ + r + 0.05) / (2 * (r + 0.05));
          const bi    = Math.min(N_BUCK - 1, Math.max(0, Math.floor(depth * N_BUCK)));

          buckets[bi].push(
            cx + rx0 * scale, cy - ry0 * scale,
            cx + rx1 * scale, cy - ry1 * scale,
          );
          buckZ[bi] += depth;
        }
      }

      ctx.clearRect(0, 0, W, H);

      // Draw buckets back → front (14 batched stroke calls)
      for (let b = 0; b < N_BUCK; b++) {
        const segs = buckets[b];
        if (segs.length === 0) continue;

        const d   = b / (N_BUCK - 1);          // 0 = back, 1 = front
        const L   = Math.round(22 + d * 50);   // lightness 22%→72%
        const S   = Math.round(62 + d * 20);   // saturation 62%→82%
        const hue = Math.round(232 - d * 218) + (b % 2) * 6; // VB(232)→madder(14)
        const alpha = 0.42 + d * 0.58;
        const lw  = 1.2 + d * 2.6;

        ctx.beginPath();
        for (let k = 0; k < segs.length; k += 4) {
          ctx.moveTo(segs[k],     segs[k + 1]);
          ctx.lineTo(segs[k + 2], segs[k + 3]);
        }
        ctx.strokeStyle = `hsla(${hue},${S}%,${L}%,${alpha})`;
        ctx.lineWidth   = lw;
        ctx.lineCap     = "round";
        ctx.stroke();
      }

      rotY += 0.0022;
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      // CSS filter gives the glow cheaply — no per-segment shadowBlur needed
      style={{ filter: "blur(0px) drop-shadow(0 0 18px rgba(78,95,212,0.4))", opacity: 0.9 }}
    />
  );
}

// ─── Word reveals ────────────────────────────────────────────────────────────
function Word({ text, delay }: { text: string; delay: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <span className="inline-block" style={{
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : "translateY(36px)",
      transition: "opacity 0.75s ease, transform 0.75s ease",
    }}>{text}</span>
  );
}

// Gradient must be on the same element as the text — not a parent — for background-clip:text to work
function GradientWord({ text, delay }: { text: string; delay: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <span className="inline-block" style={{
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : "translateY(36px)",
      transition: "opacity 0.75s ease, transform 0.75s ease",
      background: "linear-gradient(135deg, #A0AAEB 0%, #3A45C4 45%, #9B3420 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}>{text}</span>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-20">

      {/* Violet base glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(40,48,160,0.14) 0%, transparent 70%)",
      }} />

      {/* Woven bond — contained square so canvas stays small */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full max-w-2xl aspect-square">
          <WovenBond />
        </div>
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-[0.028] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "180px 180px",
      }} />

      {/* Content */}
      <div className="relative flex flex-col items-center text-center">

        {/* Badge */}
        <div className="mb-10 flex items-center gap-2.5 px-5 py-2 rounded-full border backdrop-blur-sm"
          style={{ background: "rgba(58,69,196,0.12)", borderColor: "rgba(107,120,216,0.2)", animation: "fadeUp 0.6s ease forwards" }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: "#6B78D8" }} />
            <span className="relative rounded-full h-2 w-2" style={{ background: "#6B78D8" }} />
          </span>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#A0AAEB" }}>
            Now Taking Projects · 2025
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-heading font-black tracking-tighter leading-[0.88] max-w-5xl">
          <span className="block text-[clamp(50px,9vw,132px)] text-white">
            <Word text="We" delay={200} />{" "}
            <Word text="craft" delay={330} />{" "}
            <Word text="digital" delay={460} />
          </span>
          <span className="block text-[clamp(50px,9vw,132px)]" style={{ lineHeight: 1.1, paddingBottom: "0.05em" }}>
            <GradientWord text="legends." delay={600} />
          </span>
        </h1>

        {/* Sub */}
        <p className="mt-8 max-w-md text-base md:text-lg leading-relaxed"
          style={{ color: "rgba(160,170,235,0.55)", fontFamily: "var(--font-space-grotesk)", animation: "fadeUp 0.8s ease 0.95s both" }}>
          Strategy, identity, and motion — forged into digital experiences that stop people mid-scroll.
        </p>

        {/* CTAs */}
        <div className="mt-11 flex flex-wrap items-center justify-center gap-4" style={{ animation: "fadeUp 0.8s ease 1.15s both" }}>
          <Link href="#work"
            className="group flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-white cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #9B3420, #3A45C4)", boxShadow: "0 0 32px rgba(155,52,32,0.4)" }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 48px rgba(58,69,196,0.55)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 32px rgba(155,52,32,0.4)")}>
            View Our Work
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </Link>
          <Link href="#contact"
            className="flex items-center gap-2 px-8 py-4 rounded-full font-bold border cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
            style={{ borderColor: "rgba(107,120,216,0.2)", color: "rgba(160,170,235,0.7)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(107,120,216,0.4)"; e.currentTarget.style.color = "#A0AAEB"; e.currentTarget.style.background = "rgba(58,69,196,0.12)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(107,120,216,0.2)"; e.currentTarget.style.color = "rgba(160,170,235,0.7)"; e.currentTarget.style.background = "transparent"; }}>
            Start a Project
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3" style={{ animation: "fadeIn 1s ease 1.6s both" }}>
        <div className="w-px h-14 overflow-hidden">
          <div className="w-full h-full" style={{ background: "linear-gradient(to bottom, transparent, rgba(107,120,216,0.5), transparent)", animation: "scrollLine 2s ease-in-out infinite" }} />
        </div>
      </div>

      <style>{`
        @keyframes fadeUp    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
        @keyframes scrollLine{ 0%{transform:translateY(-100%)} 100%{transform:translateY(200%)} }
      `}</style>
    </section>
  );
}
