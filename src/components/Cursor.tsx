"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos  = useRef({ x:0, y:0 });
  const rPos = useRef({ x:0, y:0 });
  const raf  = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { pos.current = { x:e.clientX, y:e.clientY }; };
    const onEnter = () => { dot.current?.classList.add("scale-150"); ring.current?.classList.add("scale-150","opacity-0"); };
    const onLeave = () => { dot.current?.classList.remove("scale-150"); ring.current?.classList.remove("scale-150","opacity-0"); };

    const loop = () => {
      rPos.current.x += (pos.current.x - rPos.current.x) * 0.12;
      rPos.current.y += (pos.current.y - rPos.current.y) * 0.12;
      if (dot.current)  dot.current.style.transform  = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      if (ring.current) ring.current.style.transform = `translate(${rPos.current.x - 20}px, ${rPos.current.y - 20}px)`;
      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("a,button,[data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    raf.current = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <>
      <div ref={dot}  className="fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full pointer-events-none mix-blend-difference transition-transform duration-150" style={{ background:"#fff" }} />
      <div ref={ring} className="fixed top-0 left-0 z-[9998] w-10 h-10 rounded-full pointer-events-none transition-all duration-300" style={{ border:"1px solid rgba(167,139,250,0.5)" }} />
    </>
  );
}
