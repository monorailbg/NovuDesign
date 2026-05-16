"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const orbs = [
      { x: 0.2, y: 0.3, r: 0.45, color: "rgba(236,72,153,0.18)", speed: 0.0007 },
      { x: 0.8, y: 0.6, r: 0.40, color: "rgba(6,182,212,0.14)", speed: 0.0011 },
      { x: 0.5, y: 0.8, r: 0.35, color: "rgba(167,139,250,0.12)", speed: 0.0009 },
      { x: 0.9, y: 0.2, r: 0.30, color: "rgba(236,72,153,0.10)", speed: 0.0013 },
    ];

    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width, H = canvas.height;

      orbs.forEach((orb, i) => {
        const ox = (orb.x + 0.1 * Math.sin(t * orb.speed * 1000 + i)) * W;
        const oy = (orb.y + 0.1 * Math.cos(t * orb.speed * 800 + i)) * H;
        const r = orb.r * Math.min(W, H);
        const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, r);
        g.addColorStop(0, orb.color);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

function Word({ text, delay }: { text: string; delay: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <span
      className="inline-block transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: "0ms",
      }}
    >
      {text}
    </span>
  );
}

export default function Hero() {
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const floatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    const pos = { x: 0.5, y: 0.5 };
    const animate = () => {
      pos.x += (mouseRef.current.x - pos.x) * 0.05;
      pos.y += (mouseRef.current.y - pos.y) * 0.05;
      if (floatRef.current) {
        floatRef.current.style.transform = `translate(${(pos.x - 0.5) * -24}px, ${(pos.y - 0.5) * -16}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-20">
      <AuroraBackground />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* Floating orbs (parallax with mouse) */}
      <div ref={floatRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[8%] w-64 h-64 rounded-full blur-3xl opacity-20" style={{ background: "#EC4899" }} />
        <div className="absolute bottom-[20%] right-[10%] w-48 h-48 rounded-full blur-3xl opacity-15" style={{ background: "#06B6D4" }} />
        <div className="absolute top-[55%] left-[15%] w-32 h-32 rounded-full blur-2xl opacity-20" style={{ background: "#A78BFA" }} />
      </div>

      {/* Badge */}
      <div
        className="relative mb-10 flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/10 backdrop-blur-sm"
        style={{ background: "rgba(255,255,255,0.04)", animation: "fadeUp 0.6s ease forwards" }}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#06B6D4" }} />
          <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#06B6D4" }} />
        </span>
        <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#06B6D4" }}>
          Now Taking Projects · 2025
        </span>
      </div>

      {/* Headline */}
      <h1 className="relative font-heading font-black text-center tracking-tighter leading-[0.88] max-w-6xl overflow-hidden">
        <span className="block text-[clamp(52px,9.5vw,136px)] text-white">
          <Word text="We" delay={200} />{" "}
          <Word text="craft" delay={320} />{" "}
          <Word text="digital" delay={440} />
        </span>
        <span className="block text-[clamp(52px,9.5vw,136px)]" style={{
          background: "linear-gradient(135deg, #EC4899 0%, #F472B6 30%, #A78BFA 60%, #06B6D4 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          <Word text="legends." delay={580} />
        </span>
      </h1>

      {/* Sub */}
      <p
        className="relative mt-8 max-w-lg text-center text-lg leading-relaxed"
        style={{
          color: "rgba(255,255,255,0.45)",
          fontFamily: "var(--font-space-grotesk)",
          animation: "fadeUp 0.8s ease 0.9s both",
        }}
      >
        Strategy, identity, and motion — forged into digital experiences that stop people mid-scroll.
      </p>

      {/* CTAs */}
      <div className="relative mt-12 flex flex-wrap items-center justify-center gap-4" style={{ animation: "fadeUp 0.8s ease 1.1s both" }}>
        <Link
          href="#work"
          className="group relative flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-white overflow-hidden cursor-pointer"
          style={{ background: "linear-gradient(135deg, #EC4899 0%, #A78BFA 50%, #06B6D4 100%)", backgroundSize: "200% 200%" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundPosition = "100% 100%")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundPosition = "0% 0%")}
        >
          <span>View Our Work</span>
          <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </Link>

        <Link
          href="#contact"
          className="group flex items-center gap-2 px-8 py-4 rounded-full font-bold border cursor-pointer transition-all duration-300"
          style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            e.currentTarget.style.color = "rgba(255,255,255,0.7)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          Start a Project
        </Link>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3" style={{ animation: "fadeIn 1s ease 1.5s both" }}>
        <div className="w-px h-16 overflow-hidden">
          <div className="w-full h-full" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.3), transparent)", animation: "scrollLine 1.8s ease-in-out infinite" }} />
        </div>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scrollLine { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }
      `}</style>
    </section>
  );
}
