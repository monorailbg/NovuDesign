"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

// ─── 3D Fibonacci Sphere Network ─────────────────────────────────────────────
// N nodes distributed uniformly on a sphere using the golden angle.
// Each node connects to its K nearest neighbours.
// Mouse movement tilts the sphere (smooth lerp). Slow auto-rotation on Y.
// Depth hue: 232° (violet-blue, back) → 10° (crimson/madder, front).
// Capped at 40 fps. No dependencies beyond Canvas 2D.

const SPHERE_N  = 180;
const K_NEAREST = 5;
const FOV       = 3.5;
const FRAME_MS  = 1000 / 40;

// Pre-compute base node positions (unit sphere) at module level
const PHI = Math.PI * (3 - Math.sqrt(5)); // golden angle
const BASE_NODES = Array.from({ length: SPHERE_N }, (_, i) => {
  const y = 1 - (i / (SPHERE_N - 1)) * 2;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = PHI * i;
  return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
});

// Pre-compute edges (K nearest, no duplicates)
const EDGES: [number, number][] = (() => {
  const out: [number, number][] = [];
  for (let i = 0; i < SPHERE_N; i++) {
    const dists: [number, number][] = [];
    for (let j = 0; j < SPHERE_N; j++) {
      if (i === j) continue;
      const dx = BASE_NODES[i].x - BASE_NODES[j].x;
      const dy = BASE_NODES[i].y - BASE_NODES[j].y;
      const dz = BASE_NODES[i].z - BASE_NODES[j].z;
      dists.push([j, dx * dx + dy * dy + dz * dz]);
    }
    dists.sort((a, b) => a[1] - b[1]);
    for (let k = 0; k < K_NEAREST; k++) {
      const j = dists[k][0];
      if (i < j) out.push([i, j]);
    }
  }
  return out;
})();

function FibSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ nx: 0, ny: 0 }); // normalised -1..1

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number, lastTs = 0;
    let angY = 0, angX = 0;   // current rotation
    let autoY = 0;             // slow auto-rotation accumulator

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        nx: ((e.clientX - rect.left) / rect.width  - 0.5) * 2,
        ny: ((e.clientY - rect.top)  / rect.height - 0.5) * 2,
      };
    };
    document.addEventListener("mousemove", onMove, { passive: true });

    const draw = (ts: number) => {
      raf = requestAnimationFrame(draw);
      if (ts - lastTs < FRAME_MS) return;
      lastTs = ts;

      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      const cx = W / 2, cy = H / 2;
      const scale = Math.min(W, H) * 0.38;

      // Smooth lerp toward target
      autoY += 0.006;
      const targetY = autoY + mouseRef.current.nx * 0.7;
      const targetX = mouseRef.current.ny * 0.38;
      angY += (targetY - angY) * 0.05;
      angX += (targetX - angX) * 0.05;

      const cosX = Math.cos(angX), sinX = Math.sin(angX);
      const cosY = Math.cos(angY), sinY = Math.sin(angY);

      // Project all nodes
      const proj = BASE_NODES.map(n => {
        // Y-axis rotation
        const x1 =  n.x * cosY + n.z * sinY;
        const z1 = -n.x * sinY + n.z * cosY;
        // X-axis rotation
        const y2 =  n.y * cosX - z1 * sinX;
        const z2 =  n.y * sinX + z1 * cosX;

        // Perspective divide
        const persp = FOV / (FOV + z2 + 1.2);
        return {
          sx: cx + x1 * scale * persp,
          sy: cy - y2 * scale * persp,
          depth: (z2 + 1.2) / 2.4, // 0=back 1=front
        };
      });

      ctx.clearRect(0, 0, W, H);

      // Draw edges back-to-front
      const sortedEdges = EDGES.map(([i, j]) => ({
        i, j, depth: (proj[i].depth + proj[j].depth) * 0.5,
      })).sort((a, b) => a.depth - b.depth);

      for (const { i, j, depth } of sortedEdges) {
        const hue   = Math.round(232 - depth * 222);
        const alpha = 0.055 + depth * 0.28;
        const lw    = 0.5 + depth * 1.5;
        ctx.beginPath();
        ctx.moveTo(proj[i].sx, proj[i].sy);
        ctx.lineTo(proj[j].sx, proj[j].sy);
        ctx.strokeStyle = `hsla(${hue},75%,${28 + depth * 36}%,${alpha})`;
        ctx.lineWidth   = lw;
        ctx.stroke();
      }

      // Draw nodes back-to-front
      const sortedNodes = proj.map((p, i) => ({ ...p, i })).sort((a, b) => a.depth - b.depth);

      for (const { sx, sy, depth } of sortedNodes) {
        const hue   = Math.round(232 - depth * 222);
        const r     = 0.9 + depth * 3.1;
        const alpha = 0.15 + depth * 0.85;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue},85%,${38 + depth * 42}%,${alpha})`;
        ctx.fill();
      }

      // Faint equator ring at z≈0 for spatial anchor
      const ringPts = 64;
      ctx.beginPath();
      for (let k = 0; k <= ringPts; k++) {
        const theta = (k / ringPts) * Math.PI * 2;
        const nx = Math.cos(theta), nz = Math.sin(theta), ny = 0;
        const x1 =  nx * cosY + nz * sinY;
        const z1 = -nx * sinY + nz * cosY;
        const y2 =  ny * cosX - z1 * sinX;
        const z2 =  ny * sinX + z1 * cosX;
        const persp = FOV / (FOV + z2 + 1.2);
        const sx = cx + x1 * scale * persp;
        const sy2 = cy - y2 * scale * persp;
        const depth = (z2 + 1.2) / 2.4;
        const alpha = 0.04 + depth * 0.06;
        if (k === 0) ctx.moveTo(sx, sy2);
        else {
          ctx.strokeStyle = `rgba(107,120,216,${alpha})`;
          ctx.lineWidth   = 0.5;
          ctx.lineTo(sx, sy2);
        }
      }
      ctx.stroke();
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ filter: "drop-shadow(0 0 28px rgba(58,69,196,0.35))", opacity: 0.95 }}
    />
  );
}

// ─── Word reveals ─────────────────────────────────────────────────────────────

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
  const { t } = useLang();
  const h = t.hero;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-20">

      {/* Deep space base */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 46%, rgba(32,40,140,0.18) 0%, transparent 68%)",
      }} />

      {/* Fibonacci sphere — full section */}
      <div className="absolute inset-0 pointer-events-none">
        <FibSphere />
      </div>

      {/* Noise grain */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "180px 180px",
      }} />

      {/* Content — sits in front */}
      <div className="relative flex flex-col items-center text-center z-10">

        {/* Badge */}
        <div className="mb-10 flex items-center gap-2.5 px-5 py-2 rounded-full border backdrop-blur-sm"
          style={{ background: "rgba(58,69,196,0.12)", borderColor: "rgba(107,120,216,0.2)", animation: "fadeUp 0.6s ease forwards" }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: "#6B78D8" }} />
            <span className="relative rounded-full h-2 w-2" style={{ background: "#6B78D8" }} />
          </span>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#A0AAEB" }}>
            {h.badge}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-heading font-black tracking-tighter leading-[0.88] max-w-5xl">
          <span className="block text-[clamp(50px,9vw,132px)] text-white">
            {h.words1.map((word, i) => (
              <span key={i}>
                <Word text={word} delay={200 + i * 130} />
                {i < h.words1.length - 1 ? " " : ""}
              </span>
            ))}
          </span>
          <span className="block text-[clamp(50px,9vw,132px)]" style={{ lineHeight: 1.1, paddingBottom: "0.05em" }}>
            <GradientWord text={h.word2} delay={200 + h.words1.length * 130} />
          </span>
        </h1>

        {/* Sub */}
        <p className="mt-8 max-w-md text-base md:text-lg leading-relaxed"
          style={{ color: "rgba(160,170,235,0.55)", fontFamily: "var(--font-space-grotesk)", animation: "fadeUp 0.8s ease 0.95s both" }}>
          {h.sub}
        </p>

        {/* CTAs */}
        <div className="mt-11 flex flex-wrap items-center justify-center gap-4" style={{ animation: "fadeUp 0.8s ease 1.15s both" }}>
          <Link href="#work"
            className="group flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-white cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #9B3420, #3A45C4)", boxShadow: "0 0 32px rgba(155,52,32,0.4)" }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 48px rgba(58,69,196,0.55)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 32px rgba(155,52,32,0.4)")}>
            {h.cta1}
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </Link>
          <Link href="#contact"
            className="flex items-center gap-2 px-8 py-4 rounded-full font-bold border cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
            style={{ borderColor: "rgba(107,120,216,0.2)", color: "rgba(160,170,235,0.7)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(107,120,216,0.4)"; e.currentTarget.style.color = "#A0AAEB"; e.currentTarget.style.background = "rgba(58,69,196,0.12)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(107,120,216,0.2)"; e.currentTarget.style.color = "rgba(160,170,235,0.7)"; e.currentTarget.style.background = "transparent"; }}>
            {h.cta2}
          </Link>
        </div>

        {/* Depth cue — subtle coordinate labels */}
        <div className="mt-14 flex items-center gap-6" style={{ animation: "fadeUp 0.8s ease 1.4s both" }}>
          {[["X", "#9B3420"], ["Y", "#6B78D8"], ["Z", "#3A45C4"]].map(([axis, color]) => (
            <span key={axis} className="flex items-center gap-1.5 text-[10px] font-black tracking-widest" style={{ color: "rgba(107,120,216,0.25)" }}>
              <span style={{ color, opacity: 0.6 }}>▪</span>
              {axis}
            </span>
          ))}
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
