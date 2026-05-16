"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot    = useRef<HTMLDivElement>(null);
  const ring   = useRef<HTMLDivElement>(null);
  const target  = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const raf     = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const loop = () => {
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        current.current.x += dx * 0.14;
        current.current.y += dy * 0.14;
        if (dot.current)
          dot.current.style.transform = `translate(${target.current.x - 4}px,${target.current.y - 4}px)`;
        if (ring.current)
          ring.current.style.transform = `translate(${current.current.x - 20}px,${current.current.y - 20}px)`;
      }

      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full pointer-events-none mix-blend-difference"
        style={{ background: "#fff", willChange: "transform" }} />
      <div ref={ring} className="fixed top-0 left-0 z-[9998] w-10 h-10 rounded-full pointer-events-none"
        style={{ border: "1px solid rgba(167,139,250,0.5)", willChange: "transform" }} />
    </>
  );
}
